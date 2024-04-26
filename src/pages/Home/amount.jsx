function Amount() {
    return (
        <div>
            <label for="amount" id="converterLabel">Amount</label>
            <br></br>
            <input type="number" name="amount" id="currencyDropDown" max="100000" placeholder="Enter Amount">
                
            </input>
        </div>
    );
}

export default Amount