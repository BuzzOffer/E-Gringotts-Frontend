import Spinner from "../../../../components/Spinner/Spinner";
import PaginationButton from "../../../Transaction/TransactionList/PaginationButton";
import styles from "./AccountList.module.css";
import { useState } from "react";

const DataState = ({ message }) => (
    <tr>
        <td colSpan="4">
            {message}
        </td>
    </tr>
);


export default function AccountList({ data, onRecipientClicked, error, loading }) {

    const [currentPage, setCurrentPage] = useState(1);
    const listPerPage = 5;

    // the component renders again whenever setCurrentPage is called, which means the startIndex and endIndex will change
    const startIndex = (currentPage - 1) * listPerPage;
    const endIndex = startIndex + listPerPage;
    const currentLists = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / listPerPage);

    const handlePageChange = (page) =>{
        setCurrentPage(page)
    }   

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Account Number</th>
                    </tr>
                </thead>

                <tbody>
                    {/* {loading && <DataState message="loading list..."/>} */}
                    {loading && <Spinner />}

                    {error && <DataState message="Error loading the list"/>}

                    {!loading && !error && currentLists.length === 0 ? (
                        <DataState message="No users found"/>
                    ) : (
                        currentLists.map(({ account }) => {
                            const { id: accNum, myUser: { name, phoneNumber } } = account;
                            return (
                                <tr key={accNum}>
                                    <td>{name}</td>
                                    <td>{phoneNumber}</td>
                                    <td>{account.id}</td>
                                    <td>
                                        <button className={styles.transferBtn} onClick={() => onRecipientClicked(accNum)}>Transfer</button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            <PaginationButton currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>  
        </>
    );
};