const Form = ({ newCountry, handleCountryChange }) => {
    return (
        <form>
            <div>
                <p>Find countries: <input value={newCountry} onChange={handleCountryChange} /></p>
            </div>
        </form>
    )
}

export default Form
