import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";
import TransactionList from "./TransactionList/TransactionList";

const lastNDays = [30, 15, 10];
const categories = ["Entertainment", "Food", "Misc.", "Game"]
const types = ["Sent", "Receive", "Convert"];
const BASE_URL = 'http://localhost:8080/api/v1';
const id = 2;

export default function Transaction(){

    const [selectedDays, setSelectedDays] = useState("Last 30 days");
    const [selectedCateory, setSelectedCategory] = useState("Category");
    const [selectedType, setSelectedType] = useState("Type");
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/transaction/all?id=${id}`);
                const transactions = await response.json();
                setTransactions(transactions);
                setFilteredTransactions(transactions);
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
            setFilteredTransactions(transactions);
        } catch (error) {
            setError(error);
        }
        setSelectedCategory(item);
    };

    const handleTypeChange = (item) => {
        setSelectedType(item);

        let filteredTransactions;
        switch(item){
            case "Sent":
                filteredTransactions = transactions.filter(tx => tx.source_account_id_long === id);
                break;
            case "Receive":
                filteredTransactions = transactions.filter(tx => tx.destination_account_id_long === id);
                break;
            case "Convert":
                filteredTransactions = transactions.filter(tx => tx.destination_account_id_long === tx.source_account_id_long);
                break;
            default:
                filteredTransactions = transactions;
        }

        setFilteredTransactions(filteredTransactions);
    }

    const clearFilters = () => {
        setSelectedDays("Last 30 days");
        setSelectedCategory("Category");
        setSelectedType("Type");
        setFilteredTransactions(transactions);
        console.log("filter cleared");
        console.log(transactions);
    }
    
    return (
        <>
            <h1>Transaction</h1>
            <div className={styles.filterContainer}>
                <Dropdown label={selectedDays} options={lastNDays} onOptionClicked={handleDaysChange}/>
                <Dropdown label={selectedCateory} options={categories} onOptionClicked={handleCateogoryChange}/>
                <Dropdown label={selectedType} options={types} onOptionClicked={handleTypeChange}/>
            </div>
            <button onClick={clearFilters}>Clear Filter</button>
            <TransactionList transactions={filteredTransactions} id={id} error={error}/>
        </>
    )
}