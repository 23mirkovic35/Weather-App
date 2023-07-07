const apiKey = `5fc4fe5f443dd6b17c31ad9497308dac`
const searchBtn = document.querySelector('.wrapper .location-container .search-box .icon')
const inputField = document.querySelector('input')

addEventListener("load", ()=>{
    const currPosition = navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
})

inputField.addEventListener("keyup", e=>{
    if(e.key == "Enter" && inputField.value!="") {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&units=metric&appid=${apiKey}`
        fetch(url).then(response => response.json()).then(result => weatherInfo(result))
        const searchIcon = document.querySelector('.wrapper .location-container .search-box .icon .uil-search')
        const closeIcon = document.querySelector('.wrapper .location-container .search-box .icon .uil-multiply')
        closeIcon.classList.remove('show')
        searchIcon.classList.add('show')
        const field = document.querySelector('.wrapper .location-container .search-box .input')
        field.classList.remove('show')
        inputField.value = "";
    }
})

searchBtn.addEventListener("click", ()=>{
    const searchIcon = document.querySelector('.wrapper .location-container .search-box .icon .uil-search')
    const closeIcon = document.querySelector('.wrapper .location-container .search-box .icon .uil-multiply')
    const inputField = document.querySelector('.wrapper .location-container .search-box .input')
    if(searchIcon.classList.contains('show')){
        inputField.classList.add('show')
    }
    else {
        inputField.classList.remove('show')
    }
    closeIcon.classList.toggle('show')
    searchIcon.classList.toggle('show')
})

const successCallback = (position)=>{
    const {latitude, longitude} = position.coords;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetch(url).then(response => response.json()).then(result => weatherInfo(result))
}
const errorCallback = (error) =>{
    console.log(error)
}

function weatherInfo(info){
    console.log(info)
    const cityName = info.name
    const currentTemp = info.main.temp
    const description = info.weather[0].description
    const weatherID = info.weather[0].id
    const sunset = info.sys.sunset;
    const humidity = info.main.humidity;
    const feels_like = info.main.feels_like
    const currentTime = Date.now()
    const cityHtml = document.querySelector('.wrapper .location-container .current-location .name')
    const tempHtml = document.querySelector('.wrapper .weather-info .current-weather .left .temperature')
    const descriptionHtml = document.querySelector('.wrapper .weather-info .current-weather .left .description')
    const weatherImage = document.querySelector('.wrapper .weather-info .current-weather .left .image img')
    const humidityHtml = document.querySelector('.wrapper .weather-info .right .humidity .proc .value')
    const feelsLikeHtml = document.querySelector('.wrapper .weather-info .right .feels-like .temp .value')
    cityHtml.innerHTML = cityName
    tempHtml.innerHTML = Math.floor(currentTemp)
    descriptionHtml.innerHTML = description
    humidityHtml.innerHTML = humidity
    feelsLikeHtml.innerHTML = Math.floor(feels_like)
    if(weatherID>=500 && weatherID<=531) weatherImage.src = `assets/rain.png`
    else if(weatherID>=200 && weatherID<=232) weatherImage.src = `assets/thunderstorm.png`
    else if(weatherID==800) weatherImage.src = `assets/clear.png`
    else if(weatherID>=801 && weatherID<=804) {
        if(sunset>=currentTime){
            weatherImage.src = `assets/few_clouds_night.png`
        }
        else {
            weatherImage.src = `assets/few_clouds_day.png`
        }
    }
    else if(weatherID>=300 && weatherID<=321) weatherImage.src = `assets/drizzle.png`
}