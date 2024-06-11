import FormTitle from '../../components/registration/FormTitle';
import React, { useState } from 'react';
import TextInput from '../../components/registration/TextInput';
import '../../components/registration/Form.css';
import SubmitButton from '../../components/registration/SubmitButton';
import AccountSwitch from '../../components/registration/AccountSwitch';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setErrorMessage('Email and Password are required');
            return;
        }
    
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
    
            const text = await response.text(); // Read response as text
    
            console.log('Server response:', text); // Log the response for debugging
    
            if (response.ok) {
                try {
                    const data = JSON.parse(text); // Attempt to parse JSON
                    console.log('User logged in successfully:', data);
                    alert('User logged in successfully');
                    setErrorMessage('');
                    login(data);
                    navigate("/");
                } catch (e) {
                    console.error('Failed to parse JSON:', e);
                    setErrorMessage('Unexpected server response');
                }
            } else {
                let errorMessage;
                try {
                    // server response for both wrong password, unregistered account {"status":500,"error":"Internal Server Error","message":"No message available","path":"/api/v1/user/login"}
                    const message = "Unregistered Account or Wrong Password";
                    errorMessage = `Failed to login: ${message}`;
                } catch (e) {
                    errorMessage = `Failed to login: ${text}`; // Use text response if JSON parsing fails
                }
                console.error(errorMessage);
                setErrorMessage(errorMessage);
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