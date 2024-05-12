import React, { useState } from 'react';
import FormTitle from '../../components/registration/FormTitle';
import TextInput from '../../components/registration/TextInput';
import SubmitButton from '../../components/registration/SubmitButton';
import '../../components/registration/Form.css';

function AddAccountScreen() {
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'accountName') setAccountName(value);
        if (name === 'accountNumber') setAccountNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the account addition logic here
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormTitle text="Add New Account" />
                <TextInput label="Name" type="text" placeholder="Enter the name of the account" name="accountName" value={accountName} onChange={handleChange} />
                <TextInput label="Account Number" type="text" placeholder="Enter the account number" name="accountNumber" value={accountNumber} onChange={handleChange} />
                <SubmitButton text="Add" />
            </form>
        </div>
    );
}

export default AddAccountScreen;