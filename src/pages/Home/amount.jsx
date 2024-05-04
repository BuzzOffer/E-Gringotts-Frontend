function Amount() {
    return (
        <div>
            <label for="amount" className="converterLabel">Amount</label>
            <br></br>
            <input type="number" id="amount" name="amount" className="currencyDropDown" max="100000" placeholder="Enter Amount">
                
            </input>
        </div>
    );
}

export default Amount