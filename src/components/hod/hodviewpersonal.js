import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
function Hodviewpersonal() {
    const [rollNumber, setRollNumber] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };

    const fetchStudentDetails = () => {
        axios.get(`http://localhost:5000/studentDetails/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    const formattedStudentDetails = {
                        ...response.data,
                        DateOfBirth: formatDate(response.data.DateOfBirth)
                    };
                    setStudentDetails(formattedStudentDetails);
                    setErrorMessage('');
                } else {
                    setStudentDetails(null);
                    setErrorMessage('No student details available');
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            <Navbar/>
            <h2>Teacher View Student Personal Details</h2>
            <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchStudentDetails}>Search</button>
             <div id='student-view-personal'>
            <div className='view-container'>
                <h1 className='view-heading'>Student Personal Details</h1>
                <br/>
                {errorMessage && <p>{errorMessage}</p>}
                {studentDetails && (
                    <>
                    <center>
                   <img className='prof-pic' width={'300px'} src={`http://localhost:5000/getImage/${studentDetails.RollNumber}`} alt='img'/>
                   </center>
                   <center>
                    <div className='view-form'>
                        
                       <table border={'0'}> 



                            <tr>
                                <td>
                                    <p className='view-field'><strong>Roll Number:</strong><br/> {studentDetails.RollNumber}</p>
                                </td>

                                <td colSpan={'2'} id='image-td'>
                                    <p className='view-field' id='name'><strong></strong><br/> {studentDetails.Name}</p>
                                </td>

                                <td>
                                    <p className='view-field'><strong>Phone:</strong><br/> {studentDetails.Phone}</p>
                                </td>
                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Gender:</strong><br/> {studentDetails.Sex}</p></td>
                                <td></td>
                                <td></td>
                                <td ><p className='view-field'><strong>Blood Group:</strong><br/> {studentDetails.Blood_Group}</p></td>
                            </tr>
                            <tr>
                                <td>
                                <p className='view-field'><strong>DOB:</strong><br/> {studentDetails.DateOfBirth}</p>
                                    </td>
                                
                                <td colSpan={'2'}>
                                <p className='view-field'><strong>Address:</strong><br/> {studentDetails.Address}</p>
                                </td>
                                <td><p className='view-field'><strong>Resident Type:</strong><br/> {studentDetails.Residenttype}</p></td>

                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Father's Name:</strong><br/> {studentDetails.FatherName}</p></td>
                                <td colSpan={'2'}><p className='view-field'><strong>Father's Occupation:</strong><br/> {studentDetails.Fatheroccupation}</p></td>
                                <td ><p className='view-field'><strong>Father's Mobile:</strong><br/> {studentDetails.Fathermobile}</p></td>
                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Mother's Name:</strong><br/> {studentDetails.Mothername}</p></td>
                                <td colSpan={'2'}><p className='view-field'><strong>Mother's Occupation:</strong><br/> {studentDetails.Motheroccupation}</p></td>
                                <td ><p className='view-field'><strong>Mother's Mobile:</strong> <br/>{studentDetails.Mothermobile}</p></td>
                            </tr>
                        </table>
                    </div>
                    </center>
                    </>
                )}
            </div>
            </div>
        </div>
    );
}

export default Hodviewpersonal;
