const CountryInfo = ({ country }) => {
    const languages = Object.values(country.languages)
    console.log("Content of country in CountryInfo:", country)
    return (
        <div>
            <h2>{country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt={`Flag of ${country.name.official}`} width="250" />
        </div>
    )
}

export default CountryInfo
