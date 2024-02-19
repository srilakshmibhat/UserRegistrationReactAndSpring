// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        age: '',
        phoneNumber: ''
    });
    const navigation = useNavigate();

    const handleChange = e => {
        const value = e.target.name === 'age' ? parseInt(e.target.value, 10) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const username = 'user';
            const password = '3666ff53-7783-45f1-a5b4-ba5343d29614';
            const headers = new Headers();
            headers.append('Access-Control-Allow-Origin', '*')
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('Content-Type', 'application/json');
            const encodedCredentials = btoa(`${username}:${password}`);
            headers.append('Authorization', `Basic ${encodedCredentials}`);

            const response = await fetch('http://localhost:8080/searchUser?phone=' + formData.phoneNumber, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            if (data.length > 0) {
                alert('User already present')
            } else {
                await fetch('http://localhost:8080/addToDb', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(formData)
                }).then(response => {
                    if (response.ok) {
                        alert('Registration successful!');
                    }
                    else {
                        alert('Registration failed, try again later');
                    }
                });
            }
            navigation('/user', { state: formData });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }

        setFormData({
            email: '',
            password: '',
            age: '',
            phoneNumber: ''
        });
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.heading}>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={styles.label}>Email:</label>
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
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    />
                </div>
                <div>
                    <label style={styles.label}>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={styles.submitButton}
                >
                    Register
                </button>
                {/* <p style={styles.linkText}>Already an existing user? <Link to="/login" style={styles.link}>Click here to login</Link>.</p> */}
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: '#fff',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    inputField: {
        width: '90%',
        padding: '8px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#555',
        color: '#fff',
    },
    submitButton: {
        width: '95%',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    linkText: {
        textAlign: 'center',
        marginTop: '20px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default RegistrationForm;
