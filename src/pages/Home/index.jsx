import React, {useState} from 'react';
import Welcome from './welcome.jsx';
import Balance from './balance.jsx';
import NavButtons from './navbuttons.jsx';
import FromMenu from './frommenu.jsx';
import ToMenu from './tomenu.jsx';
import CurrencyRate from './currencyrate.jsx';
import Amount from './amount.jsx';
import ConvertButtons from './convertbuttons.jsx';
import './home.css'
import { convert } from './converter.js';

export default function Home(){
    const [fromCurrency, setFromCurrency] = useState("Sickle");
    const [toCurrency, setToCurrency] = useState("Knut");
    const [inputAmt, setInputAmt] = useState(1.00);
    const [convertedAmt, setConvertedAmt] = useState(29.00);
    const onOptionSelectFrom = (event) => {
        let selected = event.target.value;
        setFromCurrency(selected);
        let newAmt = convert(inputAmt, selected, toCurrency);
        setConvertedAmt(newAmt);
    }
    const onOptionSelectTo = (event) => {
        let selected = event.target.value;
        setToCurrency(selected);
        let newAmt = convert(inputAmt, fromCurrency, selected);
        setConvertedAmt(newAmt);
    }
    const onInputChange = (event) => {
        //conversion logic
        let fc = document.querySelector("#fromCurrency").value;
        let tc = document.querySelector("#toCurrency").value;
        let amt = event.target.value;
        
        if (amt > 100000 || amt < 0) {
            return;
        }
        let newAmt = convert(amt, fc, tc);
        setFromCurrency(fc);
        setToCurrency(tc);
        setInputAmt(amt);
        setConvertedAmt(newAmt);
        //to test
        console.log(newAmt);
    }
    return (
        <>
            <h1>Home</h1>
            <Welcome />
            <h2 className="sectionMessage">Balance</h2>
            <Balance />
            <NavButtons />
            <h2 className="sectionMessage">Currency Converter</h2>
            <div id="currencyConverter">
                <FromMenu onOption={onOptionSelectFrom}/>
                <ToMenu onOption={onOptionSelectTo}/>
                <div id="merged">
                    <CurrencyRate fc={fromCurrency} tc={toCurrency} amt={inputAmt} newAmt={convertedAmt}/>
                </div>
                <Amount onInput={onInputChange}/>
                <ConvertButtons />
            </div>
        </>
    );
}