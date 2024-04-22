import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const AdminLogin = () => {
    const [adminemail, setAdminemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const toggleClick = (path) => {
        navigate(path);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const body = {adminemail,password}
        const response = await fetch(`http://localhost:5000/loginadmin`,{
            method:"POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        if(data.success == true){
            console.log('Login Successful');
            toggleClick('../admin/attendance');
        }
        else{
            alert('Invalid credentials');
            return;
        }
        localStorage.setItem('adminemail',adminemail);
        localStorage.setItem('token',data.token);
        localStorage.setItem('role','admin');
    }

    return (
        <div className='main-body1'>
            <div className='login-container' id='admin-login-container'>
                <form className='form-cont' onSubmit={handleSubmit}>
                    <div className='login'>
                        <label htmlFor='adminemail'>Admin Id</label>
                        <input
                            type='text'
                            name='adminemail'
                            id='adminemail'
                            placeholder='Enter Admin Email'
                            value={adminemail}
                            onChange={(e) => setAdminemail(e.target.value)}
                        />
                    </div>
                    <div className='login'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='login'>
                        <button className='submit-button'>Submit</button>
                    </div>
                </form>
                <div className='login'>
                    <button className='back-button' onClick={() => navigate('../')}>Back</button>
                    <p>Forgot password? <Link to='/admin-login' style={{ color: 'darkseagreen', marginLeft: "5px", cursor: "pointer" }}>Reset here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
