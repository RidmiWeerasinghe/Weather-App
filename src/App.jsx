import React from 'react'

function App() {
  const [city, setCity] = React.useState("Colombo")
  const [inputCity, setInputCity] = React.useState("")
  const [weatherData, setWeatherData] = React.useState({})
  const apiKey = "15191e8678a7155bc78fd2e76db8e9cc"

  React.useEffect(() => {
    fetchWeatherData()
    console.log("changing sts")
  }, [city])

  async function fetchWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`
    let response = await fetch(url)
    let data = await response.json()
    setWeatherData(data)
  }

  function search() {
    if (inputCity) {
      setCity(inputCity)
    }
  }

  function settingMainImage() {
    let imgCode = "01n"
    // console.log(weatherData.weather[0])
    if (weatherData.weather) {
      imgCode = weatherData.weather[0].icon
    }
    let img = ""
    switch (imgCode) {
      case "01d":
        img = "clear-skyD.png"
        break
      case "01n":
        img = "clear-skyN.png"
        break
      case "02d":
        img = "few-cloudsD.png"
        break
      case "02n":
        img = "few-cloudsN.png"
        break
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        img = "scattered-cloud.png"
        break
      case "09n":
      case "09d":
        img = "slow-rain.png"
        break
      case "10d":
        img = "rainD.png"
        break
      case "10n":
        img = "rainN.png"
        break
      case "11d":
        img = "heavy-rainD.png"
        break
      case "11n":
        img = "heavy-rainN.png"
        break
      case "13n":
      case "13d":
        img = "snow.png"
        break
      case "50n":
      case "50d":
        img = "mist.png"
        break
    }
    console.log(img + " changing image " + imgCode)
    return img
  }
  function handleChange(event) {
    const cityName = event.target.value
    setInputCity(cityName)
  }
  return (
    <div className='weather-container'>
      <div className='search-container'>
        <input type="text" placeholder='city-name' className='txt-search' onChange={handleChange} value={inputCity} />
        <button className='btn-search' onClick={search}><img src='/images/search-icon.png' alt="" /></button>
      </div>
      <img src={`/images/${settingMainImage()}`} alt="" className='img-main' />
      <h1 className='temp'>{Math.floor(weatherData.main?.temp) || 0} °C</h1>
      <h2 className='city-name'>{weatherData.name || "enter valid city"}</h2>
      <div className='container-otherDetails'>
        <div className='container-wind'>
          <img src="/images/humidity.png" alt="humidity" /><h3> {Math.floor(weatherData.main?.humidity) || 0}%</h3>
        </div>
        <div className='container-wind'>
          <img src="/images/wind.png" alt="wind speed" /><h3> {Math.floor(weatherData.wind?.speed) || 0} Km/h</h3>
        </div>
      </div>
    </div>
  )
}

export default App
