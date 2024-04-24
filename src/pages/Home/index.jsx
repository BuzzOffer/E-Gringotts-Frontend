import Welcome from './welcome.jsx'
import Balance from './balance.jsx';
import './home.css'

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <Welcome />
            <Balance />
        </>
    );
}