import React from 'react'
import Navbar from './Navbar'
import StaffData from './StaffData'

const AdminDashboard = () => {
  const adminemail = localStorage.getItem('adminemail')
  return (
    <div className='main-body'>
      <Navbar />
      <StaffData />
    </div>
  )
}

export default AdminDashboard