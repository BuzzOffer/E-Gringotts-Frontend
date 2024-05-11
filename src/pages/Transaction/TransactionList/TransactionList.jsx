import { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";
import PaginationButton from "./PaginationButton";

const BASE_URL = 'http://localhost:8080/api/v1';

export default function TransactionList(){
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const listPerPage = 10;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/transaction/all`);
                const transactions = await response.json();
                setTransactions(transactions);
            } catch (e) {
                setError(e);
            } 
        };

        fetchTransactions();
    }, []);

    if(error){
        return <p>Oops..something went wrong while getting transaction data</p>
    }

    // the component renders again whenever setCurrentPage is called, which means the startIndex and endIndex will change
    const startIndex = (currentPage - 1) * listPerPage;
    const endIndex = startIndex + listPerPage;
    const currentLists = transactions.slice(startIndex, endIndex);

    const totalPages = Math.ceil(transactions.length / listPerPage);

    const handlePageChange = (page) =>{
        setCurrentPage(page)
    }
    
    return (
        <>
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
                    {currentLists.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.destinationAccount.myUser.name}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>13 April 2024</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationButton currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
    );
}