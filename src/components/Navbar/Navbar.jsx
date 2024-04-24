import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
    {href: "", label: "Home"},
    {href: "/payment", label: "Payment"},
    {href: "/transaction", label: "Transaction"},
    {href: "/login", label: "Login"},
    {href: "/register", label: "Register"},
];

export default function Navbar(){
    return(
        <nav className={styles.navContainer}>
            <h1>E-Gringgots</h1>
            <ul className={styles.navLinks}>
                {links.map((item) => (
                    <li key={item.label}>
                        <NavLink
                            to={`${item.href}`}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}