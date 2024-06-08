import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { ApiDateFormat } from "../../../../utils/DateFormatting";
import PieChart from "./PieChart";
import Spinner from "../../../../components/Spinner/Spinner";
import DatePicker from "../../../../components/DatePicker/DatePicker";

const CalenderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
    </svg>
)

export default function Dashboard() {
    const [range, setRange] = useState({
        from: null,
        to: null,
    });
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [userCount, setUserCount] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [prompt, setPrompt] = useState([]);

    const resetDateRange = () => {
        setRange({
            from: null,
            to: null
        })

        fetchAllTransactions();
    }

    const toggleDatePicker = () => {
        setVisible(!visible);
    }

    const getUniqueUsers = (transactions) => {
        const users = new Set();
        transactions.forEach(transaction => {
            const accountId = transaction.sourceAccount?.id;
            if (accountId) {
                users.add(accountId);
            }
        });
        return users;
    }

    const handleDateChange = async () => {
        
        if(!range.from || !range.to) {
            return;
        }

        range.to.setHours(23, 59, 59, 999);
        const from = ApiDateFormat(range.from);
        const to = ApiDateFormat(range.to);

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/getTransactionByDateTime?start=${from}&end=${to}`);
            const data = await response.json();
            const uniqueUsers = getUniqueUsers(data);

            setUserCount(uniqueUsers.size);
            setTransactionCount(data.length);
            setTransactions(data);
        } catch (error) {
            setError("Failed to get transactions between this range");
            console.log(error);
        } finally {
            setLoading(false);
            setVisible(false);
        }
    }

    const fetchAllTransactions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/all`)
            const data = await response.json();

            const today = ApiDateFormat(new Date()).split(" ");
            const date = today[0];

            const transactionsForToday = data.filter(transaction => transaction.dateTime.includes(date));
            const uniqueUsers = getUniqueUsers(transactionsForToday);
    
            setUserCount(uniqueUsers.size);
            setTransactionCount(transactionsForToday.length);
            setTransactions(transactionsForToday);
        } catch (error) {
            setError("Failed to fetch transactions. Please refresh the page!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    return (
        <>
            <div className={styles.header}>
                <h2>Today</h2>
                <button className={`${styles.calenderBtn} ${visible ? styles.calenderBtnOpen : ""}`} onClick={toggleDatePicker}><CalenderIcon /></button>
            </div>
            <div className={`${styles.datePickerContainer} ${visible ? styles.datePickerContainerOpen : ""}`}>
                <div>
                    <DatePicker range={range} setRange={setRange} />
                    <div className={styles.buttonContainer}>
                        <button onClick={resetDateRange} className={styles.resetBtn}>Reset</button>
                        <button onClick={toggleDatePicker} className={styles.closeBtn}>Close</button>
                        <button onClick={handleDateChange}>Apply</button>
                    </div>
                </div>
                {/* <div className={styles.promptContainer}>
                    <p>Select the first date: </p>
                    <p>Select the second date: </p>
                </div> */}
            </div>
            <div className={styles.dashboardContainer}>
                {loading && <div className={styles.loadingContainer}><Spinner /></div>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <>
                        <div className={styles.content}>
                            {transactionCount > 0 ? (
                                <>
                                    <p className={styles.value}>{transactionCount}</p>
                                    <p className={styles.caption}>Total Transactions</p>
                                </>
                            ) : (
                                <p>No transactions found.</p>
                            )}
                        </div>

                        <div className={styles.content}>
                            {userCount > 0 ? (
                                <>
                                    <p className={styles.value}>{userCount}</p>
                                    <p className={styles.caption}>Unique Users</p>
                                </>
                            ) : (
                                <p>No unique users found.</p>
                            )}
                        </div>

                        <div className={`${styles.pieChart} ${styles.content}`}>
                            {transactionCount > 0 ? (
                                <PieChart transactions={transactions}/>
                            ) : (
                                <p>No transactions found.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}