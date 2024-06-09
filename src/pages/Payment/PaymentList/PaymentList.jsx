import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountList from './AccountList/AccountList';
import AddAccount from './AddAccount';
import SearchBar from './SearchBar';
import styles from './PaymentList.module.css';
import { useAuth } from '../../../context/AuthContext';

const BASE_URL = 'http://localhost:8080/api/v1';
export default function PaymentList() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState();
  const [selectedAccount, setSelectedAccount] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const toPaymentDetails = (selectedAccount) => {
    navigate(
      '/payment/new-transfer', 
      { state: { account: selectedAccount, userId: user.id } }
    );
  };

  const onRecipientClicked = (accNum) => {
    setSelectedAccount(accNum);
  }

  useEffect(() => {
    if(selectedAccount){
      toPaymentDetails(selectedAccount);
    }
  }, [selectedAccount])
  
  useEffect(() => {
    const fetchFavourites = async () => {
        try {
            const response = await fetch(`${BASE_URL}/favourites/all?id=${user.id}`);
            if(response.ok) {
              const data = await response.json();
              setFavourites(data);
              setFilteredList(data);
            }
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    fetchFavourites();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    const filteredItems = favourites.filter((item) => 
      item.account.myUser.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.account.myUser.phoneNumber.includes(searchTerm)
    );

    setFilteredList(filteredItems);
    
  }

  return (
    <>
      <h1>Payment</h1>
      <div className={styles.paymentContainer}>
        <SearchBar handleInputChange={handleInputChange} query={query}/>
        <AddAccount userId={user.id}/>
        <AccountList error={error} loading={loading} data={filteredList} onRecipientClicked={onRecipientClicked}/>
      </div>
      {!loading && !error && (
        <div className={styles.transferBtnContainer}>
          <button className={styles.transferBtn} onClick={() => toPaymentDetails(selectedAccount)}>
            New Transfer
          </button>
        </div>
      )}
    </>
  );
}