import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function Data2(){
    const [studentDetails, setStudentDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentImage, setStudentImage] = useState('');
    const [error, setError] = useState('');
    const userRef = useRef(null);
    const [basicacademic, setBasicAcademic] = useState(null);
    const [marksData, setMarksData] = useState([]);
    const [gpaData, setGpaData] = useState({});
    const [rollNumber, setRollNumber] = useState('');
    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };

      useEffect(() => {
        if (basicacademic) {
          const fetchMarksAndGPA = async () => {
            const marksPromises = [];
            const gpaPromises = [];
    
            for (let sem = 1; sem <= basicacademic.CurrentSemester; sem++) {
              marksPromises.push(axios.get(`http://localhost:5000/getsemestermarks/${rollNumber}/${sem}`));
              gpaPromises.push(axios.get(`http://localhost:5000/getsemestergpa/${rollNumber}/${sem}`));
            }
    
            const marksResponses = await Promise.all(marksPromises);
            const gpaResponses = await Promise.all(gpaPromises);
    
            const marksData = marksResponses.map(response => response.data);
            const gpaData = gpaResponses.map(response => response.data);
    
            setMarksData(marksData);
            setGpaData(gpaData);
          };
    
          fetchMarksAndGPA();
        }
      }, [basicacademic]);
    
  

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const [Username,setUsername]=useState(null);
    const [internships,setInternships]=useState(null);
    const [Scholarships,setScholarships]=useState(null);
    const [projects,setProjects]=useState(null);
    const [sports,setSports]=useState(null);
    const [exams,setExams]=useState(null);
    const [papers,setPapers]=useState(null);
    const [events,setEvents]=useState(null);
    axios.defaults.withCredentials = true; 
    const fetchData=()=>{
        axios.get(`http://localhost:5000/studentDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
               
                const formattedStudentDetails = {
                    ...response.data,
                    DateOfBirth: formatDate(response.data.DateOfBirth)
                };
                console.log(formattedStudentDetails);
                var RollNumber=formattedStudentDetails.RollNumber;
                setStudentDetails(formattedStudentDetails);
            } else {
                setErrorMessage('No student details available');
            }
        })
        .catch(error => {
            console.error('Error fetching student details:', error);
        });
        axios.get(`http://localhost:5000/basicacademic/${rollNumber}`)
        .then(response => {
          if (response.data) {
            setBasicAcademic(response.data);
          } else {
            alert('No academic records found');
          }
        })
        .catch(error => {
          console.log(error);
        });
        axios.get(`http://localhost:5000/InternshipDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
               
                setInternships(response.data);
            } else {
                setErrorMessage('No Internship details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Internship details:', error);
        });

        axios.get(`http://localhost:5000/ScholarshipDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
               
                setScholarships(response.data);
            } else {
                setErrorMessage('No Scholarship details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Scholarship details:', error);
        });
        axios.get(`http://localhost:5000/ProjectDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
               
                setProjects(response.data);
            } else {
                setErrorMessage('No Project details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Project details:', error);
        });
        axios.get(`http://localhost:5000/SportsDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log("sports",response.data);
               
                setSports(response.data);
            } else {
                setErrorMessage('No Sports details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Sports details:', error);
        });
        axios.get(`http://localhost:5000/ExamDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
               
                setExams(response.data);
            } else {
                setErrorMessage('No Sports details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Exams details:', error);
        });

        axios.get(`http://localhost:5000/PaperDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                setPapers(response.data);
                
            } else {
                setErrorMessage('No paper details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Paper details:', error);
        });

        axios.get(`http://localhost:5000/EventDetails/${rollNumber}`)
        .then(response => {
            if (response.data) {
                console.log(response.data);
               
                setEvents(response.data);
            } else {
                setErrorMessage('No Events details available');
            }
            
        })
        .catch(error => {
            console.error('Error fetching Events details:', error);
        });
    }
    useEffect(() => {
        axios.get('http://localhost:5000/session')
        .then(response => {
            userRef.current = rollNumber;
            if(rollNumber){
            fetchData();
        }

        })
        .catch(error => {
            console.log(error);
        })
        
    },[])
    return(
        <div>

           <center> <h2>Student Details Report</h2></center>
           <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchData}>Search</button>
           <div className="persoanl-details">
           <div className='view-container'>
                <h2 className='view-heading'>Student Personal Details</h2>
                {errorMessage && <p>{errorMessage}</p>}
                {studentDetails && (
                    <>
                    <div className='img-container'>
                    <img className='prof-pic' src={`http://localhost:5000/getImage/${studentDetails.RollNumber}`} alt='img'/>
                    </div>
                   
                    <div className='view-form1'>
                        
                        
                        <p className='view-field'><strong>Roll Number:</strong> {studentDetails.RollNumber}</p>
                        <p className='view-field'><strong>Date of Birth:</strong> {studentDetails.DateOfBirth}</p>
                        <p className='view-field'><strong>Address:</strong> {studentDetails.Address}</p>
                        <p className='view-field'><strong>Phone:</strong> {studentDetails.Phone}</p>
                     
                        <p className='view-field'><strong>Sex:</strong> {studentDetails.Sex}</p>
                        <p className='view-field'><strong>Blood Group:</strong> {studentDetails.Blood_Group}</p>
                        <p className='view-field'><strong>Father's Name:</strong> {studentDetails.FatherName}</p>
                        <p className='view-field'><strong>Mother's Name:</strong> {studentDetails.Mothername}</p>
                        <p className='view-field'><strong>Father's Occupation:</strong> {studentDetails.Fatheroccupation}</p>
                        <p className='view-field'><strong>Mother's Occupation:</strong> {studentDetails.Motheroccupation}</p>
                    </div>
                    </>
                )}
            </div>

           </div>
           <div className="Academic-details">
           {basicacademic && 
        <div className='basic-detail'>
          <p>Current Semester : {basicacademic.CurrentSemester}</p>
          <p>Tenth Marks : {basicacademic.TenthMarks}</p>
          <p>Higher Secondary Marks : {basicacademic.HigherSecondaryMarks}</p>
        </div>
      }
      <div>
        <h2>Marks Table</h2>
        {marksData.length > 0 && 
          <table className='marks-table'>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject ID</th>
                <th>Marks Obtained</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((marks, sem) => (
                marks.map((mark, index) => (
                  <tr key={index}>
                    {index === 0 && <td rowSpan={marks.length}>{sem + 1}</td>}
                    <td>{mark.SubjectID}</td>
                    <td>{mark.MarksObtained}</td>
                    <td>{mark.Grade}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        }
        {Object.keys(gpaData).length > 0 && 
          <div className='gpa-show'>
            <h2>Semester GPA</h2>
            {gpaData.map((gpa, sem) => (
              <p key={sem}>Semester {sem + 1} GPA: {gpa.gpa}</p>
            ))}
          </div>
        }
      </div>

           </div>
           <div className="other-details">

           {internships && internships.map((internship, index) => (
    <div className='view-form' key={index}>
        <h2>Internship Details {index + 1}</h2>
        <p className='view-field'><strong>Roll Number:</strong> {internship.roll_number}</p>
        <p className='view-field'><strong>Employer:</strong> {internship.employer_name}</p>
        <p className='view-field'><strong>On/Off campus:</strong> {internship.on_off_campus}</p>
        <p className='view-field'><strong>CTC:</strong> {internship.ctc}</p>
        <p className='view-field'><strong>Internship Duration:</strong> {internship.internship_duration}</p>
        <p className='view-field'><strong>Internship StartDate:</strong> {internship.internship_start_date}</p>
        <p className='view-field'><strong>Internship EndDate:</strong> {internship.internship_end_date}</p>
        <p className='view-field'><strong>Product/Service Based :</strong> {internship.product_service_based}</p>
        
    </div>
))}
        {!Scholarships&&<h3 className='nodatamsg'>No Scholarshp details found</h3>}
{Scholarships && Scholarships.map((Scholarship, index) => (
    <div className='view-form1' key={index}>
        <h2>Scholarship Details {index + 1}</h2>
        <p className='view-field'><strong>Scholarship Provider:</strong> {Scholarship.ScholarshipProvider}</p>
        <p className='view-field'><strong>Amount:</strong> {Scholarship.amount}</p>
   
    </div>
))}

{projects && projects.map((project, index) => (
    <div className='view-form1' key={index}>
        <h2>Project Details {index + 1}</h2>
        <p className='view-field'><strong>Project Name:</strong> {project.title}</p>
        <p className='view-field'><strong>Guide:</strong> {project.guide}</p>
        <p className='view-field'><strong>Description:</strong> {project.project_desc}</p>
   
    </div>
))}
            {!projects && <h3 className='nodatamsg'>No Project details found</h3>}

            {sports && sports.map((sport, index) => (
    <div className='view-form1' key={index}>
        <h2>Sports Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {sport.event_name}</p>
        <p className='view-field'><strong>Award:</strong> {sport.award}</p>
    </div>
))}
            {!sports &&<h3 className='nodatamsg'>No sports details found</h3>}
            {exams && (
    <div className='view-form1'>
        <h2>Exams Attended</h2>
        <p className='view-field'><strong>GATE Score:</strong> {exams.GATE_score}</p>
        <p className='view-field'><strong>GRE Score:</strong> {exams.GRE_score}</p>
        <p className='view-field'><strong>TOEFL Score:</strong> {exams.TOEFL_score}</p>
        <p className='view-field'><strong>IELTS Score:</strong> {exams.IELTS_score}</p>
        <p className='view-field'><strong>UPSC Score:</strong> {exams.UPSC_score}</p>
        <p className='view-field'><strong>NET Score:</strong> {exams.NET_score}</p>
    </div>
)}
            {!exams &&<h3 className='nodatamsg'>No exam details found</h3>}

             
       {papers && papers.map((paper, index) => (
        <div className='view-form1' key={index}>
            <h2>Papers Presented {index + 1}</h2>
            <p className='view-field'><strong>Title:</strong> {paper.title}</p>
            <p className='view-field'><strong>Journal:</strong> {paper.journal}</p>
            <p className='view-field'><strong>Date:</strong> {paper.date_year}</p>
            <p className='view-field'><strong>DOI link:</strong> {paper.DOI_link}</p>
      
        </div>
    ))}
            {!papers &&<h3 className='nodatamsg'>No paper details found</h3>}
            {events && events.map((event, index) => (
    <div className='view-form1' key={index}>
        <h2>Events Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {event.event_name}</p>
        <p className='view-field'><strong>Institution Name:</strong> {event.institution}</p>
        <p className='view-field'><strong>Role:</strong> {event.role}</p>
        <p className='view-field'><strong>Date:</strong> {event.date}</p>
        <p className='view-field'><strong>Awards:</strong> {event.awards}</p>
  
    </div>
))}
                {!events &&<h3 className='nodatamsg'>No events details found</h3>}

           </div>
        </div>
    )
}
export default Data2;