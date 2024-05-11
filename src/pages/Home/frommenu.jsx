function FromMenu() {
    return (
        <div>
            <label for="fromCurrency" className="converterLabel">From</label>
            <br></br>
            <select name="fromCurrency" className="currencyDropDown" id="fromCurrency">
                <option value="Galleon">Galleon</option>
                <option value="Sickle">Sickle</option>
                <option value="Knut">Knut</option>
            </select>
        </div>
    );
}

export default FromMenu