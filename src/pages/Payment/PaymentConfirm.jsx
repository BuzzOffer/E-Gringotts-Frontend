import styles from './PaymentConfirm.module.css'

export default function PaymentConfirm(){
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
                        <p>Heng Wen Yang</p>
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Account Number</p>
                        <p>123456789</p>
                    </div>
                </section>

                <section className={styles.details}>
                    <h2>Transfer Details</h2>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Name</p>
                        <p>Heng Wen Yang</p>
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.label}>Account Number</p>
                        <p>123456789</p>
                    </div>
                </section>

                <section className={styles.amountContainer}>
                    <p>Transfer Amount:</p>
                    <p className={styles.amount}>50.00 Knut</p>
                </section>

                <section className={styles.buttonContainer}>
                    <button className={styles.cancelBtn} type='button'>Cancel</button>
                    <button type='button'>Confirm</button>
                </section>
            </div>
        </>
    )
}