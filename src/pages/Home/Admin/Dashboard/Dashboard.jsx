import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { ApiDateFormat } from "../../../../utils/DateFormatting";
import PieChart from "./PieChart";
import Spinner from "../../../../components/Spinner/Spinner";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [transactions, setTransactions] = useState([]);
    const [userCount, setUserCount] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [pieChartData, setPieChartData] = useState();

    useEffect(() => {
        const fetchAllTransactions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/all`)
                const data = await response.json();

                const today = ApiDateFormat(new Date()).split(" ");
                const date = today[0];

                const transactionsForToday = data.filter(transaction => transaction.dateTime.includes(date));
                const uniqueUsers = new Set();
                transactionsForToday.forEach((transaction) => {
                    const id = transaction.sourceAccount?.id;
                    if(id){
                        uniqueUsers.add(id);
                    }
                });
        
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

        fetchAllTransactions();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {loading && <div className={styles.loadingContainer}><Spinner /></div>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <div className={styles.content}>
                        {transactionCount > 0 ? (
                            <>
                                <p className={styles.value}>{transactionCount}</p>
                                <p className={styles.caption}>Total Transactions Today</p>
                            </>
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </div>

                    <div className={styles.content}>
                        {userCount > 0 ? (
                            <>
                                <p className={styles.value}>{userCount}</p>
                                <p className={styles.caption}>Unique Users Today</p>
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
    );
}