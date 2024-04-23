import { React, useState, useRef, useEffect } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import Chart from 'chart.js/auto';

function Visualization() {
    const userRef = useRef(null);
    const [basicacademic, setbasicacademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);
    const [gpa, setGpa] = useState(null);
    useEffect(() => {
       userRef.current=localStorage.getItem('rollnumber')
            axios.get(`http://localhost:5000/getgpa/${userRef.current}`)
            .then(response => {
                if (response.data) {
                    setGpa(response.data);
                     renderGpaChart(response.data);
                    console.log("gpa",response.data);
                } else {
                    setGpa(null);
                    alert('No GPA found');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [sem]);

    const handleInputChange = (event) => {
        const selectedSemester = event.target.value;
        setSem(selectedSemester);

        axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
            .then(response => {
                if (response.data) {
                    setbasicacademic(response.data);
                } else {
                    setbasicacademic(null);
                    alert('No academic found');
                }
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${selectedSemester}`)
            .then(response => {
                if (response.data) {
                    console.log("marks=",response.data);
                    setMarks(response.data);
                    renderChart(response.data);
                } else {
                    setMarks(null);
                    alert('No marks found');
                }
            })
            .catch(err => {
                console.log(err);
            });
           
    };

    const renderChart = (marksData) => {
        const ctx = document.getElementById('marksChart');
        const subjectIDs = marksData.map(mark => mark.SubjectID);
        const marksObtained = marksData.map(mark => mark.MarksObtained);
        if (Chart.instances && typeof Chart.instances === 'object') {
            Object.keys(Chart.instances).forEach(key => {
                const instance = Chart.instances[key];
                instance.destroy();
            });
        }


        new Chart(ctx, {
            type: 'line',
            data: {
                labels: subjectIDs,
                datasets: [{
                    label: 'Marks Obtained',
                    data: marksObtained,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'x', 
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    };
    const renderGpaChart = (gpaData) => {
        
        const ctx1 = document.getElementById('gpaChart');
        const semesters = gpaData.map(gpa => gpa.semester);
        const gpas = gpaData.map(gpa => gpa.gpa);
        console.log("render",semesters);
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: semesters,
                datasets: [{
                    label: 'GPA',
                    data: gpas,
                    borderColor: 'rgba(100, 245, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'x', 
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        min: 6, // Set minimum value
                    max: 10, // Set maximum value
                    ticks: {
                        stepSize: 0.5 // Set step size
                    }
                    }
                }
            }
        });
    };

    return (
        <>
            <Navbar />
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
                <p>Semester: {sem}</p>
            </div>
            <div style={{  height: '300px' }}>
                <canvas id="marksChart"></canvas>
            </div>
            <div style={{  height: '300px' }}>
                <canvas id="gpaChart"></canvas>
            </div>
        </>
    )
}

export default Visualization;
