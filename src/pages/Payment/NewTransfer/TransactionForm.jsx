import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormTitle from '../../../components/registration/FormTitle';
import TextInput from '../../../components/registration/TextInput';
import SubmitButton from '../../../components/registration/SubmitButton';
import PaymentContainer from './PaymentContainer';
import '../../../components/registration/Form.css';
import './TransactionForm.css'; // Make sure to import the CSS
import Dropdown from '../../../components/Dropdown/Dropdown';
import { useAuth } from '../../../context/AuthContext';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import { categories } from '../../../components/categories';

const ErrorMessage = ({ error }) => {
  return <p className="error">{error}</p>
}

const TransactionForm = () => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState('Sickle');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Select category');
  const [message, setMessage] = useState('');
  const [inputErrors, setInputErrors] = useState({});
  const { state: { account, userId } } = useLocation();
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchBalances = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/getByUserId?id=${user.id}`);
        const data = await response.json();
        setBalances({
          Galleon: data?.galleon_balance,
          Sickle: data?.sickle_balance,
          Knut: data?.knut_balance
        });
      } catch (error) {
        console.log(error);
      }  finally {
        setLoading(false);
      }
    }

    if (account !== undefined) {
      setAccountNumber(account);
    }

    fetchBalances();
  }, [account]);  

  const onOptionClicked = (category) => {
    setCategory(category);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if(!accountNumber) {
      errors.accountNumber = "Account number is required";
    } else if(isNaN(accountNumber)) {
      errors.accountNumber = "Account must be numeric";
    }

    if(!amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      errors.amount = "Invalid amount";
    } else if (amount > balances[currency]) {
      errors.amount = "Insufficient amount";
    }

    if(category === "Select category") {
      errors.category = "Category not selected";
    }

    if(!message.trim()) {
      errors.message = "Please enter a message";
    }

    // check if account exist
    if(!isNaN(accountNumber)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/get?id=${accountNumber}`)
        if(!response.ok) {
          const error = await response.json();
          errors.accountNumber = error.message;
        }
      } catch (error) {
        console.log(error)
        errors.accountNumber = "Failed to fetch account details";
      } finally {
        setLoading(false);
      }
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
              {inputErrors.amount && !loading && <ErrorMessage error={inputErrors.amount}/>}
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
              {inputErrors.category && !loading && <ErrorMessage error={inputErrors.category}/>}
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
          {inputErrors.message && !loading && <ErrorMessage error={inputErrors.message}/>}
          <SubmitButton text="Proceed" position="right" type="submit"/>
        </form>
      </PaymentContainer>
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default TransactionForm;