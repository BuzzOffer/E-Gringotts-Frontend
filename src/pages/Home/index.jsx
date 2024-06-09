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
import Spinner from '../../components/Spinner/Spinner.jsx';
import { ApiDateFormat } from '../../utils/DateFormatting.js';
import Admin from './Admin/index.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Home(){
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState({});
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
    }

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/account/getByUserId?id=${user.id}`)
            const data = await response.json();
            console.log(data);
            setUserInfo(data);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    const handleConversion = async () => {
        console.log("clicked");
        console.log(`From: ${fromCurrency}`);
        console.log(`To: ${toCurrency}`);
        console.log(`Input: ${inputAmt}`);
        console.log(`Converted: ${convertedAmt}`);

        let sourceBalance;

        switch(fromCurrency.toLowerCase()) {
            case 'knut':
                sourceBalance = userInfo.knut_balance;
                break;
            case 'sickle':
                sourceBalance = userInfo.sickle_balance;
                break;
            case 'galleon':
                sourceBalance = userInfo.galleon_balance;
                break;
            default:
                console.log(`Invalid currency`);
                return;
        }

        if(fromCurrency === toCurrency) {
            console.log("Same currency, no conversion needed");
            return;
        }

        if(sourceBalance < inputAmt) {
            console.log(`Insufficient ${fromCurrency} balance`);
            return;
        }

        try {
            const today = ApiDateFormat(new Date());
            const transactionData = {
                amount: convertedAmt,
                dateTime: today,
                source_account_id_long: userInfo.id, 
                destination_account_id_long: userInfo.id,
                category: "Conversion",
                description: "-",
                sourceCurrency: fromCurrency.toLowerCase(),
                destinationCurrency: toCurrency.toLowerCase()
            };

            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/convert?sourceAmount=${inputAmt}`, settings)
            if(response.ok) {
                console.log("Transaction created");
                await fetchUser();
            }
            
        } catch (error) {   
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h1>Home</h1>
            {loading && <div className="loadingContainer"><Spinner /></div>}

            {error && <p>Failed to load the page. Please try again.</p>}

            {!loading && !error && (
                <>
                    <Welcome userInfo={userInfo} />
                    <h2 className="sectionMessage">Balance</h2>
                    <Balance userInfo={userInfo}/>
                    <NavButtons />
                    <h2 className="sectionMessage">Currency Converter</h2>
                    <div id="currencyConverter">
                        <FromMenu onOption={onOptionSelectFrom}/>
                        <ToMenu onOption={onOptionSelectTo}/>
                        <div id="merged">
                            <CurrencyRate fc={fromCurrency} tc={toCurrency} amt={inputAmt} newAmt={convertedAmt}/>
                        </div>
                        <Amount onInput={onInputChange}/>
                        <ConvertButtons handleConversion={handleConversion}/>
                    </div>
                </>
            )}

            {user?.status === "gobblin" && <Admin />}
        </>
    );
}