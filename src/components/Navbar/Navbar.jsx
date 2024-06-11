import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";

const links = [
    {href: "", label: "Home"},
    {href: "/payment", label: "Payment"},
    {href: "/transaction", label: "Transaction"},
    {href: "/login", label: "Logout"},
];

export default function Navbar(){

    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return(
        <nav className={styles.navContainer}>
            <h1>E-Gringgots</h1>
            <ul className={styles.navLinks}>
                {links.map((item) => (
                    <li key={item.label}>
                        {item.label === "Logout" ? (
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                {item.label}
                            </button>
                        ) : (
                            <NavLink
                                to={item.href}
                                className={({ isActive }) => isActive ? styles.activeLink : ""}
                            >
                                {item.label}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}