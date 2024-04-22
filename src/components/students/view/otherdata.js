import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import styles from '../../CSS/viewotherdata.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal'
import CustomCard from '../../cards/CustomCard';
function ViewStudentOther(){
    const [Username,setUsername]=useState(null);
    const [internships,setInternships]=useState(null);
    const [Scholarships,setScholarships]=useState(null);
    const [projects,setProjects]=useState(null);
    const [sports,setSports]=useState(null);
    const [exams,setExams]=useState(null);
    const [papers,setPapers]=useState(null);
    const [events,setEvents]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [interViewModal, setInternViewModal] = useState(false);
    const [scholarshipViewModal, setScholarshipViewModal] = useState(false);
    const [projectViewModal, setProjectViewModal] = useState(false);
    const [sportsViewModal, setSportsViewModal] = useState(false);
    const [examsViewModal, setExamsViewModal] = useState(false);
    const [papersViewModal, setPapersViewModal] = useState(false);
    const [eventsViewModal, setEventsViewModal] = useState(false);
    axios.defaults.withCredentials = true; 
    useEffect(() => {
       
                const username =localStorage.getItem('rollnumber');
                
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
             
    }, []);
    return(
        <>
        <div id='student-edit-other'>

            <Navbar />

            <div className='custom-card-container'>
            {!internships&&<h3>No Internship details found</h3>}
            {internships && internships.map((internship, index) => (
                <>
                    <CustomCard
                        type='internship'
                        details={internship}
                        onClick={()=>setInternViewModal(true)}
                    />
                    <Modal isOpen={interViewModal} onRequestClose={() => setInternViewModal(false)} className={'modal-content'} >
                        <div id='intern-modal'>
                            <h1>Internship Details</h1>
                                <div id='modal-input-table'>
                                    <table border={'0'} className='view-table'>
                                        <tr>
                                            <td id='topic-td'>Employer Name :
                                            </td>
                                            <td id='input-td'><label>{internship.employer_name}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>Mode :
                                            </td>
                                            <td id='input-td'><label>{internship.on_off_campus}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>CTC :
                                            </td>
                                            <td id='input-td'><label>{internship.ctc}</label>
                                        
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>Duration :
                                            </td>
                                            <td id='input-td'><label>{internship.InternshipDuration}</label>
                                        
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>Start Date :
                                            </td>
                                            <td id='input-td'><label>{internship.InternshipStartDate}</label>
                                        
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>End Date :
                                            </td>
                                            <td id='input-td'><label>{internship.InternshipEndDate}</label>
                                        
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id='topic-td'>Product/Service Based :
                                            </td>
                                            
                                            <td id='input-td'><label>{internship.product_service_based}</label>
                                            </td>
                                        </tr>
                                    </table> 
                    </div>
                    <button onClick={() => setInternViewModal(false)}>Close</button>
                </div>
            </Modal>
            </>   
))}         </div>
            
            <div className='custom-card-container'>
            {!Scholarships&&<h3>No Scholarship details found</h3>}
            {Scholarships && Scholarships.map((Scholarship, index) => (
                <>
                <CustomCard
                    type='scholarship'
                    details={Scholarship}
                    onClick={()=>setScholarshipViewModal(true)}
                />
                <Modal isOpen={scholarshipViewModal} onRequestClose={() => setScholarshipViewModal(false)} className={'modal-content'} >
                    <div id='intern-modal'>
                        <h1>Scholarship Details</h1>
                            <div id='modal-input-table'>
                                <table border={'0'} className='view-table'>
                                    <tr>
                                        <td id='topic-td'>Provider Name :
                                        </td>
                                        <td id='input-td'><label>{Scholarship.ScholarshipProvider}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Amount :
                                        </td>
                                        <td id='input-td'><label>{Scholarship.amount}</label>
                                        </td>
                                    </tr>
                                </table> 
                </div>
                <button onClick={() => setScholarshipViewModal(false)}>Close</button>
            </div>
        </Modal>
        </>  
))}     </div>

            <div className='custom-card-container'>
            {!projects&&<h3>No Project details found</h3>}
            {projects && projects.map((Project, index) => (
                 <>
                 <CustomCard
                     type='project'
                     details={Project}
                     onClick={()=>setProjectViewModal(true)}
                 />
                 <Modal isOpen={projectViewModal} onRequestClose={() => setProjectViewModal(false)} className={'modal-content'} >
                     <div id='project-modal'>
                         <h1>Project Details</h1>
                             <div id='modal-input-table'>
                                 <table border={'0'} className='view-table'>
                                     <tr>
                                         <td id='topic-td'>Project Name :
                                         </td>
                                         <td id='input-td'><label>{Project.title}</label>
                                         </td>
                                     </tr>
                                     <tr>
                                         <td id='topic-td'>Guide :
                                         </td>
                                         <td id='input-td'><label>{Project.guide}</label>
                                         </td>
                                     </tr>
                                     <tr>
                                         <td id='topic-td'>Description :
                                         </td>
                                         <td id='input-td'><label>{Project.project_desc}</label>
                                         </td>
                                     </tr>
                                 </table> 
                 </div>
                 <button onClick={() => setProjectViewModal(false)}>Close</button>
             </div>
         </Modal>
         </>  
            ))}</div>

            <div className='custom-card-container'>
            {!sports &&<h3>No sports details found</h3>}
            {sports && sports.map((sport, index) => (
                <>
                <CustomCard
                    type='sports'
                    details={sport}
                    onClick={()=>setSportsViewModal(true)}
                />
                <Modal isOpen={sportsViewModal} onRequestClose={() => setSportsViewModal(false)} className={'modal-content'} >
                    <div id='sports-modal'>
                        <h1>Sports Details</h1>
                            <div id='modal-input-table'>
                                <table border={'0'} className='view-table'>
                                    <tr>
                                        <td id='topic-td'>Event Name :
                                        </td>
                                        <td id='input-td'><label>{sport.event_name}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Award :
                                        </td>
                                        <td id='input-td'><label>{sport.award}</label>
                                        </td>
                                    </tr>
                                </table> 
                </div>
                <button onClick={() => setSportsViewModal(false)}>Close</button>
            </div>
        </Modal>
        </>  
))}         </div>
            


            {/* {exams && exams.map((exam, index) => (
            <div className='view-form'>
                <h2>Exams Attended</h2>
                <p className='view-field'><strong>GATE Score:</strong> {exam.GATE_score}</p>
                <p className='view-field'><strong>GRE Score:</strong> {exam.GRE_score}</p>
                <p className='view-field'><strong>TOEFL Score:</strong> {exam.TOEFL_score}</p>
                <p className='view-field'><strong>IELTS Score:</strong> {exam.IELTS_score}</p>
                <p className='view-field'><strong>UPSC Score:</strong> {exam.UPSC_score}</p>
                <p className='view-field'><strong>NET Score:</strong> {exam.NET_score}</p>
            </div>
))} */}



        <div className='custom-card-container'>     
        {!papers && <h3>No Papers Published</h3>}       
        {papers && papers.map((paper, index) => (
            <>
            <CustomCard
                type='papers'
                details={paper}
                onClick={()=>setPapersViewModal(true)}
            />
            <Modal isOpen={papersViewModal} onRequestClose={() => setPapersViewModal(false)} className={'modal-content'} >
                <div id='paper-modal'>
                    <h1>Paper Details</h1>
                        <div id='modal-input-table'>
                            <table border={'0'} className='view-table'>
                                <tr>
                                    <td id='topic-td'>Title :
                                    </td>
                                    <td id='input-td'><label>{paper.title}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id='topic-td'>Journal :
                                    </td>
                                    <td id='input-td'><label>{paper.journal}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id='topic-td'>Date Year :
                                    </td>
                                    <td id='input-td'><label>{paper.date_year}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td id='topic-td'>DOI Link :
                                    </td>
                                    <td id='input-td'><label>{paper.DOI_link}</label>
                                    </td>
                                </tr>
                            </table> 
            </div>
            <button onClick={() => setPapersViewModal(false)}>Close</button>
        </div>
    </Modal>
    </>  
        ))}</div>
            
        <div className='custom-card-container'>
        {!events && <h3>No Events Participated</h3>}
        {events && events.map((event, index) => (
                <>
                <CustomCard
                    type='events'
                    details={event}
                    onClick={()=>setEventsViewModal(true)}
                />
                <Modal isOpen={eventsViewModal} onRequestClose={() => setEventsViewModal(false)} className={'modal-content'} >
                    <div id='event-modal'>
                        <h1>Event Details</h1>
                            <div id='modal-input-table'>
                                <table border={'0'} className='view-table'>
                                    <tr>
                                        <td id='topic-td'>Event Name :
                                        </td>
                                        <td id='input-td'><label>{event.event_name}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Institution :
                                        </td>
                                        <td id='input-td'><label>{event.institution}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Date :
                                        </td>
                                        <td id='input-td'><label>{event.date}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Role :
                                        </td>
                                        <td id='input-td'><label>{event.role}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id='topic-td'>Awards :
                                        </td>
                                        <td id='input-td'><label>{event.awards}</label>
                                        </td>
                                    </tr>
                                </table> 
                </div>
                
                <button onClick={() => setEventsViewModal(false)}>Close</button>
            </div>
        </Modal>
        </> 
        ))}</div>

        {!events &&<h3>No events details found</h3>}
        <ToastContainer />
        </div>
        </>
    )
}
export default ViewStudentOther;