import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'

const CreateRoom = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [subject_code, setSubject_code] = useState("");
    const [sem,setSem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const sendData = async () => {
            if (extractedData) {
                try {
                    const response = await fetch(`http://localhost:5000/create-room`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(extractedData)
                    });
                    console.log(response);
                } catch (error) {
                    console.error("Error sending data:", error);
                }
            } else {
                console.log("No data to send");
            }
        }
        sendData();
    }, [extractedData])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setSelectedFile(file);
            console.log('Selected Excel file:', file);
        } else {
            console.log('Please select an Excel file.');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const tempData = XLSX.utils.sheet_to_json(sheet, {
                    header: 1,
                    raw: false,
                    range: 1
                })
                const email = localStorage.getItem('email')
                const extractedData = tempData.map(row => ({
                    rollnumber: row[0],
                    name: row[1],
                    subject_code: subject_code,
                    teacher_email: email,
                    sem_number: sem
                }))
                setExtractedData(extractedData)
                console.log(extractedData)
            }
            reader.readAsBinaryString(selectedFile);

        }

        else {
            setExtractedData(null)
            console.log('Please select an Excel file')
        }


        setExtractedData(null)
        setSubject_code("")
        setSelectedFile("")
        setSem("")
    }
    return (
        <div className='main-body1'>
            <div className='login-container'>
                <form className='form-cont' style={{ rowGap: "25px" }} onSubmit={handleSubmit}>
                    <div className='login'>
                        <div className='l1'><label htmlFor='subject-code'>Subject Code</label></div>
                        <div className='l2'>
                            <input
                                type='text'
                                name='subject-code'
                                id='subject-code'
                                placeholder='Enter Subject code'
                                value={subject_code}
                                onChange={(e) => setSubject_code(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='login'>
                        <div className='l1'><label htmlFor='sem'>Sem</label></div>
                        <div className='l2'>
                            <input
                                type='text'
                                name='sem'
                                id='sem'
                                placeholder='Enter Sem'
                                value={sem}
                                onChange={(e) => setSem(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='login'>
                        <div className='l1'><label htmlFor='file' style={{ color: "rgb(4,144,4)", fontSize:"20px" }}>Please enter student list in excel format</label></div>
                    </div>
                    <div className='login'>
                        <div className='l2' style={{ margin: "10px" }}>
                            <label className='custom-file-upload'>
                            <input type="file" id="file" accept=".xlsx, .xls" onChange={handleFileChange}  />
                            Choose File
                            </label>
                            
                        </div>
                    </div>
                    <div className='login'>
                        <button className='submit-button'>Submit</button>
                    </div>
                </form>
                <div className='login'>
            <button className='back-button' onClick={() => navigate("../")}>Back</button>
            </div>
            </div>
        </div>
    )
}

export default CreateRoom