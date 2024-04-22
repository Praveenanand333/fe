import React, { useEffect, useRef } from 'react'
import Services from './Services';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  const toggle = (path) => {
    navigate(path);
  }

  async function tokenCheck() {
    const token = localStorage.getItem('token');
    const body = { token };

    const response = await fetch(`http://localhost:5000/tokencheck`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    const data = await response.json();
    console.log(data);
    if (data.success) {
      console.log(data.decoded);
      if (data.decoded.type == "student") {
        toggle('student/attendance');
      }
      if (data.decoded.type == "staff") {
        toggle('staff/attendance');
      }
      if(data.decoded.type == "admin"){
        toggle('admin/attendance');
      }
    }
  }

  //Authentication
 useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <div className='main-body'>
      <Header onClick={handleClick} />
      <Services ref={ref} />
    </div>
  )
}

export default Home