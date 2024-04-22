import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import styles from '../../CSS/edit_otherdata.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal'
import CustomCard from '../../cards/CustomCard';

Modal.setAppElement('#root');

function EditStudentOther() {
    const [internships, setInternships] = useState(null);
    const [scholarships, setScholarships] = useState(null);
    const [projects, setProjects] = useState(null);
    const [sports, setSports] = useState(null);
    const [exams, setExams] = useState(null);
    const [papers, setPapers] = useState(null);
    const [events, setEvents] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [addScholarship,setaddScholarship] = useState(false);
    const [addinternship,setaddinternship] = useState(false);
    const [addproject,setaddproject] = useState(false);
    const [addsport,setaddsport] = useState(false);
    const [addexam,setaddexam] = useState(false);
    const [addpaper,setaddpaper] = useState(false);
    const [addevent,setaddevent] = useState(false);

    const [interFillModal, setInternFillModal] = useState(false);
    const [scholarshipFillModal, setScholarshipFillModal] = useState(false);
    const [projectFillModal, setProjectFillModal] = useState(false);
    const [sportsFillModal, setSportsFillModal] = useState(false);
    const [examsFillModal, setExamsFillModal] = useState(false);
    const [papersFillModal, setPapersFillModal] = useState(false);
    const [eventsFillModal, setEventsFillModal] = useState(false);

    const [interViewModal, setInternViewModal] = useState(false);
    const [scholarshipViewModal, setScholarshipViewModal] = useState(false);
    const [projectViewModal, setProjectViewModal] = useState(false);
    const [sportsViewModal, setSportsViewModal] = useState(false);
    const [examsViewModal, setExamsViewModal] = useState(false);
    const [papersViewModal, setPapersViewModal] = useState(false);
    const [eventsViewModal, setEventsViewModal] = useState(false);

    const userRef = useRef(null);

    const [scholarshipdata, setScholarshipdata]=useState({
        ScholarshipProvider:'',
        amount:''
    });
 const [internshipdata, setinternshipdata] = useState({
        employer_name: '',
        on_off_campus: '',
        ctc: '',
        InternshipDuration: '',
        InternshipStartDate: '',
        InternshipEndDate: '',
        product_service_based: ''
    });
    const [projectdata, setprojectdata] = useState({
        title: '',
        guide:'',
        project_desc:''
    });
    const [sportdata, setsportdata] = useState({
        event_name: '',
        award:''
    });
    const  [paperdata, setpaperdata] = useState({
        title: '',
        journal:'',
        date_year: '',
        DOI_link: ''
    });

    const [eventdata, setEventdata] = useState({
        event_name: '',
        institution:'',
        date:'',
        role: '',
        awards:''
    });

    useEffect(() => {
        
                userRef.current = localStorage.getItem('rollnumber')
                console.log('from other data edit', userRef.current);
                axios.get(`http://localhost:5000/InternshipDetails/${userRef.current}`)
                    .then(response => {
                        setInternships(response.data);
                        console.log('inernship data',internships);
                    })
                    .catch(error => {
                        console.error('Error fetching Internship details:', error);
                    });
                axios.get(`http://localhost:5000/ScholarshipDetails/${userRef.current}`)
                    .then(response => {
                        setScholarships(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching Scholarship details:', error);
                    });
                    axios.get(`http://localhost:5000/ProjectDetails/${userRef.current}`)
                    .then(response => {
                        setProjects(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching Scholarship details:', error);
                    });
                    axios.get(`http://localhost:5000/SportsDetails/${userRef.current}`)
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
                    axios.get(`http://localhost:5000/ExamDetails/${userRef.current}`)
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

                    axios.get(`http://localhost:5000/PaperDetails/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            setPapers(response.data);
                            console.log("HUCHCHHCC");
                            console.log(papers)
                            
                        } else {
                            setErrorMessage('No paper details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Paper details:', error);
                    });

                    axios.get(`http://localhost:5000/EventDetails/${userRef.current}`)
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

    const handleDeleteInternship = (id) => {
        const apiUrl = `http://localhost:5000/deleteInternship/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                //console.log("Internship record with id", id, "deleted successfully.");
                toast.success("Internship record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Internship record:", error);
            });
    
    };

    const handleDeleteScholarship = (id) => {
        const apiUrl = `http://localhost:5000/deleteScholarship/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                //console.log("Scholarship record with id", id, "deleted successfully.");
                toast.success("Scholarship record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting scholarship record:", error);
            });
    };
    const handleDeleteProject = (id) => {
        const apiUrl = `http://localhost:5000/deleteProject/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Project record with id", id, "deleted successfully.");
                toast.success("Project record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Project record:", error);
            });
    };
    const handleDeleteSports = (id) => {
        const apiUrl = `http://localhost:5000/deleteSports/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Sports record with id", id, "deleted successfully.");
                toast.success("Sports record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Sports record:", error);
            });
    };
    const handleDeletePapers = (id) => {
        const apiUrl = `http://localhost:5000/deletePapers/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Papers record with id", id, "deleted successfully.");
                toast.success("Papers record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Papers record:", error);
            });
    };
    const handleDeleteEvents = (id) => {
        const apiUrl = `http://localhost:5000/deleteEvents/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Events record with id", id, "deleted successfully.");
                toast.success("Events record with id", id, "deleted successfully.",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Events record:", error);
            });
    };
    const handleInputChangescholarship = (event) => {
        const { name, value } = event.target;
        setScholarshipdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
       const handleInputChangeproject = (event) => {
        const { name, value } = event.target;
        setprojectdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleInputChangesport = (event) => {
        const { name, value } = event.target;
        setsportdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleInputChangepaper = (event) => {
        const { name, value } = event.target;
        setpaperdata(prevData => ({
          ...prevData,
            [name]: value
        }));
    }
    const handleInputChangeEvent = (event) => {
        const { name, value } = event.target;
        setEventdata(prevData => ({
          ...prevData,
            [name]: value
        }));
    };
    const handleInputChangeInternship = (event) => {
        const { name, value } = event.target;
        setinternshipdata(prevData => ({
        ...prevData,
            [name]: value
        }));
    };

    const handleAddInternship = async() => {
        if(Object.values(internshipdata).every(value => value.trim() !== '')){
            try {
                const apiUrl = `http://localhost:5000/addInternship/${userRef.current}`; // Replace with your API endpoint
                const response = await axios.post(apiUrl, internshipdata);
               //alert('Internship data added successfully');
                toast.success("Internship data added successfully",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                console.log('Response from API:', response.data);
                window.location.reload();
            } catch (error) {
                console.error('Error adding Internship data:', error.response.data);
                toast.error("Failed to add Internship data",{
                    autoClose:2500,
                    position:'top-center'
                });
            }
        }
        else{
            console.log(internshipdata);
            toast.warn("Enter all details",{
                position: 'top-center',
                autoClose: 2500

            })
        }
    };

    const handleAddScholarship = async () => {
        if(Object.values(scholarshipdata).every(value => value.trim() !== '')){
            try {
                const apiUrl = `http://localhost:5000/addScholarship/${userRef.current}`; // Replace with your API endpoint
                const response = await axios.post(apiUrl, scholarshipdata);
                //alert('Scholarship data added successfully');
                toast.success("Scholarship data added successfully",{
                    position: 'top-center',
                    autoClose: 2500
    
                })
                console.log('Response from API:', response.data);
                window.location.reload();
            } catch (error) {
                console.error('Error adding scholarship data:', error.response.data);
                toast.error('Failed to add scholarship data',{
                    autoClose:2500,
                    position:'top-center'
                });
            }
        }
        else{
            toast.warn('Enter all details' ,{
                position: 'top-center',
                autoClose: 2500
            })
        }
        
    };
  
const handleAddProject = async() => {
    if(Object.values(projectdata).every(value => value.trim() !== '')){
        try {
            const apiUrl = `http://localhost:5000/addProject/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, projectdata);
            //alert('Project data added successfully');
            toast.success("Project data added successfully",{
                position: 'top-center',
                autoClose: 2500

            })
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Project data:', error.response.data);
            toast.error('Failed to add Project data',{
                autoClose:2500,
                position:'top-center'
            });
        }
    }
    else{
        toast.warn('Enter all details' ,{
            position: 'top-center',
            autoClose: 2500
        })
    }
};

const handleAddSports = async() => {
    if(Object.values(sportdata).every(value => value.trim() !== '')){
        try {
            const apiUrl = `http://localhost:5000/addSport/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, sportdata);
            //alert('Sports data added successfully');
            toast.success("Sports data added successfully",{
                position: 'top-center',
                autoClose: 2500

            })
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Sports data:', error.response.data);
            toast.error('Failed to add Sports data',{
                autoClose:2500,
                position:'top-center'
            });
        }
    }
    else{
        toast.warn('Enter all details' ,{
            position: 'top-center',
            autoClose: 2500
        })
    }
};

const handleAddPapers = async() => {
    if(Object.values(paperdata).every(value => value.trim() !== '')){
        try {
            const apiUrl = `http://localhost:5000/addPaper/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, paperdata);
            //alert('Papers data added successfully');
            toast.success("Papers data added successfully",{
                position: 'top-center',
                autoClose: 2500

            })
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Papers data:', error.response.data);
            toast.error('Failed to add Papers data',{
                autoClose:2500,
                position:'top-center'
            });
        }
    }
    else{
        toast.warn('Enter all details' ,{
            position: 'top-center',
            autoClose: 2500
        })
    }
};

const handleAddEvents = async() => {
    if(Object.values(eventdata).every(value => value.trim() !== '')){
        try {
            const apiUrl = `http://localhost:5000/addEvent/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, eventdata);
            //alert('Events data added successfully');
            toast.success("Events data added successfully",{
                position: 'top-center',
                autoClose: 2500

            })
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Events data:', error.response.data);
            toast.error('Failed to add Events data',{
                autoClose:2500,
                position:'top-center'
            });
        }
    }
    else{
        toast.warn('Enter all details' ,{
            position: 'top-center',
            autoClose: 2500
        })
    }
};


    return (
        <>
        <div id='student-edit-other'>

            <Navbar />

        {/* <div className="custom-card-container">
        <CustomCard
          type='internship'
          title="Intership At Amazon"
          description="This is the description for Card 1."
          imageUrl="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg"
        />
        <CustomCard
          type='internship'
          title="Intership At Amazon"
          description="This is the description for Card 2."
          imageUrl="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg"
        />
        <CustomCard
            title="Intership At Amazon"
            description="This is the description for Card 2."
            imageUrl="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg"
            onClick={()=>setInternFillModal(true)}
        />
      </div> */}

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
                    <button className="delete-btn"  onClick={() => handleDeleteInternship(internship.id)}>Delete</button>
                    <button onClick={() => setInternViewModal(false)}>Close</button>
                </div>
            </Modal>
            </>   
))}         </div>
            <button className="add-btn" onClick={() => setInternFillModal(true)}>Add Internship</button>

            <Modal isOpen={interFillModal} onRequestClose={() => setInternFillModal(false)} contentLabel="Example Modal" className={'modal-content'} >
                <div id='intern-modal'>
                    <h1>Add Internship Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>
                        <tr>
                            <td id='topic-td'>Employer Name :
                            </td>
                            <td id='input-td'><input type="text" name='employer_name' value={internshipdata.employer_name} onChange={handleInputChangeInternship} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Mode :
                            </td>
                            <td id='input-td'><select className='edit-dropdown' name="on_off_campus" value={internshipdata.on_off_campus} onChange={handleInputChangeInternship} required>
                                                <option value="" disabled selected>On/Off Campus</option>
                                                    <option value="On Campus">On Campus</option>
                                                    <option value="Off Campus">Off Campus</option>
                                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>CTC :
                            </td>
                            <td id='input-td'><input type="number" name='ctc' value={internshipdata.ctc} onChange={handleInputChangeInternship}></input>
                        
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Duration :
                            </td>
                            <td id='input-td'><input type="text" name='InternshipDuration' value={internshipdata.InternshipDuration} onChange={handleInputChangeInternship} required></input>
                        
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Start Date :
                            </td>
                            <td id='input-td'><input type="date" name='InternshipStartDate' value={internshipdata.InternshipStartDate} onChange={handleInputChangeInternship} required></input>
                        
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>End Date :
                            </td>
                            <td id='input-td'><input type="date" name='InternshipEndDate' value={internshipdata.InternshipEndDate} onChange={handleInputChangeInternship} required></input>
                        
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Product/Service Based :
                            </td>
                            
                            <td id='input-td'><select className='edit-dropdown' name="product_service_based" value={internshipdata.product_service_based} onChange={handleInputChangeInternship} required>
                                                <option value="" disabled selected></option>
                                                    <option value="Product Based">Product Based</option>
                                                    <option value="Service Based">Service Based</option>
                                                </select>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddInternship}>Submit</button>
                    </div>
                    <button onClick={() => setInternFillModal(false)}>Close</button>
                </div>
            </Modal>
            <div className='custom-card-container'>
            {!scholarships&&<h3>No Scholarship details found</h3>}
            {scholarships && scholarships.map((Scholarship, index) => (
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
                <button className="delete-btn"  onClick={() => handleDeleteScholarship(Scholarship.id)}>Delete</button>
                <button onClick={() => setScholarshipViewModal(false)}>Close</button>
            </div>
        </Modal>
        </>  
))}     </div>
            <button className="add-btn" onClick={() => setScholarshipFillModal(true)}>Add Scholarship</button>
            <Modal isOpen={scholarshipFillModal} onRequestClose={() => setScholarshipFillModal(false)} className={'modal-content'} >
                <div id='scholarship-modal'>
                    <h1>Add Scholarship Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>
                        <tr>
                            <td id='topic-td'>Scholarship Provider :
                            </td>
                            <td id='input-td'><input type='text' name='ScholarshipProvider' value={scholarshipdata.ScholarshipProvider} onChange={handleInputChangescholarship} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Amount :
                            </td>
                            <td id='input-td'><input type='text' name='amount' value={scholarshipdata.amount} onChange={handleInputChangescholarship} required></input>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddScholarship}>Submit</button>
                    </div>
                    <button onClick={() => setScholarshipFillModal(false)}>Close</button>
                </div>
            </Modal>

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
                 <button className="delete-btn"  onClick={() => handleDeleteProject(Project.id)}>Delete</button>
                 <button onClick={() => setProjectViewModal(false)}>Close</button>
             </div>
         </Modal>
         </>  
            ))}</div>
            <button className='add-btn' onClick={()=> setProjectFillModal(true)}>Add Project</button>
            <Modal isOpen={projectFillModal} onRequestClose={() => setProjectFillModal(false)} className={'modal-content'} >
                <div id='project-modal'>
                    <h1>Add Project Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>
                        
                        <tr>
                            <td id='topic-td'>Title :
                            </td>
                            <td id='input-td'><input type="text" name='title' value={projectdata.title} onChange={handleInputChangeproject} required></input>
                            </td>
                        </tr>

                        <tr>
                            <td id='topic-td'>Guide :
                            </td>
                            <td id='input-td'><input type="text" name='guide' value={projectdata.guide} onChange={handleInputChangeproject} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Description :
                            </td>
                            <td id='input-td'><input type="text" name='project_desc' value={projectdata.project_desc} onChange={handleInputChangeproject} required></input>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddProject}>Submit</button>
                    </div>
                    <button onClick={() => setProjectFillModal(false)}>Close</button>
                </div>
            </Modal>

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
                <button className="delete-btn"  onClick={() => handleDeleteSports(sport.id)}>Delete</button>
                <button onClick={() => setSportsViewModal(false)}>Close</button>
            </div>
        </Modal>
        </>  
))}         </div>
            <button className="add-btn" onClick={()=>setSportsFillModal(true)}>Add Sports</button>
            <Modal isOpen={sportsFillModal} onRequestClose={() => setSportsFillModal(false)} className={'modal-content'} >
                <div id='sports-modal'>
                    <h1>Add Sports Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>
                        
                        <tr>
                            <td id='topic-td'>Event Name :
                            </td>
                            <td id='input-td'><input type="text" name='event_name' value={sportdata.event_name} onChange={handleInputChangesport} required></input>
                            </td>
                        </tr>

                        <tr>
                            <td id='topic-td'>Award :
                            </td>
                            <td id='input-td'><input type="text" name='award' value={sportdata.award} onChange={handleInputChangesport} required></input>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddSports}>Submit</button>
                    </div>
                    <button onClick={() => setSportsFillModal(false)}>Close</button>
                </div>
            </Modal>


            {/* {!exams&&<h3>No Exam details found</h3>} */}
            {exams && exams.map((exam, index) => (
            <div className='view-form'>
                <h2>Exams Attended</h2>
                <p className='view-field'><strong>GATE Score:</strong> {exam.GATE_score}</p>
                <p className='view-field'><strong>GRE Score:</strong> {exam.GRE_score}</p>
                <p className='view-field'><strong>TOEFL Score:</strong> {exam.TOEFL_score}</p>
                <p className='view-field'><strong>IELTS Score:</strong> {exam.IELTS_score}</p>
                <p className='view-field'><strong>UPSC Score:</strong> {exam.UPSC_score}</p>
                <p className='view-field'><strong>NET Score:</strong> {exam.NET_score}</p>
            </div>
))}



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
            <button className="delete-btn"  onClick={() => handleDeletePapers(paper.id)}>Delete</button>
            <button onClick={() => setPapersViewModal(false)}>Close</button>
        </div>
    </Modal>
    </>  
        ))}</div>
        <button className="add-btn" onClick={()=>setPapersFillModal(true)}>Add Papers</button>
            <Modal isOpen={papersFillModal} onRequestClose={() => setPapersFillModal(false)} className={'modal-content'} >
                <div id='papers-modal'>
                    <h1>Add Paper Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>
                        
                        <tr>
                            <td id='topic-td'>Title :
                            </td>
                            <td id='input-td'><input type="text" name='title' value={paperdata.title} onChange={handleInputChangepaper} required></input>
                            </td>
                        </tr>

                        <tr>
                            <td id='topic-td'>Journal :
                            </td>
                            <td id='input-td'><input type="text" name='journal' value={paperdata.journal} onChange={handleInputChangepaper} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Date Year :
                            </td>
                            <td id='input-td'><input type="date" name='date_year' value={paperdata.date_year} onChange={handleInputChangepaper} required></input>
                            </td>
                        </tr>

                        <tr>
                            <td id='topic-td'>DOI Link :
                            </td>
                            <td id='input-td'><input type="text" name='DOI_link' value={paperdata.DOI_link} onChange={handleInputChangepaper} required></input>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddPapers}>Submit</button>
                    </div>
                    <button onClick={() => setPapersFillModal(false)}>Close</button>
                </div>
            </Modal>
            
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
                <button className="delete-btn"  onClick={() => handleDeleteEvents(event.id)}>Delete</button>
                <button onClick={() => setEventsViewModal(false)}>Close</button>
            </div>
        </Modal>
        </> 
        ))}</div>
            <button className="add-btn" onClick={()=>setEventsFillModal(true)}>Add Events</button>
            <Modal isOpen={eventsFillModal} onRequestClose={() => setEventsFillModal(false)} className={'modal-content'}>
                <div id='events-modal'>
                    <h1>Add Event Details</h1>
                    <div id='modal-input-table'>
                        <table border={'0'}>

                        <tr>
                            <td id='topic-td'>Event Name :
                            </td>
                            <td id='input-td'><input type="text" name='event_name' value={eventdata.event_name} onChange={handleInputChangeEvent} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Institution :
                            </td>
                            <td id='input-td'><input type="text" name='institution' value={eventdata.institution} onChange={handleInputChangeEvent} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Date :
                            </td>
                            <td id='input-td'><input type="date" name='date' value={eventdata.date} onChange={handleInputChangeEvent} required></input>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Product/Service Based :
                            </td>
                            
                            <td id='input-td'><select className='edit-dropdown' name="role" value={eventdata.role} onChange={handleInputChangeEvent} required>
                                                <option value="" disabled selected></option>
                                                    <option value="Participate">Participate</option>
                                                    <option value="Conduct/Manage">Conduct/Manage</option>
                                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id='topic-td'>Awards:
                            </td>
                            <td id='input-td'><input type="text" name='awards' value={eventdata.awards} onChange={handleInputChangeEvent} required></input>
                            </td>
                        </tr>
                        </table>
                        
                        <button className="add-btn" onClick={handleAddEvents}>Submit</button>
                    </div>
                    <button onClick={() => setEventsFillModal(false)}>Close</button>
                </div>
            </Modal>

                {!events &&<h3>No events details found</h3>}
                <ToastContainer />
                </div>
        </>
    );
}

export default EditStudentOther;