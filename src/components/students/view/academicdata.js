import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import styles from '../../CSS/view_academicdata.css'
function ViewStudentAcademic(){
    const userRef = useRef(null);
    const cursemRef= useRef(null);
    const  [basicacademic,setbasicacademic]=useState(null);
    const [marks, setMarks] = useState(null);
    const  [sem,setsem]=useState(null);
    const [gpa,setgpa]=useState(null);
    const handleInputChange = (event) => {
        setsem(event.target.value);
       
    };
    useEffect(() => {
       
            userRef.current = localStorage.getItem('rollnumber');

        axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
        .then(response => {
            if (response.data) {
                setbasicacademic(response.data);
                cursemRef.current = response.data.CurrentSemester;
            } else {
               alert('no academic found');
            }
        })
        .catch(error => {
            console.log(error);
        })
        axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
        .then(response => {
            if(response.data){
                setMarks(response.data);
            }
            else{
                alert('no marks found');
            }
        })
        .catch(err => {
            console.log(err);
        })
       axios.get(`http://localhost:5000/getsemestergpa/${userRef.current}/${sem}`)
       .then(response => {
        console.log('sem gpa',response.data);
        setgpa(response.data);
       })
     
        
    },[sem])

    return(
        <>
        <div id='student-view-academic'>
        <Navbar/>
        

        {basicacademic &&<div className='basic-detail'>

            <div className='school-table-container'>
            <table border={'0'} className='school-table'>

                        <tr>
                            <td colSpan={'4'}>
                                <h2>SCHOOL EDUCATION DETAILS</h2>
                            </td>
                        </tr>

                        <tr>
                            <td id='td1'>
                                <p className='topic'>Secondary Percentage : {basicacademic.TenthMarks}%</p><br/>
                            </td>
                            
                            <td id='td2'>
                                <p className='topic'>Higher Secondary Percentage : {basicacademic.HigherSecondaryMarks}%</p><br/>
                                
                            </td>
                            <td id='td3'>
                                <p className='topic'>Cutoff Marks : {basicacademic.Cutoff}</p><br/>
                            </td>
                            <td id='td4'>
                                <p className='topic'>Current Semester : {basicacademic.CurrentSemester}</p><br/>
                            </td>

                            
                        </tr>
                    </table>
            
            </div>
            </div>}


            <div className='marks-view'>
            <center><h2>Marks Table</h2></center>
            <div>
            <label htmlFor="semSelect">Select Semester:</label>
            <select
                id="semSelect"
                value={sem || ''}
                onChange={handleInputChange}
            >
                <option value="">Select Semester</option>
                {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
        </div>
        {marks &&  <div>

      {sem && <table className='marks-table' id='view-marks-table'>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Credits</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.SubjectID}</td>
              <td>{mark.SubjectName}</td>
              <td>{mark.credits}</td>
              <td>{mark.MarksObtained}</td>
              <td>{mark.Grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
}
      {gpa && <center><p className='gpa-show'>Semester GPA:{gpa.gpa}</p></center>}
    </div>}
    </div>
    </div>
        </>
    )
}
export default ViewStudentAcademic;