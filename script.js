const input = document.querySelector('input')
const city = document.querySelector('.city')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const img = document.querySelector('img')
let searchValue

input.onkeypress = searchWeather

function searchWeather(e) {

  if (e.key === 'Enter') {
    
    weather.textContent = null
    city.textContent = null
    temperature.textContent = null
    img.src = null
    
    if (input.value) {
      searchValue = input.value
      input.value = null
      getWeather()

    }
  }
}

async function getWeather() {
  
  let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=871788a612fd12ef307d9526a30dc916`, { mode: 'cors' })

  if (result.ok) {

    let result2 = await result.json()

    city.textContent = `${result2.name}, ${result2.sys.country}`
    
    weather.textContent = result2.weather[0].description
    
    img.src = `http://openweathermap.org/img/wn/${result2.weather[0].icon}.png`
    
    let celsius = Math.round(result2.main.temp)
    let farenheit = Math.round(celsius*1.8 + 32)
    temperature.textContent = `${celsius}° Celsius / ${farenheit}° Farenheit`
  
  } else {

    alert('Location not found. Please try again.');

  }
}