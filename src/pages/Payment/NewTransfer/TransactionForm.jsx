import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTitle from '../../../components/registration/FormTitle';
import TextInput from '../../../components/registration/TextInput';
import SubmitButton from '../../../components/registration/SubmitButton';
import PaymentContainer from './PaymentContainer';
import '../../../components/registration/Form.css';
import './TransactionForm.css'; // Make sure to import the CSS

const TransactionForm = () => {
  const [currency, setCurrency] = useState('Sickle');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

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
            placeholder="Enter your account number here"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <div className="amount-category">
            <div className="input-container_2">
              <div className="amount-input">
              <TextInput
                label="Amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="currency-unit">{currency}</span>
              </div>
            </div>
            <div className="input-container">
              <TextInput
                label="Category"
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
          <TextInput
            label="Message"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        <SubmitButton text="Proceed" position="full" /> {/* Use position prop */}
        </div>
      </PaymentContainer>
    </div>
  );
};

export default TransactionForm;