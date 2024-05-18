import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddAccount.module.css';

export default function AddAccount() {
  const navigate = useNavigate();

  const handleAddAccountClick = () => {
    navigate('/payment/add-account');
  };

  return (
    <div className={styles.addAccountContainer}>
      <h2 className={styles.header}>Accounts</h2>
      <button className={styles.addBtn} onClick={handleAddAccountClick}>
        Add New Account
      </button>
    </div>
  );
}
