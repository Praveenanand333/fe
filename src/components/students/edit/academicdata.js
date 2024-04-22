import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../../Navbar';

function EditStudentAcademic() {
    const userRef = useRef(null);
    const [basicacademic, setBasicAcademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);
    const [semester, setSemester] = useState('');
    const [tenthMarks, setTenthMarks] = useState('');
    const [higherSecondaryMarks, setHigherSecondaryMarks] = useState('');
    const [cutoff, setCutoff] = useState('');
    const [gpa, setgpa] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'semester') {
            setSemester(value);
        } else if (name === 'tenthMarks') {
            setTenthMarks(value);
        } else if (name === 'higherSecondaryMarks') {
            setHigherSecondaryMarks(value);
        } else if (name === 'sem'){
            setSem(value);
        } else if (name === 'cutoff'){
            setCutoff(value);
        }
    };

    useEffect(() => {
       
                userRef.current = localStorage.getItem('rollnumber')

                axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            setBasicAcademic(response.data);
                            setSemester(response.data.CurrentSemester);
                            setTenthMarks(response.data.TenthMarks);
                            setHigherSecondaryMarks(response.data.HigherSecondaryMarks);
                            setCutoff(response.data.Cutoff);
                        } else {
                            alert('No academic data found');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });

                axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
                    .then(response => {
                        if (response.data) {
                            setMarks(response.data);
                        } else {
                            alert('No marks found for selected semester');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    axios.get(`http://localhost:5000/getsemestergpa/${userRef.current}/${sem}`)
                    .then(response => {
                 
                     setgpa(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    axios.post(`http://localhost:5000/calculategpa/${userRef.current}/${sem}`)
                    .then(response => {
                     console.log('gpa',response.data);
                     setgpa(response.data.gpa);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                   
          
    }, [sem]);

    const handleEditMarks = (subjectID, newMarks) => {
        if (newMarks < 0 || newMarks > 100) {
            alert('Marks should be between 0 and 100');
            return;
        }
        axios.put(`http://localhost:5000/editmarks/${userRef.current}/${subjectID}`, { marks: newMarks })
            .then(response => {
                console.log('Marks edited successfully');
                axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
                    .then(response => {
                        if (response.data) {
                            setMarks(response.data);
                        } else {
                            alert('No marks found for selected semester');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleEditGrade = (subjectID, newGrade) => {
       
        axios.put(`http://localhost:5000/editgrade/${userRef.current}/${subjectID}`, { grade: newGrade })
            .then(response => {
                console.log('Marks edited successfully');
                axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
                    .then(response => {
                        if (response.data) {
                            setMarks(response.data);
                        } else {
                            alert('No marks found for selected semester');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleEditBasicAcademic = () => {
        // Make API call to edit basic academic details
        if(tenthMarks<=100 && higherSecondaryMarks<=100 && tenthMarks>=0 && higherSecondaryMarks>=0 && cutoff>=0 && cutoff <=200){

        axios.put(`http://localhost:5000/editbasicacademic/${userRef.current}`, {
            CurrentSemester: semester,
            TenthMarks: tenthMarks,
            HigherSecondaryMarks: higherSecondaryMarks,
            Cutoff: cutoff
        })
        .then(response => {
            console.log('Basic academic details edited successfully');
            setBasicAcademic({
                ...basicacademic,
                CurrentSemester: semester,
                TenthMarks: tenthMarks,
                HigherSecondaryMarks: higherSecondaryMarks,
                Cutoff: cutoff
                
            });
            toast.success("Basic Academic Details Updated",{
                autoClose:2500,
                position:'top-center'
            });
        })
        .catch(error => {
            console.log(error);
            toast.error("Error Occurred!!! Enter valid data",{
                autoClose:2500,
                position:'top-center'
            });
        });
        }
        else{
            toast.error("Enter valid data !!!",{
                autoClose:2500,
                position:'top-center'
            });
        }
        
    };
    const handlegpa=()=>{
        axios.post(`http://localhost:5000/calculategpa/${userRef.current}/${sem}`)
                    .then(response => {
                     console.log('gpa',response.data.gpa);
                   
                     setgpa(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }
    return (
        <>  
        <div id='student-edit-academic'>
            <Navbar />
            
                {basicacademic && <div className='basic-detail'>
                    <div className='school-table-container'>
                    <ToastContainer />
                    <table border={'0'} className='school-table'>

                        <tr>
                            <td colSpan={'3'}>
                                <h2>SCHOOL EDUCATION DETAILS</h2>
                            </td>
                            <td>
                            <button className="submit-button" onClick={handleEditBasicAcademic}>
                                Save
                            </button>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <p className='topic'><span id='hide-text'>00</span>Secondary Percentage : </p><br/>
                                <input
                                type="number"
                                name="tenthMarks"
                                placeholder='10th/SSLC'
                                value={tenthMarks}
                                onChange={handleInputChange}
                                />
                            </td>
                            
                            <td>
                                <p className='topic'><span id='hide-text'>000</span>Higher Secondary Percentage : </p><br/>
                                <input
                                    type="number"
                                    name="higherSecondaryMarks"
                                    placeholder='12th/HSC'
                                    value={higherSecondaryMarks}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <p className='topic'><span id='hide-text'>00</span>Cut-off Marks : </p><br/>
                                <input
                                type="number"
                                name="cutoff"
                                placeholder='out of 200'
                                value={cutoff}
                                onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <p className='topic'><span id='hide-text'>00</span>Current Semester : </p><br/>
                                <input
                                type="number"
                                name="semester"
                                value={semester}
                                onChange={handleInputChange}
                                />
                            </td> 
                        </tr>
                    </table>
                    </div>   
                </div>}
                <div  className='marks-view'>
                    <table border={'0'} id='selector-table'>
                        <tr>
                            <td><label htmlFor="semSelect" style={{fontWeight: "bold"}}>Select Semester:</label>
                    <select
                        id="semSelect"
                        name="sem"
                        value={sem || ''}
                        onChange={handleInputChange}
                    >
                        <option value="" >Select Semester</option>
                        {[...Array(8).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                    </select></td>
                            <td><h2>Marks Table</h2></td>
                            <td><button className="submit-button" style={{fontSize:"1.5em"}} onClick={handlegpa}>
                                Save
                            </button></td>
                        </tr>
                    </table>
        
                {marks && <div>
                   
                    {sem && <table className='marks-table'>
                        <thead>
                            <tr>
                                <th>Subject ID</th>
                                <th>Subject Name</th>
                                <th>Edit Marks</th>
                                <th>Grade</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark, index) => (
                                <tr key={index}>
                                    <td>{mark.SubjectID}</td>
                                    <td>{mark.SubjectName}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={mark.MarksObtained}
                                            onChange={(e) => {
                                                const newMarks = e.target.value;
                                                handleEditMarks(mark.SubjectID, newMarks);
                                            }}
                                        />
                                    </td>
                                    <td>
                                    <select id="gradeSelect" name="grade" value={mark.Grade || ""}
                                    onChange={(e) => {
                                        const newGrade = e.target.value;
                                        handleEditGrade(mark.SubjectID, newGrade);
                                    }}
                                    >
                                        <option disabled value="">Select Grade</option>
                                        <option value="O">O</option>
                                        <option value="A+">A+</option>
                                        <option value="A">A</option>
                                        <option value="B+">B+</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
  
                                        </select>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>}
                {gpa && <center><p className='gpa-show'>Semester GPA:{gpa.gpa}</p></center>}
            </div>
            </div>
        </>
    );
}

export default EditStudentAcademic;
