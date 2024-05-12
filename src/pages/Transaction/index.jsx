import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";
import TransactionList from "./TransactionList/TransactionList";

const lastNDays = [30, 15, 10];
const categories = ["Entertainment", "Food", "Misc.", "Game"]
const BASE_URL = 'http://localhost:8080/api/v1';
const id = 2;

export default function Transaction(){

    const [selectedDays, setSelectedDays] = useState("Last 30 days");
    const [selectedCateory, setSelectedCategory] = useState("Category");
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/transaction/all?id=${id}`);
                const transactions = await response.json();
                setTransactions(transactions);
            } catch (e) {
                setError(e);
            } 
        };

        fetchTransactions();
    }, []);

    const handleDaysChange = (item) =>{
        setSelectedDays(`Last ${item} days`);
    };

    const handleCateogoryChange = async (item) => {
        try {
            const response = await fetch(`${BASE_URL}/transaction/getTransaction?id=${id}&property=category&value=${item}`);
            const transactions = await response.json();
            setTransactions(transactions);
        } catch (error) {
            setError(error);
        }
        setSelectedCategory(item);
    };

    if(error){
        return <p>Oops..something went wrong while getting transaction data</p>
    }
    
    return (
        <>
            <h1>Transaction</h1>
            <div className={styles.filterContainer}>
                <Dropdown label={selectedDays} options={lastNDays} onOptionClicked={handleDaysChange}/>
                <Dropdown label={selectedCateory} options={categories} onOptionClicked={handleCateogoryChange}/>
            </div>
            <TransactionList transactions={transactions} id={id}/>
        </>
    )
}