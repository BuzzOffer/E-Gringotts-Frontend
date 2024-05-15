function Amount({onInput}) {
    return (
        <div>
            <label for="amount" className="converterLabel">Amount</label>
            <br></br>
            <input type="number" id="amount" name="amount" className="currencyDropDown" max="100000" step=".01"
            placeholder="Enter Amount" onInput={onInput}>
            
            </input>
        </div>
    );
}

export default Amount