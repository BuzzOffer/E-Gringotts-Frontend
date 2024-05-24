import FormTitle from '../../components/registration/FormTitle';
import React, { useState } from 'react';
import TextInput from '../../components/registration/TextInput';
import '../../components/registration/Form.css';
import SubmitButton from '../../components/registration/SubmitButton';
import AccountSwitch from '../../components/registration/AccountSwitch';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User logged in successfully:', data);
                alert('User logged in successfully');
                setErrorMessage('');
            } else {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    errorData = { message: errorText };
                }
                console.error('Failed to login:', errorData);
                setErrorMessage(`Failed to login: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(`Error logging in: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormTitle text="Login" />
                <TextInput label="Email" type="email" placeholder="Enter your email here" name="email" value={email} onChange={handleChange} />
                <TextInput label="Password" type="password" placeholder="Enter your password here" name="password" value={password} onChange={handleChange} />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <SubmitButton text="Login" />
                <AccountSwitch
                    text="Don't have an account?"
                    linkText="Sign up here"
                    linkHref="/register"
                />
            </form>
        </div>
    );
}

export default LoginScreen;