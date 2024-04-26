import FormTitle from '../../components/registration/FormTitle'
import React, { useState } from 'react';
import TextInput from '../../components/registration/TextInput';
import '../../components/registration/Form.css';
import SubmitButton from '../../components/registration/SubmitButton';

function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'name') setName(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the registration logic here
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormTitle text="Register" />
                <TextInput label="Email" type="email" placeholder="Enter your email here" name="email" value={email} onChange={handleChange} />
                <TextInput label="Name" type="text" placeholder="Enter your name here" name="name" value={name} onChange={handleChange} />
                <TextInput label="Password" type="password" placeholder="Enter your password here" name="password" value={password} onChange={handleChange} />
                <TextInput label="Confirm Password" type="password" placeholder="Enter your password again" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                <SubmitButton text="Register"/>

            </form></div>
    );
}

export default RegisterScreen;