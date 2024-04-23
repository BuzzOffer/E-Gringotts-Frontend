import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar(){
    return(
        <nav className={styles.navContainer}>
            <h1>E-Gringgots</h1>
            <ul className={styles.navLinks}>
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