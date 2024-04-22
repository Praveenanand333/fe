import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate()
  const [role,Setrole] = useState("")

  const toggleClick = (path) => {
    navigate(path)
  }

  const handleClick = () => {
    localStorage.removeItem('rollnumber');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('admin')
    localStorage.removeItem('teacherid')
    localStorage.removeItem('adminemail')
    localStorage.removeItem('email')
    navigate('/')
  }

  useEffect(() => {
    Setrole(localStorage.getItem('role'))
  })

  return (
    <div className='nav-container'>
        <h1>DIST</h1>
        <ul>
            {role != 'admin' ? 
              <>
                <li onClick={() => toggleClick(`../${role}/attendance`)}>ATTENDANCE</li> 
              </> :
              <>
                <li>STUDENT</li>
                <li onClick={() => toggleClick(`../${role}/attendance`)}>ATTENDANCE</li> 
              </>}
            
            <li onClick={() => toggleClick(`../${role}/analytics`)}>ANALYTICS</li> 
            <li class="dropdown">
                VIEW
                <i class="fa fa-caret-down"></i> 
                <div class="dropdown-content">
                    <a onClick={() => toggleClick(`../${role}/view/personaldata`)}>Personal</a>
                    <a onClick={() => toggleClick(`../${role}/view/academicdata`)}>Academic</a>
                    <a onClick={() => toggleClick(`../${role}/view/otherdata`)}>Other</a>
                    <a onClick={() => toggleClick(`../${role}/view/pdf`)}>PDF</a>
                </div>
            </li> 
            {role!='staff' && role!='admin' && <li class="dropdown">
                EDIT
                <i class="fa fa-caret-down"></i> 
                <div class="dropdown-content">
                <a onClick={() => toggleClick(`../${role}/edit/personaldata`)}>Personal</a>
                    <a onClick={() => toggleClick(`../${role}/edit/academicdata`)}>Academic</a>
                    <a onClick={() => toggleClick(`../${role}/edit/otherdata`)}>Other</a>
                </div>
            </li>}
             <li id="logout-button" onClick={handleClick}>LOGOUT</li>
        </ul>
    </div>
  )
}

export default Navbar