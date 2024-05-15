import styles from "./AddAccount.module.css";

export default function AddAccount(){
    return (
        <div className={styles.addAccountContainer}>
            <h2 className={styles.header}>Accounts</h2>
            <button className={styles.addBtn}>
                Add New Account
            </button>
        </div>
    );
}