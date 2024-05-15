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

export default function Home(){
    const [input, setInput] = useState();
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
                    <CurrencyRate />
                </div>
                <Amount />
                <ConvertButtons />
            </div>
        </>
    );
}