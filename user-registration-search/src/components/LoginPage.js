// src/components/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Add login authentication logic here
        console.log('Login form submitted with:', formData);
        // Reset form fields after submission
        setFormData({
            email: '',
            password: '',
        });
    };

    // CSS styles
    const styles = {
        loginPage: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
        },
        inputField: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
        },
        submitButtonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.loginPage}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={e => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
                >
                    Login
                </button>
            </form>
            {/* Text to navigate to registration page */}
            <p>Not a registered user? <Link to="/">Click here to register</Link>.</p>
        </div>
    );
};

export default LoginPage;
