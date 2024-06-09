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

const ErrorMessage = ({ error }) => {
  return <p className="error">{error}</p>
}

const TransactionForm = () => {
  const [currency, setCurrency] = useState('Sickle');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Select category');
  const [message, setMessage] = useState('');
  const [inputErrors, setInputErrors] = useState({});
  const { state: { account, userId } } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (account !== undefined) {
      setAccountNumber(account);
    }
  }, [account]);  

  const onOptionClicked = (category) => {
    setCategory(category);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if(!accountNumber) {
      errors.accountNumber = "Account number is required";
    }

    if(!amount) {
      errors.amount = "Amount is required";
    }

    if(category === "Select category") {
      errors.category = "Category not selected";
    }

    if(!message.trim()) {
      errors.message = "Please enter a message";
    }

    setInputErrors(errors);

    if(Object.keys(errors).length > 0){
      return;
    }

    navigate(
      "/payment/confirmation",
      {
        state: {
          userId: userId,
          transaction: {
            accountNumber: accountNumber,
            amount: amount,
            currency: currency,
            category: category,
            message: message
          }
        }
      }
    )
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
        <form className="form-details" onSubmit={handleSubmit}>
          <TextInput
            label="Account Number"
            type="text"
            placeholder="Enter your account number here"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="text-input_2"
          />
          {inputErrors.accountNumber && <ErrorMessage error={inputErrors.accountNumber}/>}
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
              {inputErrors.amount && <ErrorMessage error={inputErrors.amount}/>}
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
              {inputErrors.category && <ErrorMessage error={inputErrors.category}/>}
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
          {inputErrors.message && <ErrorMessage error={inputErrors.message}/>}
          <SubmitButton text="Proceed" position="right" type="submit"/>
        </form>
      </PaymentContainer>
    </div>
  );
};

export default TransactionForm;