import React from 'react';
import styles from "../PaymentList/PaymentList.module.css";

const PaymentContainer = ({ children }) => {
  return (
    <div className={styles.paymentContainer}>
      {children}
    </div>
  );
};

export default PaymentContainer;