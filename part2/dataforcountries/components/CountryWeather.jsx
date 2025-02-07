const CountryWeather = ({ country, weather }) => {
    console.log("weather.weather[0].icon in CountryWeather:", weather.weather[0].icon)
    const capital = country.capital
    const temp = (weather.main.temp - 273.15).toFixed(2)
    const wind = weather.wind.speed
    const imgSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {temp} Celsius</p>
            <img src={imgSrc} alt={`Weather icon for ${weather.main}`} />
            <p>Wind: {wind} m/s</p>
        </div>
    )
}

export default CountryWeather
