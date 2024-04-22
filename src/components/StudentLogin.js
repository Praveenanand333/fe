import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const StudentLogin = () => {

    const [email,setEmail] = useState("")
    const [rollnumber,setRollnumber] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleRollnumber = (event) => {
        setRollnumber(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const toggleClick = (path) => {
        navigate(path);
    }

    const handleForgot = async() => {
        const  role = "student";
        if(email == ""){
            toast.warning("Please enter your mail !",{
                autoClose:2500,
                position:'top-center'
            });
            return
        }
        const body = {email,role};
        toast.info("Check your mail",{
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
            const body = {email,rollnumber,password};
            console.log(body)
            const response = await fetch(`http://localhost:5000/loginstudent`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json()
            console.log(data);
            if(data.success == true){
                console.log('Login Successful');
                toggleClick('../student/attendance');
            }
            else{
                toast.error("Invalid Credentials",{
                    autoClose:2500,
                    position:'top-center'
                });
                return;
            }
            localStorage.setItem("rollnumber",rollnumber);
            localStorage.setItem("token",data.token);
            localStorage.setItem('role','student')
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <div className='main-body1'>
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='login'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Enter Roll number'
                        value={rollnumber}
                        onChange={handleRollnumber}
                    />
                </div>
                <div className='login'>
                    <div className='l1'><label htmlFor='password'>Password</label></div>
                    <div className='l2'><input 
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={handlePassword}
                    /></div>
                </div>
                <div className='login'><p style={{cursor:"pointer"}} onClick={handleForgot}>Forgot password</p>
                <button className='submit-button'>Submit</button>
                </div>
            </form>
            <div className='login'>
            <button className='back-button' onClick={() => navigate("../")}>Back</button>
            <p>Don't have an account? <Link to="/student-register" style={{color:'darkseagreen',marginLeft:"5px",cursor:"pointer"}}>Signup now</Link></p>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default StudentLogin