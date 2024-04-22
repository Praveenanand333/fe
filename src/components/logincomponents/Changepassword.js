import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbarfun from '../usercomponents/Navbarfun';
import '../CSS/change_pass.css'
function Changepassword() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [loginDetails,setloginDetails]=useState(
        {
            oldPassword:'',
            newPassword:''
        }
    )
    axios.defaults.withCredentials = true; 
    useEffect(() => {
        const fetchUsername=async() => {
       try{
        const username=await axios.get('http://localhost:5000/session');
        setUsername(username.data.username);
       }
       catch(err){
         console.log(err);
       }
    }
    fetchUsername();
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setloginDetails(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleChangePassword = () => {
    
        axios.post(`http://localhost:5000/changePassword/${username}`, { loginDetails })
            .then(response => {
                navigate('/student');
            })
            .catch(error => {
                alert("Wrong credentials");
                console.error('Error changing password:', error);
            });
    };

    return (
        <>
        <Navbarfun/>
           <div className='change_pass_container'>
    <div className='change_pass_border'>
        
        <h1>Change Password</h1>
        <div className='change_pass_label'>
            oldPassword : <input type="text" name="oldPassword" value={loginDetails.oldPassword} onChange={handleChange}/>
        </div>
        <div className='change_pass_label'>
            newPassword : <input type="text" name="newPassword" value={loginDetails.newPassword} onChange={handleChange}/>
        </div>
        <button className="change_pass_button" onClick={handleChangePassword}>Change Password</button>
    </div>
</div>
        </>
    );
}

export default Changepassword;
