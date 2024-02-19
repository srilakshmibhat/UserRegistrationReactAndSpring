import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserPage = () => {
    const location = useLocation();
    const initialUser = location.state;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            const username = 'user';
            const password = '3666ff53-7783-45f1-a5b4-ba5343d29614';
            const headers = new Headers();
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('Content-Type', 'application/json');
            const encodedCredentials = btoa(`${username}:${password}`);

            headers.append('Authorization', `Basic ${encodedCredentials}`);

            const response = await fetch(`http://localhost:8080/searchUser?phone=${searchTerm}`, {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length >= 1) {
                    alert('Found ' + data.length + ' user. Setting their data');
                    setSearchTerm('');
                    setSearchResults(data[0]);
                } else {
                    alert('No user found for the phone number. Setting your data');
                    setSearchTerm('');
                    setSearchResults(initialUser);
                }
            } else {
                console.error('Failed to fetch user data');
            }
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search by phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                style={styles.input}
            />
            <div style={styles.box}>
                <h3 style={styles.heading}>User Details</h3>
                {searchResults && (
                    <div key={searchResults.id} style={styles.userCard}>
                        <p>
                            <strong>Email:</strong> {searchResults.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {searchResults.age}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {searchResults.phoneNumber}
                        </p>
                    </div>
                )}
                {!searchResults && (
                    <div key={initialUser.id} style={styles.userCard}>
                        <p>
                            <strong>Email:</strong> {initialUser.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {initialUser.age}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {initialUser.phoneNumber}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        color: '#fff',
    },
    box: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
        backgroundColor: '#333',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '15px',
        // color: '#ccc',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px',
    },
    input: {
        width: '25%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        fontSize: '16px',
        backgroundColor: '#222',
        color: '#fff',
    },
    userCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#555',
    },
};

export default UserPage;
