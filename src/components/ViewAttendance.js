import React from 'react'

export class ViewAttendance extends React.PureComponent {
  render(){
    const roomdata = JSON.parse(localStorage.getItem('roomdata'))

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
    return (
      <div>
        <h1 style={{padding:"20px",textAlign:"center",fontSize:"45px"}}>Attendance Result</h1>
        {roomdata.length > 0 &&
          <div>
            <div className='print-data-container'>
              <div className='print-data'>
                <div style={{width:"30%"}}>Subject code: </div>
                <div>{roomdata[0].subject_code}</div>
              </div>
              <div className='print-data'>
                <div style={{width:"30%"}}>Subject name: </div>
                <div>{roomdata[0].subject_name}</div>
              </div>
              <div className='print-data'>
                <div style={{width:"30%"}}>Class taken: </div>
                <div>{roomdata[0].class_taken}</div>
              </div>
            </div>
          <table className='attendance-list'>
          <thead>
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
                  </> : <></>
                }
                <td>{calculateAttendance(obj)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>  
        }       
      </div>
    )
}
}

export default ViewAttendance