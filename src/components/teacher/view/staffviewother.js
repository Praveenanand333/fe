import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import styles from '../../CSS/viewotherdata.css'
function Staffviewother(){
    const [Username,setUsername]=useState(null);
    const [rollNumber, setRollNumber] = useState('');
    const [internships,setInternships]=useState(null);
    const [Scholarships,setScholarships]=useState(null);
    const [projects,setProjects]=useState(null);
    const [sports,setSports]=useState(null);
    const [exams,setExams]=useState(null);
    const [papers,setPapers]=useState(null);
    const [events,setEvents]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    axios.defaults.withCredentials = true; 
    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };
    const fetchStudentDetails = (event) => {
        const username = rollNumber;
        axios.get(`http://localhost:5000/InternshipDetails/${username}`)
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

                    axios.get(`http://localhost:5000/ScholarshipDetails/${username}`)
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
                    axios.get(`http://localhost:5000/ProjectDetails/${username}`)
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
                    axios.get(`http://localhost:5000/SportsDetails/${username}`)
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
                    axios.get(`http://localhost:5000/ExamDetails/${username}`)
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

                    axios.get(`http://localhost:5000/PaperDetails/${username}`)
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

                    axios.get(`http://localhost:5000/EventDetails/${username}`)
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
        if(rollNumber){
            fetchStudentDetails()
        }
    }, []);
    return(
        <>
        <Navbar/>
        <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchStudentDetails}>Search</button>
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
    <div className='view-form' key={index}>
        <h2>Scholarship Details {index + 1}</h2>
        <p className='view-field'><strong>Scholarship Provider:</strong> {Scholarship.ScholarshipProvider}</p>
        <p className='view-field'><strong>Amount:</strong> {Scholarship.amount}</p>
   
    </div>
))}

{projects && projects.map((project, index) => (
    <div className='view-form' key={index}>
        <h2>Project Details {index + 1}</h2>
        <p className='view-field'><strong>Project Name:</strong> {project.title}</p>
        <p className='view-field'><strong>Guide:</strong> {project.guide}</p>
        <p className='view-field'><strong>Description:</strong> {project.project_desc}</p>
   
    </div>
))}
            {!projects && <h3 className='nodatamsg'>No Project details found</h3>}

            {sports && sports.map((sport, index) => (
    <div className='view-form' key={index}>
        <h2>Sports Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {sport.event_name}</p>
        <p className='view-field'><strong>Award:</strong> {sport.award}</p>
    </div>
))}
            {!sports &&<h3 className='nodatamsg'>No sports details found</h3>}
            {exams && (
    <div className='view-form'>
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
        <div className='view-form' key={index}>
            <h2>Papers Presented {index + 1}</h2>
            <p className='view-field'><strong>Title:</strong> {paper.title}</p>
            <p className='view-field'><strong>Journal:</strong> {paper.journal}</p>
            <p className='view-field'><strong>Date:</strong> {paper.date_year}</p>
            <p className='view-field'><strong>DOI link:</strong> {paper.DOI_link}</p>
      
        </div>
    ))}
            {!papers &&<h3 className='nodatamsg'>No paper details found</h3>}
            {events && events.map((event, index) => (
    <div className='view-form' key={index}>
        <h2>Events Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {event.event_name}</p>
        <p className='view-field'><strong>Institution Name:</strong> {event.institution}</p>
        <p className='view-field'><strong>Role:</strong> {event.role}</p>
        <p className='view-field'><strong>Date:</strong> {event.date}</p>
        <p className='view-field'><strong>Awards:</strong> {event.awards}</p>
  
    </div>
))}
                {!events &&<h3 className='nodatamsg'>No events details found</h3>}
        </>
    )
}
export default Staffviewother;