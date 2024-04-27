import styles from "./PaymentReceipt.module.css";

const transactionDetails = [
    {
        label: "Transasction ID",
        value: "TRX123456"
    },
    {
        label: "Date & Time",
        value: "11 April 2024, 3:00 PM"
    },
    {
        label: "From",
        value: "Wen Yang"
    },
    {
        label: "To",
        value: "Wen Yang"
    },
    {
        label: "Reference",
        value: "Wen Yang"
    },
];

export default function PaymentReceipt(){
    return(
        <>
            <div className={styles.receiptContainer}>
                <h1>E-Gringotts Receipt</h1>
                <div className={styles.statusContainer}>
                    <p>50.00 Knut</p>
                    <p>Payment Successfull</p>
                </div>

                {transactionDetails.map((item) => (
                    <div className={styles.detailsContainer}>
                        <p>{item.label}</p>
                        <p>{item.value}</p>
                    </div>
                ))}
                <button type="button">Continue</button>
            </div>
        </>
    )
}