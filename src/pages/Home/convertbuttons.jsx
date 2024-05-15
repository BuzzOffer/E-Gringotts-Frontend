import {convert} from './converter.js';
import React, {useState} from 'react';

function ConvertButtons() {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState("");
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    
    const setConvert = () => {
        let fc = document.querySelector("#fromCurrency").value;
        let tc = document.querySelector("#toCurrency").value;
        let fv = document.getElementById("amount").value;
        let tv = convert(fv, fc, tc)

        let fromRate = document.getElementById("fromValue");
        let toRate = document.getElementById("toValue");
        setFromValue(fv);
        setToValue(tv);
        setFromCurrency(fc);
        setToCurrency(tc);

        fromRate.textContent = `${Number(fromValue).toFixed(2)} ${fromCurrency} = `;
        toRate.textContent = `${Number(toValue).toFixed(2)} ${toCurrency}`
    }
    
    return (
        <div className="conButtonDiv">
            <br></br>
            <button className="convertButtons" id="convert" onClick={setConvert}>Convert</button>
            <button className="convertButtons" id="confirm">Confirm</button>
        </div>
    );
}

export default ConvertButtons