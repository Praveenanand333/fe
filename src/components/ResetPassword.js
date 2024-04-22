import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {token,role} = useParams()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            if(newPassword != confirmPassword) {
                alert("The entered passwords do not match")
            }
            else{
                const body = {token,role,newPassword}
                
                const response = await fetch(`http://localhost:5000/passwordreset`,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(body)
                })
            
                const data = await response.json()
                if(data.message == "Success"){
                    alert("Password reset successfully")
                    if(role == 'staff'){
                        window.location.href = "/staff-login"
                    }
                    else if(role =='student'){
                        window.location.href = "/student-login"
                    }
                    
                }
                else{
                    alert("Error in resetting password. Check your entered credentials and try again")
                    return
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className='main-body1'>
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <label htmlFor='newpassword'>New Password</label>
                    <input 
                        type='text'
                        name='newpassword'
                        id='newpassword'
                        placeholder='Enter new password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className='login'>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input 
                        type='text'
                        name='confirmpassword'
                        id='confirmpassword'
                        placeholder='Repeat new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className='submit-button'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword