import { useLocation } from "react-router-dom";
import styles from "./PaymentReceipt.module.css";
import { useEffect, useState } from "react";

const TickIcon = ({ color }) => (
    <svg 
        className={styles.tickIcon}
        fill={color}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 -960 960 960" 
    >
        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
)

export default function PaymentReceipt(){

    const { state: { accountId } } = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [amount, setAmount] = useState();

    useEffect(() => {
        const fetchReceipt = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/getLatestByAccountId?id=${accountId}`);
                const data = await response.json();
                setTransactionDetails([
                    {
                        label: "Transasction ID",
                        value: data.id
                    },
                    {
                        label: "Date & Time",
                        value: data.dateTime
                    },
                    {
                        label: "From",
                        value: data.sourceAccount.myUser.name
                    },
                    {
                        label: "To",
                        value: data.destinationAccount.myUser.name
                    },
                    {
                        label: "Reference",
                        value: data.description
                    },
                ]);
                setAmount(`${data.amount} ${data.destinationCurrency}`);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchReceipt();
    }, [])

    return(
        <>
            <div className={styles.receiptContainer}>
                <h1>E-Gringotts Receipt</h1>
                <div className={styles.statusContainer}>
                    <TickIcon color={"#2EAE01"}/>
                    <p className={styles.amount}>{amount}</p>
                    <p className={styles.status}>Payment Successfull</p>
                </div>

                {transactionDetails.map((item) => (
                    <div className={styles.detailsContainer} key={item.label}>
                        <p className={styles.label}>{item.label}</p>
                        <p className={styles.value}>{item.value}</p>
                    </div>
                ))}
                <button className={styles.continueBtn} type="button">Continue</button>
            </div>
        </>
    )
}