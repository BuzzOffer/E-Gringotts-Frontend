function ToMenu() {
    return (
        <div>
            <label for="toCurrency" id="converterLabel">To</label>
            <br></br>
            <select name="toCurrency" id="currencyDropDown">
                <option value="galleon">Galleon</option>
                <option value="sickle">Sickle</option>
                <option value="knut">Knut</option>
            </select>
        </div>
    );
}

export default ToMenu