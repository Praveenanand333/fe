import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarfun from './Navbarfun';
import PDFData from '../PDF/PDFGenerator';
import '../CSS/view.css'
function Student() {
    const rollnumber = localStorage.getItem('rollnumber');
    const [username, setUsername] = useState('');
    return (
        <>
       <Navbarfun/>
            <h1>Student</h1>
            <p>Welcome, {rollnumber}</p>
            <PDFData/>


        </>
    );
}

export default Student;
