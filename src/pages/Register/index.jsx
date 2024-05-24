import FormTitle from '../../components/registration/FormTitle';
import React, { useState } from 'react';
import TextInput from '../../components/registration/TextInput';
import '../../components/registration/Form.css';
import SubmitButton from '../../components/registration/SubmitButton';
import AccountSwitch from '../../components/registration/AccountSwitch';

function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'name') setName(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/create?type=3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered successfully:', data);
                alert('User registered successfully');
                setErrorMessage('');  // Clear error message if successful
            } else {
                const errorData = await response.json();
                console.error('Failed to register user:', errorData);
                setErrorMessage(`Failed to register user: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(`Error registering user: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormTitle text="Register" />
                <TextInput label="Email" type="email" placeholder="Enter your email here" name="email" value={email} onChange={handleChange} />
                <TextInput label="Name" type="text" placeholder="Enter your name here" name="name" value={name} onChange={handleChange} />
                <TextInput label="Password" type="password" placeholder="Enter your password here" name="password" value={password} onChange={handleChange} />
                <TextInput label="Confirm Password" type="password" placeholder="Enter your password again" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <SubmitButton text="Register" />
                <AccountSwitch
                    text="Already have an account?"
                    linkText="Login Now"
                    linkHref="/login"
                />
            </form>
        </div>
    );
}

export default RegisterScreen;