import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';

function Staffviewacademic(){
    const userRef = useRef(null);
    const [rollNumber, setRollNumber] = useState('');
    const cursemRef= useRef(null);
    const  [basicacademic,setbasicacademic]=useState(null);
    const [marks, setMarks] = useState(null);
    const  [sem,setsem]=useState(null);
    const [gpa,setgpa]=useState(null);
    const [verifiedstatus,setverifiedstatus]=useState(false);
    const handleInputChangesem = (event) => {
        setsem(event.target.value);
       
    };
    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };
    const fetchdata = () => {
        axios.get(`http://localhost:5000/basicacademic/${rollNumber}`)
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
        axios.get(`http://localhost:5000/getsemestermarks/${rollNumber}/${sem}`)
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
       axios.get(`http://localhost:5000/getsemestergpa/${rollNumber}/${sem}`)
       .then(response => {
    
        setgpa(response.data);
       })
       .catch(err => {
        console.log(err);
        })

       axios.get(`http://localhost:5000/getverifystatus/${rollNumber}/${sem}`)
       .then(response => {
        if(response.data.allVerified==1){
            setverifiedstatus(true);
        }
        else{
            setverifiedstatus(false);
        }
       
       })
       .catch(err => {
        console.log(err);
        })
        
    }

    useEffect(() => {
       
       
            userRef.current = rollNumber;
            if(rollNumber){
            fetchdata();
        }

     
       
        
    },[sem])
   
    const Approve=() => {
        axios.get(`http://localhost:5000/approve/${rollNumber}/${sem}`)
        .then(response => {
            setverifiedstatus(true);
            alert("Marks are approved")
        })
        .catch(error => {
            console.log(error);
        })
    }
    const unApprove=()=>{
        axios.get(`http://localhost:5000/unapprove/${rollNumber}/${sem}`)
        .then(response => {
            setverifiedstatus(false);
            alert("Marks are unapproved")
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <>
         <div id='student-view-academic'>
         <Navbar/>
         <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchdata}>Search</button>
       
        

        {basicacademic &&<div className='basic-detail'>

            <div className='school-table-container'>
            <table border={'1'} className='school-table'>

                        <tr>
                            <td colSpan={'3'}>
                                <h2>BASIC ACADEMIC DETAILS</h2>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p className='topic'><span id='hide-text'>00</span>Secondary Percentage : {basicacademic.TenthMarks}</p><br/>
                            </td>
                            
                            <td>
                                <p className='topic'><span id='hide-text'>000</span>Higher Secondary Percentage : {basicacademic.HigherSecondaryMarks}</p><br/>
                                
                            </td>

                            <td>
                                <p className='topic'><span id='hide-text'>00</span>Current Semester : {basicacademic.CurrentSemester}</p><br/>
                            </td>

                            
                        </tr>
                    </table>
            
            </div>
            </div>}
            <div>
            <label htmlFor="semSelect">Select Semester:</label>
            <select
                id="semSelect"
                value={sem || ''}
                onChange={handleInputChangesem}
            >
                <option value="">Select Semester</option>
                {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
            <p>Semester: {sem}</p>
        </div>
        {marks &&  <div>
      <h2>Marks Table</h2>
      <table className='marks-table'>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.SubjectID}</td>
              <td>{mark.MarksObtained}</td>
              <td>{mark.Grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {gpa && <p className='gpa-show'>Semester GPA:{gpa.gpa}</p>}
    </div>}
    </div>
        </>
    )
}
export default Staffviewacademic;