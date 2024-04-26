import Welcome from './welcome.jsx'
import Balance from './balance.jsx';
import NavButtons from './navbuttons.jsx';
import FromMenu from './frommenu.jsx';
import ToMenu from './tomenu.jsx';
import CurrencyRate from './currencyrate.jsx';
import Amount from './amount.jsx';
import './home.css'

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <Welcome />
            <h2 id="sectionMessage">Balance</h2>
            <Balance />
            <NavButtons />
            <div className="currencyConverter">
                <FromMenu />
                <ToMenu />
                <div className="merged">
                    <CurrencyRate />
                </div>
                <Amount />
            </div>
        </>
    );
}