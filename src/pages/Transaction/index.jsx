import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";
import TransactionList from "./TransactionList/TransactionList";
import { ApiDateFormat } from "../../utils/DateFormatting";

const lastNDays = [15, 10, 5];
const categories = ["Entertainment", "Food", "Misc.", "Game"]
const types = ["Sent", "Receive", "Convert"];
const BASE_URL = 'http://localhost:8080/api/v1';
const id = 2;

export default function Transaction(){

    const [selectedDays, setSelectedDays] = useState(lastNDays[0]);
    const [selectedCateory, setSelectedCategory] = useState("Category");
    const [selectedType, setSelectedType] = useState("Type");
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // const response = await fetch(`${BASE_URL}/transaction/all?id=${id}`);
                const today = new Date();
                const start = new Date();
                start.setDate(start.getDate() - selectedDays);
                const response = await fetch(`${BASE_URL}/transaction/getTransactionByDateTime?start=${ApiDateFormat(start)}&end=${ApiDateFormat(today)}`);
                const data = await response.json();
                data.reverse();
                setTransactions(data);
                setFilteredTransactions(data);
            } catch (e) {
                setError(e);
            } 
        };

        fetchTransactions();
    }, [selectedDays]);

    const handleDaysChange = (days) =>{
        setSelectedDays(days);
    };

    const handleCateogoryChange = async (category) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/transaction/getTransaction?id=${id}&property=category&value=${item}`);
        //     const transactions = await response.json();
        //     setFilteredTransactions(transactions);
        // } catch (error) {
        //     setError(error);
        // }
        // setSelectedCategory(item);

        const transactionByCategory = transactions.filter(transaction => transaction.category === category);
        setFilteredTransactions(transactionByCategory);
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
        setSelectedDays(lastNDays[0]);
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
                <Dropdown label={`Last ${selectedDays} days`} options={lastNDays} onOptionClicked={handleDaysChange}/>
                <Dropdown label={selectedCateory} options={categories} onOptionClicked={handleCateogoryChange}/>
                <Dropdown label={selectedType} options={types} onOptionClicked={handleTypeChange}/>
            </div>
            <button onClick={clearFilters}>Clear Filter</button>
            <TransactionList transactions={filteredTransactions} id={id} error={error}/>
        </>
    )
}