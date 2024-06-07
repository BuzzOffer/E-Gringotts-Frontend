function CurrencySelect({onOption}) {
    return (
            <select name="currencies" className="dropDown" onChange={onOption}>
                <option value="knut">Knut</option>
                <option value="sickle">Sickle</option>
                <option value="galleon">Galleon</option>
            </select>
    )
}

export default CurrencySelect;