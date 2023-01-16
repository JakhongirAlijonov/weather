const apiKey = 'ea7249aa34c40425b4bd2ba3de69d9e7';
const input = document.getElementById('input')
const korish = document.querySelector('.korish')
const chiqish = document.querySelector('.chiqish')
const botish = document.querySelector('.botish')
const shamol = document.querySelector('.shamol')
const nam = document.querySelector('.nam')
const bosim = document.querySelector('.bosim')
const bulut = document.querySelector('.bulut')
const mainTemp = document.querySelector('.asos')
const maxTemp = document.querySelector('.max')
const feelTemp = document.querySelector('.his')
const sana = document.querySelector('.sana')
const form = document.getElementById('form')
const nom = document.getElementById('nom')
const mainS = document.querySelector('.main-flex')
const loader = document.querySelector('#loader')
const qidir = document.getElementById('qidir')
loader.classList.add('hidden')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
    nom.innerHTML = input.value

    async function requestApi(url) {
        loader.classList.remove('hidden')
        try {
            const req = await fetch(url)

            if (!req.ok) {
                if (!(req.status == 200)) {
                    alert('Davlat nomini tekshiring. Agar hammasi joyida bolsa xato bizda ')
                }
                throw new Error('Xatolik mavjud')
            }
            const data = await req.json()

            getData(data)
        } catch (err) {
            console.log(err.message);

        }
    }
    requestApi(api_url)
})





function getData(datas) {
    mainS.classList.remove('hidden')
    loader.classList.add('hidden')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let soat = document.querySelector('.soat')
    soat.innerHTML = new Date().toLocaleTimeString();

    today = mm + '/' + dd + '/' + yyyy;
    sana.innerHTML = `Sana : ${today}`
    const { wind, weather, sys, main } = datas
    let sec1 = sys.sunset;
    let date1 = new Date(sec1 * 1000);
    let timestr1 = date1.toLocaleTimeString();
    botish.innerHTML = `Quyosh botishi ${timestr1}`
    let sec2 = sys.sunrise;
    let date2 = new Date(sec2 * 1000);
    let timestr2 = date2.toLocaleTimeString();
    chiqish.innerHTML = `Quyosh chiqishi ${timestr2}`
    korish.innerHTML = `Ko'rish masofasi ${datas.visibility} metr`
    shamol.innerHTML = `Shamol tezligi ${wind.speed}`
    nam.innerHTML = `Namlik : ${main.humidity}`
    bosim.innerHTML = `Bosim :${main.pressure}`
    bulut.innerHTML = `${weather[0].description}`
    mainTemp.innerHTML = `Temperatura: ${main.temp}`
    maxTemp.innerHTML = `Maksimum: ${main.temp_max}`
    feelTemp.innerHTML = `His etish: ${main.feels_like}`
    let imageSrc = weather[0].icon
    document.querySelector('.image').setAttribute('src', `https://openweathermap.org/img/wn/${imageSrc}@2x.png`)

}
