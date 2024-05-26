import React, { useState } from 'react';
import FormTitle from '../../components/registration/FormTitle';
import TextInput from '../../components/registration/TextInput';
import SubmitButton from '../../components/registration/SubmitButton';
import '../../components/registration/Form.css';
import { useLocation } from 'react-router-dom';

function AddAccountScreen() {
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState();
    const { state: { userId } } = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'accountName') setAccountName(value);
        if (name === 'accountNumber') setAccountNumber(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the account addition logic here

        const newFavourite = {
            userId: userId,
            accountId: accountNumber
        }

        console.log(newFavourite);

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFavourite)
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/favourites/create`, settings);

            if(response.ok){
                console.log("new account added");
            }
            else {
                const error = await response.json();
                console.log(error.message);
                setError(error)
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="form-container-top">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <button className="back-button" onClick={() => window.history.back()}> ← Back</button>
                </div>
                <FormTitle text="Add New Account" />
                {/* <TextInput label="Name" type="text" placeholder="Enter the name of the account" name="accountName" value={accountName} onChange={handleChange} /> */}
                <TextInput label="Account Number" type="text" placeholder="Enter the account number" name="accountNumber" value={accountNumber} onChange={handleChange} />
                <SubmitButton text="Add" />
            </form>
        </div>
    );
}

export default AddAccountScreen;