function ToMenu() {
    return (
        <div>
            <label for="toCurrency" className="converterLabel">To</label>
            <br></br>
            <select name="toCurrency" className="currencyDropDown" id="toCurrency">
                <option value="Galleon">Galleon</option>
                <option value="Sickle">Sickle</option>
                <option value="Knut">Knut</option>
            </select>
        </div>
    );
}

export default ToMenu