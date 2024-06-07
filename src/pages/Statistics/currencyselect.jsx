function CurrencySelect({onOption}) {
    return (
        <div>
            <select name="currencies" className="dropDown" onChange={onOption}>
                <option value="knut">Knut</option>
                <option value="sickle">Sickle</option>
                <option value="galleon">Galleon</option>
            </select>
        </div>
    )
}

export default CurrencySelect;