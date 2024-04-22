import React, { forwardRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Services = forwardRef((props, ref) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/');
    },[navigate]);

    const toggleClick = (path) => {
        navigate(path);
    }

    return (
        <div ref={ref} className='services-container'>
            <div className='services-item-list'>
                <div className='services-item' onClick={() => toggleClick('student-login')}>
                    <div className='services-icon'>
                        <PiStudent />
                        <p style={{fontSize:"24.5px",margin:"0"}}>Student</p>
                    </div>      
                </div>
                <div className='services-item' onClick={() => toggleClick('staff-login')}>
                    <div className='services-icon'>
                        <LiaChalkboardTeacherSolid />
                        <p style={{fontSize:"24.5px",margin:"0"}}>Staff</p>
                    </div> 
                </div>
                <div className='services-item' onClick={() => toggleClick('admin-login')}>
                    <div className='services-icon'>
                        <MdOutlineAdminPanelSettings />
                        <p style={{fontSize:"24.5px",margin:"0"}}>Admin</p>
                    </div> 
                </div>
            </div>
        </div>
    )
})

export default Services