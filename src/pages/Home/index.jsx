import Welcome from './welcome.jsx'
import BalanceGalleon from './balanceGalleon.jsx';
import './home.css'

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <Welcome />
            <BalanceGalleon />
        </>
    );
}