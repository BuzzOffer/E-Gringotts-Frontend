import { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";

const BASE_URL = 'http://localhost:8080/api/v1';

export default function TransactionList(){
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            console.log("Fetching data");
            try {
                const response = await fetch(`${BASE_URL}/transaction/all`);
                const transactions = await response.json();
                setTransactions(transactions);
            } catch (e) {
                setError(e);
            } 
        };

        fetchTransactions();
        console.log(transactions);
    }, []);

    if(error){
        return <p>Oops..something went wrong while getting transaction data</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                {transactions.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>Wen Yang</td>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                        <td>13 April 2024</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}