import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Transaction.module.css";
import TransactionList from "./TransactionList/TransactionList";
import { ApiDateFormat } from "../../utils/DateFormatting";
import { useAuth } from "../../context/AuthContext";

const lastNDays = [15, 10, 5];
const categories = ["Entertainment", "Food", "Misc.", "Game"]
const types = ["Sent", "Receive", "Convert"];

export default function Transaction(){

    const { user } = useAuth();
    const id = user.id;
    const [selectedDays, setSelectedDays] = useState(lastNDays[0]);
    const [selectedCateory, setSelectedCategory] = useState("Category");
    const [selectedType, setSelectedType] = useState("Type");
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                // const response = await fetch(`${BASE_URL}/transaction/all?id=${id}`);
                const today = new Date();
                const start = new Date();
                start.setDate(start.getDate() - selectedDays);
                today.setDate(today.getDate() + 1);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/getTransactionByIdDateTime?id=${id}&start=${ApiDateFormat(start)}&end=${ApiDateFormat(today)}`);
                const data = await response.json();
                data.reverse();
                setTransactions(data);
                setFilteredTransactions(data);
            } catch (e) {
                console.log(e);
                setError(e);
            } finally {
                setLoading(false);
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
            <TransactionList transactions={filteredTransactions} id={id} error={error} loading={loading}/>
        </>
    )
}