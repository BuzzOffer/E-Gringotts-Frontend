function FromMenu() {
    return (
        <div>
            <label for="fromCurrency" id="converterLabel">From</label>
            <select name="fromCurrency" id="fromCurrency">
                <option value="galleon">Galleon</option>
                <option value="sickle">Sickle</option>
                <option value="knut">Knut</option>
            </select>
        </div>
    );
}

export default FromMenu