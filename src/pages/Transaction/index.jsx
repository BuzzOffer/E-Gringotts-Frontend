import { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";
import TransactionList from "./TransactionList/TransactionList";

const lastNDays = [30, 15, 10];
const categories = ["Entertainment", "Food", "Misc"]

export default function Transaction(){

    const [selectedDays, setSelectedDays] = useState("Last 30 days");
    const [selectedCateory, setSelectedCategory] = useState("Category");

    const handleDaysChange = (item) =>{
        setSelectedDays(`Last ${item} days`);
    };

    const handleCateogoryChange = (item) => {
        setSelectedCategory(item);
    };
    
    return (
        <>
            <h1>Transaction</h1>
            <div className={styles.filterContainer}>
                <Dropdown label={selectedDays} options={lastNDays} onOptionClicked={handleDaysChange}/>
                <Dropdown label={selectedCateory} options={categories} onOptionClicked={handleCateogoryChange}/>
            </div>
            <TransactionList />
        </>
    )
}