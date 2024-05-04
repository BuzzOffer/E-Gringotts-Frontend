function FromMenu() {
    return (
        <div>
            <label for="fromCurrency" className="converterLabel">From</label>
            <br></br>
            <select name="fromCurrency" className="currencyDropDown" id="fromCurrency">
                <option value="galleon">Galleon</option>
                <option value="sickle">Sickle</option>
                <option value="knut">Knut</option>
            </select>
        </div>
    );
}

export default FromMenu