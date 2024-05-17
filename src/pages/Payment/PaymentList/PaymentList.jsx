import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from './AccountList';
import AddAccount from './AddAccount';
import SearchBar from './SearchBar';
import data from '../favourties/accounts.json';
import styles from './PaymentList.module.css';

export default function PaymentList() {
  const navigate = useNavigate();

  const handleNewTransferClick = () => {
    navigate('/payment/new-transfer');
  };

  return (
    <>
      <h1>Payment</h1>
      <div className={styles.paymentContainer}>
        <SearchBar />
        <AddAccount />
        <AccountList data={data} />
      </div>
      <div className={styles.transferBtnContainer}>
        <button className={styles.transferBtn} onClick={handleNewTransferClick}>
          New Transfer
        </button>
      </div>
    </>
  );
}