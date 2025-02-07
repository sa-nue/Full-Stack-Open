const CountryList = ({ allCountries, newCountry, setCountryToShow }) => {
    const countriesToShow = allCountries.filter(country => country.name.common.toUpperCase().includes(newCountry.toUpperCase()))

    if (countriesToShow.length > 10) {
        return <p>Too many matches! Please specify your search.</p>
    } else if (countriesToShow.length === 1) {
        setCountryToShow(countriesToShow[0])
    } else {
        return (
            <ul>
                {countriesToShow.map(country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => setCountryToShow(country)}>Show</button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default CountryList
