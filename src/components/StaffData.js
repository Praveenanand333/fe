import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const StaffData = () => {

  const navigate = useNavigate()
  const adminemail = localStorage.getItem('adminEmail')
  const [stafflist,setStafflist] = useState([])
  const [isStaffClicked,setIsStaffClicked] = useState(false)
  const [data,setData] = useState([])
  const [roomdata,setRoomdata] = useState([])
  const [isClicked,setIsClicked] = useState(null)
  const [searchStaff,setSearchStaff] = useState("")
  const [searchStafflist,setSearchStafflist] = useState([])


  const handleDate = (date) => {
    const date1 = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const localDate = date1.toLocaleDateString('en-GB',options); 
    return localDate;
  }

  const calculateAttendance = (obj) => {
    const attend = ((obj.class_attended / obj.class_taken)*100).toFixed(2);
    return attend;
  }

  const getData = async (email) => {
    setIsStaffClicked(true) 
    const body = {email}
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


  useEffect(() => {
    const fetchStaffData = async() => {
      const response = await fetch(`http://localhost:5000/get-stafflist`,{
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const temp = await response.json()
      setStafflist(temp)
    }
    fetchStaffData() 
  },[])

  useEffect(() => {
    const handleSearchStaff = async() => {
      const teacher_name = searchStaff;
      const response = await fetch(`http://localhost:5000/search-stafflist`,{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({teacher_name})
      })
      const temp = await response.json()
      setSearchStafflist(temp)
    }
    handleSearchStaff()
  },[searchStaff])

  useEffect(() => {
    const handleRoom = async(value) => {
      const response = await fetch(`http://localhost:5000/get-staff-data`,{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(value)
      })
      const data = await response.json()
      setRoomdata(data)
      console.log(data)
      
    }
    if(isClicked){
      handleRoom(isClicked)
    }
  },[isClicked])

  return (
    <div className='main-body'>
      <div className='staff-dashboard'>
        <div className='staff-header'>
          {!isStaffClicked ? 
          <>
            <h1>Staff List</h1>
            <input 
              type='text'
              name="search-staff"
              id="search-staff"
              placeholder='Enter name'
              value={searchStaff}
              onChange={(e) => setSearchStaff(e.target.value)}
              
            />
            <CiCirclePlus className='plus-icon' onClick={() => navigate('../../staff-register')}/>
          </> : 
          <>
            {!isClicked ? 
            <>
              <h1>Subject List</h1>
              <button className='submit-button' onClick={() => setIsStaffClicked(false)}>Back</button>
            </> : 
            <>
              <h1>Enrolled Students</h1>
              <button className='submit-button' onClick={() => setIsClicked(null)}>Back</button>
            </>}
            
          </>}
        </div>
        <div style={{ borderTop: "1px solid white" }}></div>
        {stafflist.length > 0 ? 
        <>
          {!isStaffClicked ? 
          <>
          {searchStaff.length == 0 ? 
          <>
            {stafflist.map((item, index) =>(
            <div>
            <div className='list-card' onClick = {() => getData(item.email)}>
              <div style={{width:"100px"}}>{item.teacherid}</div>
              <div style={{ width: "100px"}} >{item.teacher_name}</div> 
              <div style={{width:"100px"}}>{item.email}</div>
            </div>
            <div style={{ borderTop: "1px solid white" }}></div>
            </div>
          ))}
          </> : 
          <>
            {searchStafflist.length > 0 ? 
            <>
              {searchStafflist.map((item, index) =>(
              <div>
              <div className='list-card' onClick = {() => getData(item.email)}>
                <div style={{width:"100px"}}>{item.teacherid}</div>
                <div style={{ width: "100px", cursor: "pointer"}} >{item.teacher_name}</div> 
                <div style={{width:"100px"}}>{item.email}</div>
              </div>
              <div style={{ borderTop: "1px solid white" }}></div>
              </div>
              ))}
            </> : 
            <>
              <div style={{ fontSize: "25px", padding: "30px" }}>
                No staff found
              </div>  
            </>} 
          </>}      
          </> : 
            <>
              {!isClicked ? 
                <>
                  {data.length > 0 ? 
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
                <div style={{ fontSize: "25px", padding: "30px" }}>
                  No room found
                </div> 
              </>}
                </> : 
                <>
                {roomdata.length > 0 && 
                <div>
                  <div style={{margin:"30px",display:"flex",columnGap:"50px"}}>
                    <div>Subject Code: </div>
                    <div>{roomdata[0].subject_code}</div>
                  </div>
                  <div style={{margin:"30px",display:"flex",columnGap:"50px"}}>
                    <div>Subject Name: </div>
                    <div>{roomdata[0].subject_name}</div>
                  </div>
                  <div style={{margin:"30px",display:"flex",columnGap:"50px"}}>
                    <div>Total number of classes taken: </div>
                    <div>{roomdata[0].class_taken}</div>
                  </div>
                </div>
                }
                  <div>
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
                            
                            <th>Percentage</th>
                          </tr>
                        </thead>
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
                              </> : 
                              <></>}
                              <td>{calculateAttendance(obj)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                </>}
              
            </>
          } 
        </> :
        <>
          <div style={{ fontSize: "25px", padding: "30px" }}>
            No staff found
          </div>
        </>}
        
      </div>
    </div>
  )
}

export default StaffData

