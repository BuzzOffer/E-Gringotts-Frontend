import { useState } from "react";
import styles from "./TransactionList.module.css";
import PaginationButton from "./PaginationButton";

export default function TransactionList({ transactions, id }){
    const [currentPage, setCurrentPage] = useState(1);
    const listPerPage = 10;

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
                    {currentLists.map((item) => {
                        const isReceive = item.destination_account_id_long === id;
                        const type = isReceive ? "Receive" : "Sent";
                        const amountClass = isReceive ? styles.receive : styles.sent;

                        return (
                            <tr key={item.id}>
                                <td>{type}</td>
                                <td>{item.destinationAccount.myUser.name}</td>
                                <td>{item.category}</td>
                                <td className={amountClass}>{item.amount}</td>
                                <td>{item.dateTime || "-"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <PaginationButton currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
    );
}