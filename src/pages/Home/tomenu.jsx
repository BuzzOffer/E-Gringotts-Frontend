function ToMenu() {
    return (
        <div>
            <label for="toCurrency" className="converterLabel">To</label>
            <br></br>
            <select name="toCurrency" className="currencyDropDown" id="toCurrency">
                <option value="galleon">Galleon</option>
                <option value="sickle">Sickle</option>
                <option value="knut">Knut</option>
            </select>
        </div>
    );
}

export default ToMenu