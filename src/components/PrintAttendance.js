import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import ViewAttendance from './ViewAttendance';

const PrintAttendance = () => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleBack = (path) => {
    localStorage.removeItem('roomdata');
    navigate(path);
  }

  return (
    <div>
      <ViewAttendance ref={componentRef} />
      <div style={{display:"flex", justifyContent:"center"}}>
      <button className="submit-button" style={{margin:"20px"}} onClick={handlePrint}>Print this out!</button>
      <button className='submit-button' style={{margin:"20px"}} onClick={() => handleBack('../')}>Back</button>
      </div>
    </div>
  );
};

export default PrintAttendance; 