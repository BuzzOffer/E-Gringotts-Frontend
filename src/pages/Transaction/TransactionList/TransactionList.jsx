import { useState } from "react";
import styles from "./TransactionList.module.css";
import PaginationButton from "./PaginationButton";
import Spinner from "../../../components/Spinner/Spinner";

export default function TransactionList({ transactions, id, error, loading }){
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

    const capitalize = (s) => {
        if(s === null){
            return s;
        }
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
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

                <tbody className={styles.transactionsBody}>
                    {loading && (
                        <tr>
                            <td className={styles.loadingContainer} colSpan="5"><Spinner /></td>
                        </tr>
                    )}

                    {error && (
                        <tr>
                            <td colSpan="5">Failed to load transactions. Please refresh the page.</td>
                        </tr>
                    )}

                    {!error && !loading && currentLists.length > 0 && currentLists.map((item) => {
                        const isReceive = (item.destination_account_id_long === id);
                        const isConvert = item.sourceCurrency !== item.destinationCurrency;
                        const type = isReceive ? (isConvert ? "Convert" : "Receive") : "Sent";
                        const amountClass = isReceive ? styles.receive : styles.sent;
                        return (
                            <tr key={item.id}>
                                <td>{type}</td>
                                <td>{isReceive? item.sourceAccount.myUser.name : item.destinationAccount.myUser.name}</td>
                                <td>{item.category}</td>
                                <td className={amountClass}>{item.amount} {isConvert ? capitalize(item.destinationCurrency) : capitalize(item.sourceCurrency)}</td>
                                <td>{item.dateTime || "-"}</td>
                            </tr>
                        );
                    })}

                    {!error && !loading && currentLists.length === 0 && (
                        <tr>
                            <td colSpan="5">No transaction available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {!loading && !error && <PaginationButton currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />}
        </>
    );
}