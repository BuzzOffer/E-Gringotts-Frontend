import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormTitle from '../../../components/registration/FormTitle';
import TextInput from '../../../components/registration/TextInput';
import SubmitButton from '../../../components/registration/SubmitButton';
import PaymentContainer from './PaymentContainer';
import '../../../components/registration/Form.css';
import './TransactionForm.css'; // Make sure to import the CSS
import Dropdown from '../../../components/Dropdown/Dropdown';

const categories = ["Entertainment", "Food", "Misc.", "Game"];

const TransactionForm = () => {
  const [currency, setCurrency] = useState('Sickle');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Select category');
  const [message, setMessage] = useState('');
  const { state: { account } } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (account !== undefined) {
      setAccountNumber(account);
    }
  }, [account]);  

  const onOptionClicked = (category) => {
    setCategory(category);
  }
  
  return (
    <div>
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <FormTitle text="Payment" align='left'/>

      <PaymentContainer>
        <h3>Select your preferred currency:</h3>
        <div className="currency-selection">
          <button
            className={`currency-button ${currency === 'Galleon' ? 'selected' : ''}`}
            onClick={() => setCurrency('Galleon')}
          >
            Galleon
          </button>
          <button
            className={`currency-button ${currency === 'Sickle' ? 'selected' : ''}`}
            onClick={() => setCurrency('Sickle')}
          >
            Sickle
          </button>
          <button
            className={`currency-button ${currency === 'Knut' ? 'selected' : ''}`}
            onClick={() => setCurrency('Knut')}
          >
            Knut
          </button>
        </div>
      </PaymentContainer>

      <PaymentContainer>
        <h3>Enter the following details:</h3>
        <div className="form-details">
          <TextInput
            label="Account Number"
            type="text"
            placeholder="Enter your account number here"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="text-input_2"
          />
          <div className="amount-category">
            <div className="input-container_2">
              <div className="amount-input">
                <TextInput
                  label="Amount"
                  type="text"
                  placeholder="Enter amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-input_2"
                />
                <span className="currency-unit">{currency}</span>
              </div>
            </div>
            {/* <div className="input-container">
              <TextInput
                label="Category"
                type="text"
                placeholder="Select category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-input_2"
              />
            </div> */}
            <div className="dropdownContainer">
              <Dropdown label={category} options={categories} onOptionClicked={onOptionClicked}/>
            </div>
          </div>
          <TextInput
            label="Message"
            type="text"
            placeholder="Enter your message here"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-input_2"
          />
        <SubmitButton text="Proceed" position="right" />
        </div>
      </PaymentContainer>
    </div>
  );
};

export default TransactionForm;