import Welcome from './welcome.jsx'
import Balance from './balance.jsx';
import NavButtons from './navbuttons.jsx';
import './home.css'

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <Welcome />
            <h2 id="sectionMessage">Balance</h2>
            <Balance />
            <NavButtons />
        </>
    );
}