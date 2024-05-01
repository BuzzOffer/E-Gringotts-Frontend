import FormTitle from '../../components/registration/FormTitle'
import React, { useState } from 'react';
import TextInput from '../../components/registration/TextInput';
import '../../components/registration/Form.css';
import SubmitButton from '../../components/registration/SubmitButton';
import AccountSwitch from '../../components/registration/AccountSwitch';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the login logic here
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormTitle text="Login" />
                <TextInput label="Email" type="email" placeholder="Enter your email here" name="email" value={email} onChange={handleChange} />
                <TextInput label="Password" type="password" placeholder="Enter your password here" name="password" value={password} onChange={handleChange} />
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
