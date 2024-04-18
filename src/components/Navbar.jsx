import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav>
            <ul>
                <li>
                    <Link to={``}>Home</Link>
                </li>
                <li>
                    <Link to={`payment`}>Payment</Link>
                </li>
                <li>
                    <Link to={`transaction`}>Transaction</Link>
                </li>
                <li>
                    <Link to={`login`}>Login</Link>
                </li>
                <li>
                    <Link to={`register`}>Register</Link>
                </li>
            </ul>
        </nav>
    );
}