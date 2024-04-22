import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import Navbarfun from './Navbarfun';
import PDFData2 from '../PDF/PDFGenerator2';
function Hod() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/session', {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                const data = response.data;
                console.log(data);
                if (data.username) {
                    setUsername(data.username);
                    console.log('username set');
                } else {
                    setUsername('No username found');
                }
            } catch (error) {
                console.log('Error:', error);
                setUsername('Error fetching username');
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <Navbarfun/>
            <h1>HOD</h1>
            <p>Welcome, {username}</p>
            <PDFData2/>
        </>
    );
}

export default Hod;
