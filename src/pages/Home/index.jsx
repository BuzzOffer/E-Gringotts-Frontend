import React, {useEffect, useState} from 'react';
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
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [inputAmt, setInputAmt] = useState();
    const [convertedAmt, setConvertedAmt] = useState();
    const onInputChange = (event) => {
        //conversion logic
        let fc = document.querySelector("#fromCurrency").value;
        let tc = document.querySelector("#toCurrency").value;
        let amt = event.target.value
        if (amt > 100000) {
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
                <FromMenu />
                <ToMenu />
                <div id="merged">
                    <CurrencyRate fc={fromCurrency} tc={toCurrency} amt={inputAmt} newAmt={convertedAmt}/>
                </div>
                <Amount onInput={onInputChange}/>
                <ConvertButtons />
            </div>
        </>
    );
}