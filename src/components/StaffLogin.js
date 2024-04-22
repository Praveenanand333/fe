import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const StaffLogin = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [teacherid,setTeacherid] = useState("")

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleForgot = async() => {
        const  role = "staff";
        if(email == ""){
            toast.warn("Please enter your email",{
                autoClose:2500,
                position:'top-center'
            });
            return
        }
        const body = {email,role};
        toast.info("Check your Mail",{
            autoClose:2500,
            position:'top-center'
        });
        const response = await fetch(`http://localhost:5000/forgotpassword`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        })
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const body = {email,password,teacherid};
            const response = await fetch(`http://localhost:5000/loginstaff`,{
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json()
            console.log(data)
            if(data.success){
                navigate('../staff/attendance')
            }
            else{
                toast.error("Invalid credentials",{
                    autoClose:2500,
                    position:'top-center'
                });
                return;
            }
            localStorage.setItem('email',email);
            localStorage.setItem('token',data.token);
            localStorage.setItem('role','staff');
            localStorage.setItem('teacherid',teacherid)
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <div id='staff-login'>
    <div className='main-body1'>
    {/* <div class="https://images.shiksha.com/mediadata/images/1511170235phpiYzFC7.jpeg"></div> */}
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <label htmlFor='email'>Email Id</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className='login'>
                    <label htmlFor='teacherid'>Teacher Id</label>
                    <input 
                        type='text'
                        name='teacherid'
                        id='teacherid'
                        placeholder='Enter teacher Id'
                        value={teacherid}
                        onChange={(e) => setTeacherid(e.target.value)}
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
                        onChange={handlePassword}
                    />
                </div>
                <div className='login'><p style={{cursor:"pointer"}} onClick={handleForgot}>Forgot password</p>
                    <button className='submit-button'>Submit</button>
                </div>
            </form>
            <div className='login'>
                <button className='back-button' onClick={() => navigate('../')}>Back</button>
                    
            </div>
        </div>
        <ToastContainer/>
    </div>
    </div>
  )
}

export default StaffLogin