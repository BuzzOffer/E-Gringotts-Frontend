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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userType, setUserType] = useState('1'); // Default to Platinum Patronus
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'name') setName(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
        if (name === 'phoneNumber') setPhoneNumber(value);
        if (name === 'userType') setUserType(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/create?type=${userType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                }),
            });
    
            const text = await response.text(); // Read response as text
    
            console.log('Server response:', text); // Log the response for debugging
    
            if (response.ok) {
                try {
                    const data = text.length > 0 ? JSON.parse(text): ""; // Attempt to parse JSON
                    console.log('User registered successfully:', data);
                    alert('User registered successfully');
                    setErrorMessage('');  // Clear error message if successful
                } catch (e) {
                    console.error('Failed to parse JSON:', e);
                    setErrorMessage('Unexpected server response');
                }
            } else {
                let errorMessage;
                try {
                    const errorData = JSON.parse(text); // Attempt to parse JSON
                    errorMessage = `Failed to register user: ${errorData.message || 'Unknown error'}`;
                } catch (e) {
                    errorMessage = `Failed to register user: ${text}`; // Use text response if JSON parsing fails
                }
                console.error(errorMessage);
                setErrorMessage(errorMessage);
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
                <TextInput label="Phone Number" type="text" placeholder="Enter your phone number here" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
                <TextInput label="Password" type="password" placeholder="Enter your password here" name="password" value={password} onChange={handleChange} />
                <TextInput label="Confirm Password" type="password" placeholder="Enter your password again" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                <div className="form-group">
                    <label htmlFor="userType">User Type</label>
                    <select name="userType" value={userType} onChange={handleChange}>
                        <option value="1">Platinum Patronus</option>
                        <option value="2">Golden Galleon</option>
                        <option value="3">Silver Snitch</option>
                    </select>
                </div>
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