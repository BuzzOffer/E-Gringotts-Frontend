import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountList from './AccountList/AccountList';
import AddAccount from './AddAccount';
import SearchBar from './SearchBar';
import styles from './PaymentList.module.css';

const BASE_URL = 'http://localhost:8080/api/v1';
export default function PaymentList() {

  const id = 2;
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState();

  const handleNewTransferClick = () => {
    navigate('/payment/new-transfer',);
  };
  
  useEffect(() => {
    const fetchFavourites = async () => {
        try {
            const response = await fetch(`${BASE_URL}/favourites/all?id=${id}`);
            const data = await response.json();
            setFavourites(data);
        } catch (e) {
            setError(e);
        } 
    };

    fetchFavourites();
}, );

  return (
    <>
      <h1>Payment</h1>
      <div className={styles.paymentContainer}>
        <SearchBar />
        <AddAccount />
        <AccountList data={favourites} />
      </div>
      <div className={styles.transferBtnContainer}>
        <button className={styles.transferBtn} onClick={handleNewTransferClick}>
          New Transfer
        </button>
      </div>
    </>
  );
}