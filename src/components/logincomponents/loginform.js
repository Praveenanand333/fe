import React, { useState,useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios library
import  '../CSS/loginform.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
axios.defaults.withCredentials = true; 
useEffect(() => {
  // Delete session if present
  const deleteSession = async () => {
    try {
      await axios.get('http://localhost:5000/delete-session', { withCredentials: true });
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  deleteSession();
}, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send username, password, and role to backend for authentication using Axios
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        role
      });

      if (response.status === 200) {
        if (role === 'student') {
          window.location.href = `/student`; // Redirect to student page
        } else if (role === 'teacher') {
          window.location.href = `/teacher`; // Redirect to teacher page
        } else if (role === 'hod') {
          window.location.href = `/hod`; // Redirect to HOD page
        }
      } else {
        alert('wrong username or password');
        window.location.href = '/'; // Redirect to login page if authentication is not successful
      }
    } catch (error) {
      alert("wrong username or password");
      console.error('Error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 border" style={{ minWidth: '300px', maxWidth: '400px' }}>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role:</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="hod">HOD</option>
            </select>
          </div>
          <div className="text-center">
            <Button type="button" variant="primary" onClick={handleSubmit}>Login</Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
