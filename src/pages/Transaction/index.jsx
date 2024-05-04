import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";

const lastNDays = [30, 15, 10];

export default function Transaction(){
    return (
        <>
            <h1>Transaction</h1>
            <div className={styles.filterContainer}>
                <Dropdown label={`Last ${lastNDays[0]} days`} options={lastNDays}/>
            </div>
        </>
    )
}