import React, { useState, useEffect } from 'react'
import axios from "axios"
import Form from "./components/Form.jsx"
import CountryList from "./components/CountryList.jsx"
import CountryInfo from "./components/CountryInfo.jsx"
import CountryWeather from "./components/CountryWeather.jsx"

const api_key = import.meta.env.VITE_WEATHER_KEY

function App() {
    const [newCountry, setNewCountry] = useState("")
    const [allCountries, setAllCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountriesWeather, setSelectedCountriesWeather] = useState(null)

    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setNewCountry(event.target.value)
        setSelectedCountry(null)
    }

    const setCountryToShow = (country) => {
        setSelectedCountry(country)
        console.log("Content of selectedCountry after clicking Show button:", selectedCountry)
    }

    useEffect(() => {
            console.log("Initializing aaall the countries data...")
            axios
                .get("https://studies.cs.helsinki.fi/restcountries/api/all")
                .then(response => {
                    console.log("All countries data fetched.")
                    setAllCountries(response.data)
                })
                .catch(error => console.log("An error occured:", error))
    }, [])

    useEffect(() => {
        if (selectedCountry) {
            const lat = selectedCountry.capitalInfo.latlng[0]
            const lon = selectedCountry.capitalInfo.latlng[1]

            if (api_key === undefined) {
                console.log("MISSING API KEY! Server request aborted.")
            } else {
                console.log("Using API Key:", api_key)
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
                    .then(response => {
                        console.log("openweathermap response is: ", response)
                        return setSelectedCountriesWeather(response.data)
                    })
                    .catch(error => {
                        console.log("An error occured while fetching data from openweathermap.org: ", error)
                        return error
                    })
            }
        }
    }, [selectedCountry])

  return (
    <>  <div>
          <Form newCountry={newCountry} handleCountryChange={handleCountryChange} />
        </div>
        <div>
              <CountryList allCountries={allCountries} newCountry={newCountry} setCountryToShow={setCountryToShow} />
        </div>
        <div>
              {selectedCountry && <CountryInfo country={selectedCountry} />}
              {selectedCountry && selectedCountriesWeather && (
                  <CountryWeather country={selectedCountry} weather={selectedCountriesWeather} />
              )}
        </div>
      </>
  )
}

export default App
