import React, { useEffect, useRef, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import { MdCheck } from "react-icons/md";
import Navbar from './Navbar';

const StaffDashboard = () => {

  const componentRef = useRef()
  const email = localStorage.getItem('email');
  const teacher_id = localStorage.getItem('teacherid');
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(null)
  const [roomdata, setRoomdata] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [numofhours, setNumofhours] = useState("");
  const [subjectcode,setSubjectcode] = useState("")
  const [textarea,setTextarea] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clickAbsentee,setClickAbsentee] = useState(false);
  const [absenteeData,setAbsenteeData] = useState([]);
  const [absentStudentData,setAbsentStudentData] = useState([])
  const [presentStudentData,setPresentStudentData] = useState([])
  const [clickView,setClickView] = useState(false)
  const [searchRoll,setSearchRoll] = useState("")
  const [searchdata,setSearchdata] = useState([])
  const [isMailclick,setIsMailclick] = useState(false)
  const [date, setDate] = useState("");
  const [searchCode, setSearchCode] = useState("")
  const [searchData, setSearchData] = useState([])

  
  const selectedStudentsData = roomdata.filter(obj => selectedStudents.includes(obj.rollnumber));
  const notSelectedStudentsData = roomdata.filter(obj => !selectedStudents.includes(obj.rollnumber));

  // const absentStudentData = roomdata.filter(obj => absentStudents.includes(obj.rollnumber));
  // const presentStudentData = roomdata.filter(obj => !absentStudents.includes(obj.rollnumber));

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('teacherid')
    navigate('../')
  }
  
  const handleView = async() => {
    const body = isClicked;
    const response = await fetch(`http://localhost:5000/attendance-view`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(body)
    });

    const data = await response.json();
    const class_taken = data.class_taken.class_taken;
    setIsClicked((prevObj) => {
      return {...prevObj,class_taken:class_taken}
    })
    console.log("View",isClicked)
    // console.log("DOC",roomdata[0].dates[0].doc)
    console.log("Room",roomdata[0].dates.length)
    setClickView(true)
  }

  const handleCreate = () => {
    navigate('../create-room')
  }

  const handleCheckboxChange = (rollnumber) => {
    if (rollnumber == 'selectAll') {
      setSelectAll(!selectAll)
      setSelectedStudents(selectAll ? [] : roomdata.map(obj => obj.rollnumber))
    }
    else {
      setSelectedStudents((prevSelectedStudents) => {
        if (prevSelectedStudents.includes(rollnumber)) {
          return prevSelectedStudents.filter((student) => student !== rollnumber);
        }
        else {
          return [...prevSelectedStudents, rollnumber];
        }

      })
    }
  }

  const handleAbsenteeChange = (e) => {
    const inputValue = e.target.value;
    setTextarea(inputValue);
    const splitValues = inputValue.split(',').map(value => value.trim());
    // console.log("sp",splitValues)
    setAbsenteeData(splitValues);
};


const handleAbsentSubmit = async(e) => {
  //Some error to be fixed
  e.preventDefault();  
  var absent = [];
  absenteeData.map(item => (
    absent.push(roomdata.filter(obj => item.includes(obj.rollnumber % 1000))[0])
  ))

  var absentroll = []
  for(var i=0;i<absent.length;i++){
    absentroll.push(absent[i].rollnumber)
  }

  // console.log("ab",absentroll)
  const absentStudents = roomdata.filter(obj => absentroll.includes(obj.rollnumber));
  const presentStudents = roomdata.filter(obj => !absentroll.includes(obj.rollnumber));

  setAbsentStudentData(absentStudents)
  setPresentStudentData(presentStudents)
  
  const getdate = date;
  const body = {presentStudentData,absentStudentData,numofhours,getdate}
  console.log(body)

  const response = await fetch(`http://localhost:5000/attendance1`,{
    method:"POST",
    headers: {
      "Content-type": "application/json"
    },
    body:JSON.stringify(body)
  });

  const data = await response.json();
  if(!data.success){
    alert("Error in entering absentees")
  }
  else{
    alert("Marked successfully")
  }
  setNumofhours("");
  setTextarea("");
  setAbsentStudentData([])
  setPresentStudentData([])
  setAbsenteeData([])
};

const handlePrint = () => {
  localStorage.setItem('roomdata',JSON.stringify(roomdata))
  navigate('print')
}

const handleTemp = (data) => {
 
  console.log(isMailclick)
  if(!isMailclick){
    handleMail(data)
  }
  setIsMailclick(!isMailclick)
}

  const getEmail = async(obj) => {
      // console.log("Mail",obj)
      const rollnumber = obj.rollnumber;
      const staff_email = obj.email;
      const student_name = obj.student_name;
      const subject_code = obj.subject_code;
      const subject_name = obj.subject_name;
      const dates = obj.dates;
      console.log("Date",dates[0].attendance_status)
      const res = await fetch(`http://localhost:5000/getstudentemail`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({rollnumber})
      })
      const data = await res.json()
      const student_email = data.email
      const data1 = []
      const mail = {
        from : staff_email,
        to: student_email,
        subject: 'Attendance',
        text:`
        ${subject_code} ${subject_name} <br/>
        Hi ${student_name}, Your attendance is ${calculateAttendance(obj)}%
        ${calculateAttendance(obj) < 75 ? "Shortage of attendance.. Try to attend all the classes. If any issue, contact respective staff" : ""}`
      }
      console.log(mail)
      data1.push(mail)

      const response = await fetch(`http://localhost:5000/sendmail`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify( data1)
      })

  }

  const handleMail = async (data) => {
    console.log(data)
    const data1 = []
    try{
      for(let i = 0; i < data.length; i++) {
        const email = getEmail(data[i]);
      } 
      alert("Email sent successfully")
  }
  catch(err){
      console.log(err)
      alert("Error in sending email")
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getdate = date;
    const body = { selectedStudentsData, notSelectedStudentsData, numofhours,getdate };
    console.log(body)
    console.log("Roomdata",roomdata)
    const response = await fetch(`http://localhost:5000/attendance`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if(!data.success){
      alert("Error in entering absentees")
    }
    else{
      alert("Marked successfully")
    }

    setNumofhours("")
    setSelectedStudents([]);
    setDate("")
  }

  const calculateAttendance = (obj) => {
    const attend = ((obj.class_attended / obj.class_taken)*100).toFixed(2);
    return attend;
  }

  const handleDate = (date) => {
    const date1 = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const localDate = date1.toLocaleDateString('en-GB',options); 
    return localDate;
  }

  useEffect(() => {
    const fetchResults = async() => {
      const body = {email,subjectcode};
      const response = await fetch(`http://localhost:5000/search/${searchRoll}`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(body)
      })
      const data = await response.json();
      setSearchdata(data);
      console.log("Search",data)
    }
    fetchResults()
  },[searchRoll])

  useEffect(() => {
    const fetchResults = async() => {
      const body = {email, searchCode}
      const response = await fetch(`http://localhost:5000/staff-search-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const temp = await response.json()
      setSearchData(temp)
    }
    fetchResults()
  },[searchCode])

  useEffect(() => {
    const getData = async () => {
      const body = { email };
      const response = await fetch(`http://localhost:5000/staff-get-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const temp = await response.json()
      setData(temp);
    }
    getData()
  }, [email])

  useEffect(() => {
    const handleRoom = async (value) => {
      value.email = email;
      const response = await fetch(`http://localhost:5000/get-staff-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(value)
      })
      const data = await response.json();
      console.log(data)
      setSubjectcode(data[0].subject_code);
      console.log(subjectcode)
      setRoomdata(data);
    }
    if (isClicked) {
      handleRoom(isClicked)
    }

  }, [isClicked])

  useEffect(() => {
    if (selectAll) {
      if (notSelectedStudentsData.length != 0) {
        setSelectAll(false);
      }
    }
    if (notSelectedStudentsData == 0) {
      setSelectAll(true)
    }
  })

 
  return (
    <div className='main-body'>
      <Navbar />
      {!isClicked ?
        <>
          <div style={{margin:"35px",fontSize:"35px",fontWeight:"bold"}}>Welcome {teacher_id}</div>
          <div className='staff-dashboard'>
            <div className='staff-header'>
              <h1>Attendance List</h1>
              <input 
                type='text'
                style={{height: "40px",width:"20%",borderRadius:"6px",backgroundColor:"rgb(224,231,226)", color:"rgb(86,94,86)", fontSize:"20px",boxShadow:"rgba(248,248,248,0.282) 0px 5px 15px", outline:"0",padding:"20px"}}
                placeholder='Search by ID'
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                />
              <CiCirclePlus className='plus-icon' onClick={handleCreate} />
            </div>
            <div style={{ borderTop: "1px solid white" }}></div>
            {data.length > 0 ?
              <>
                {searchCode.length == 0 ? 
                <>
                  {data.map((item, index) => (
                    <div className='list-room' key={index} onClick={() => setIsClicked(item)}>
                      <div className='rooms'>
                        <div className='room-header'>
                          <div>{item.subject_code}</div>
                          <div>{item.subject_name}</div>
                        </div>
                        <div className='room-header'>
                          <div>Sem: {item.sem}</div>
                          <div>Credits: {item.credits}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </> : 
                <>
                  {searchData.length > 0 ? 
                  <>
                    {searchData.map((item, index) => (
                      <div className='list-room' key={index} onClick={() => setIsClicked(item)}>
                        <div className='rooms'>
                          <div className='room-header'>
                            <div>{item.subject_code}</div>
                            <div>{item.subject_name}</div>
                          </div>
                          <div className='room-header'>
                            <div>Sem: {item.sem}</div>
                            <div>Credits: {item.credits}</div>
                          </div>
                        </div>
                      </div>
                    ))} 
                  </> : 
                  <>
                    <div style={{ fontSize: "25px", padding: "30px" }}>
                      No room found
                    </div>
                  </>}
                </>}
              </> :
              <div style={{ fontSize: "25px", padding: "30px" }}>
                No room found
              </div>
            }
          </div>
        </> :
        <>
        {!clickAbsentee ? 
        <>
          {!clickView ? <>
            <div className='attendance-header'>
            <h1>Attendance </h1>
            <button 
              className='submit-button'
              onClick={handleView}
              >
              View
            </button>
          </div>
          <form className='attendance-section' onSubmit={handleSubmit}>
            <div className='login' style={{rowGap:"7px"}}>
              <div className='l1'>
                <label htmlFor='numofhours'>Number of hours</label>
              </div>
              <div className='l2'>
                <input
                  style={{width:"30%"}}
                  type='text'
                  name='numofhours'
                  id='numofhours'
                  placeholder='Enter number of hours'
                  value={numofhours}
                  onChange={(e) => setNumofhours(e.target.value)}
                /></div>
                <div className='l1'>
                <label htmlFor='date'>Date</label>
              </div>
              <div className='l2'>
                <input
                  style={{width:"30%"}}
                  type='date'
                  name='date'
                  id='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                /></div>
              
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <input 
              style={{width:"20%"}}
              type='text'
              placeholder="Search"
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
            />
            </div>
            <table className='attendance-list'>
              <thead>
                <tr>
                  <th>
                    <MdCheck />
                    <input
                      type='checkbox'
                      onChange={() => handleCheckboxChange('selectAll')}
                      checked={selectAll}
                    />

                  </th>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                </tr>

              </thead>
              
                {searchRoll.length == 0 ?
                 <>
                  <tbody>
                    {roomdata.map((obj) => (
                    <tr key={obj.rollnumber}>
                      <td>
                        <label>
                          <input
                            type='checkbox'
                            onChange={() => handleCheckboxChange(obj.rollnumber)}
                            checked={selectedStudents.includes(obj.rollnumber)}
                            style={{ transform: "scale(1.5)" }}
                          />
                        </label>
                      </td>
                      <td>{obj.rollnumber}</td>
                      <td>{obj.student_name}</td>
                    </tr>
                  ))}
                </tbody>
                </> : 
                <>
                  <tbody>
                    {searchdata.map((obj) => (
                      <tr key={obj.rollnumber}>
                        <td>
                        <label>
                          <input
                            type='checkbox'
                            onChange={() => handleCheckboxChange(obj.rollnumber)}
                            checked={selectedStudents.includes(obj.rollnumber)}
                            style={{ transform: "scale(1.5)" }}
                          />
                        </label>
                        </td>
                        <td>{obj.rollnumber}</td>
                        <td>{obj.student_name}</td>
                      </tr>
                      ))}
                  </tbody> 
                </>}
                
            </table>

            <div className='form-footer'>
              <button className='submit-button' onClick={() => setClickAbsentee(true)}>Absentee</button>
              <div className='footer'>
                <button className='submit-button' onClick={() => setIsClicked(null)}   >
                  Back
                </button>
                <button className='submit-button'>
                  Submit
                </button>
              </div>
            </div>
          </form>
          </> : 
          <>
            <div className='attendance-view-header'>
              <h1>View Attendance</h1>
              <button className='submit-button' onClick={() => setClickView(false)}>Back</button>      
            </div>  
            <div className='room-data-container'>
                  <div className='room-data'>
                    <div style={{width:"30%"}}>Subject code: </div>
                    <div>{isClicked.subject_code}</div>
                  </div>
                  <div className='room-data'>
                    <div style={{width:"30%"}}>Sem: </div>
                    <div>{isClicked.sem}</div>
                  </div>
                  <div className='room-data'>
                    <div style={{width:"30%"}}>Credits: </div>
                    <div>{isClicked.credits}</div>
                  </div>
                  <div>
                    <div className='room-data'>
                      <div style={{width:"30%"}}>Class taken: </div>
                      <div>{isClicked.class_taken}</div>
                    </div>
                    <div style={{paddingTop:"20px",paddingLeft:"25px"}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <input 
                        
                          style={{height:"40px",width:"30%",borderRadius:"6px",backgroundColor:"rgb(224,231,226)",color:"rgb(86,94,86)",fontSize:"20px",boxShadow:"rgba(248,248,248,0.282) 0px 5px 15px",outline:"0"}}
                          type='text'
                          placeholder="Search"
                          value={searchRoll}
                          onChange={(e) => setSearchRoll(e.target.value)}
                        />
                        <button className='submit-button' onClick={() => handleTemp(roomdata)}>Send Mail</button>
                      </div>
                    </div>
                    
                  </div>
                  <div className='tables'>
                  <table className='attendance-list'>
                    <thead>
                      <tr>
                        <th>Roll Number</th>
                        <th>Student Name</th>
                        <th>Class attended</th>
                        {roomdata.length > 0 &&
                            <>
                              {roomdata[0].dates.length != 0 ?  
                                <>
                                  {roomdata[0].dates.map((date) => (
                                    <th>{handleDate(date.doc)} <br/> <div style={{padding:"5px"}}>{"("+date.num_of_hours + " hrs)"} </div></th>
                                  ))}
                                </> : 
                                <>
                                </>}
                            </> 
                            }
                        
                        {/* <th>{(roomdata[0].dates[0].doc).split('T')[0]}</th> */}
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    {searchRoll.length==0 ? 
                    <>
                      <tbody>
                      {roomdata.map((obj) => (
                        <tr key={obj.rollnumber}>
                          <td>{obj.rollnumber}</td>
                          <td>{obj.student_name}</td>
                          <td>{obj.class_attended}</td>
                          {obj.dates.length != 0 ? 
                          <>
                            {obj.dates.map((date) => (
                              <td style={{color: date.attendance_status == 'P' ? "black" : "red",fontWeight: date.attendance_status == 'P' ? "normal" : "bold"  }}>{date.attendance_status}</td>
                            ))}
                          </>:
                          <></>}
                          
                          <td>{calculateAttendance(obj)}</td>
                        </tr>
                      ))}
                    </tbody>  
                    </>:
                    <>
                      <tbody>
                        {searchdata.map((obj) => (
                          <tr key={obj.rollnumber}>
                            <td>{obj.rollnumber}</td>
                            <td>{obj.student_name}</td>
                            <td>{obj.class_attended}</td>
                            {obj.dates.length != 0 ? 
                            <>
                              {obj.dates.map((date) => (
                                <td style={{color: date.attendance_status == 'P' ? "black" : "red",fontWeight: date.attendance_status == 'P' ? "normal" : "bold"  }}>{date.attendance_status}</td>
                              ))}
                            </>:
                            <></>}
                            
                            <td>{calculateAttendance(obj)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </>}
                    
                </table>
                
                </div>
                <button className='submit-button' style={{width:"20%"}} onClick={handlePrint}>Print Attendance</button>
            </div>
                
          </>
          }
          </>
           : 
          <>
            <h1 style={{padding:"20px",textAlign:"center",fontSize:"45px"}}>Create Room</h1>
            <form className='attendance-section' onSubmit={handleAbsentSubmit}>
              <div className='atten-login-cont'>
                <div className='login'>
                  <div className='l1'>
                    <label htmlFor='numofhours'>Number of hours</label>
                  </div>
                  <div className='l2'>
                    <input 
                      style={{width:"50%"}}
                      type='text'
                      name='numofhours'
                      id='numofhours'
                      placeholder='Enter number of hours'
                      value={numofhours}
                      onChange={(e) => setNumofhours(e.target.value)}
                    />
                  </div>
                  <div className='l1'>
                    <label htmlFor='date'>Date</label>
                  </div>
                  <div className='l2'>
                    <input 
                      type='date'
                      name='date'
                      id='date'
                      placeholder='Enter Date'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className='text-area'>
                  <div>
                    <label htmlFor='absentees'>Enter absentees(last 3 digits) separated by comma</label>
                  </div>
                  <div >
                  <textarea 
                  rows="4" 
                  cols="50" 
                  placeholder="Enter your text here"
                  value={textarea}
                  onChange={handleAbsenteeChange}
                  ></textarea>
                  </div>
                </div>
              </div>
              <div className='form-footer'>
                  <div className='footer'>
                    <button className='submit-button' onClick={() => setClickAbsentee(false)}>
                      Back
                    </button>
                    <button className='submit-button'>
                      Submit
                    </button>
                  </div>
              </div>
            </form>
          </>
          }
        </>
      }

    </div>
  )
}

export default StaffDashboard


