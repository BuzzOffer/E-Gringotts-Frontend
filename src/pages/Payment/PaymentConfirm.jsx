import { useNavigate, useLocation } from 'react-router-dom'
import styles from './PaymentConfirm.module.css'
import { useEffect, useState } from 'react';
import { ApiDateFormat } from '../../utils/DateFormatting';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

export default function PaymentConfirm(){
    const navigate = useNavigate();
    const { state: { transaction, userId } } = useLocation();
    const [destinationAccount, setDestinationAccount] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    // const [transactionData, setTransactionData] = useState({});

    const isPropertyEmpty = (obj) => {
        for(var key in obj){
            // == null also checks for undefined
            if(obj[key] == null || obj[key] === "") {
                console.log(`${key} is empty`);
                return true;
            }
        }

        return false;
    }

    const onConfirmClick = async () => {
        setLoading(true);
        const today = ApiDateFormat(new Date());

        console.log(transaction);
        console.log(destinationAccount);
        let transactionData = {};

        if(transaction && destinationAccount) {
            transactionData = {
                amount: transaction.amount,
                dateTime: today,
                source_account_id_long: userId, 
                destination_account_id_long: transaction.accountNumber,
                category: transaction.category,
                description: transaction.message,
                sourceCurrency: transaction.currency,
                destinationCurrency: transaction.currency
            };
        }

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        };

        if(isPropertyEmpty(transactionData)) {
            setError("Oops! Something went wrong, please try again!");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/create`, settings)
            if(response.ok) {
                console.log("Transaction created");
                navigate("/payment/confirmation/receipt",
                    {
                        state: {
                            date: today,
                            userId: userId
                        }
                    }
                )
            }
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/account/get?id=${transaction.accountNumber}`);
                const data = await response.json();
                setDestinationAccount(data);
            } catch (error) {
                setError(error);
            }
        };
        fetchAccount();
    }, [])

    console.log(destinationAccount);

    if(!Object.keys(destinationAccount).length){
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>Payment Confirmation</h1>
            <p className={styles.subHeading}>Please verify the information</p>

            <div className={styles.infoContainer}>
                <section className={styles.details}>
                    <h2>Sender Details</h2>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Name</p>
                        <p>Heng Wen Yang</p>
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Account Number</p>
                        <p>123456789</p>
                    </div>
                </section>

                <section className={styles.details}>
                    <h2>Receipient Details</h2>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Name</p>
                        <p>{destinationAccount.myUser.name}</p>
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Account Number</p>
                        <p>{destinationAccount.id}</p>
                    </div>
                </section>

                <section className={styles.details}>
                    <h2>Transfer Details</h2>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Category</p>
                        <p>{transaction.category}</p>
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Message</p>
                        <p>{transaction.message}</p>
                    </div>
                </section>

                <section className={styles.amountContainer}>
                    <p>Transfer Amount:</p>
                    <p className={styles.amount}>{transaction.amount} {transaction.currency}</p>
                </section>

                <section className={styles.buttonContainer}>
                    <button className={styles.cancelBtn} type='button'>Cancel</button>
                    <button 
                        type='button' 
                        onClick={onConfirmClick}
                    >
                        Confirm
                    </button>
                </section>
                {loading && <LoadingOverlay />}
            </div>
        </>
    )
}