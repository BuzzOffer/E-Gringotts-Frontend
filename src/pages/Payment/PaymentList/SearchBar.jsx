import styles from "./SearchBar.module.css";

export default function SearchBar(){
    return (
        <div className={styles.searchContainer}>
            <input className={styles.searchBar} type="search" />
        </div>
    );
}