import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useHistory and useLocation hooks

function Navbarfun() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate(); // Get access to history object
    const location = useLocation(); // Get access to location object
    axios.defaults.withCredentials = true; 
    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/logout', {
                withCredentials: true // Ensure cookies are sent with the request
            });
            window.location.href = '/';
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = () => {
        setClicked((prevClicked) => !prevClicked);
    };

    const handleRedirect = (path) => {
        navigate(path); // Redirect to the specified path
    };

    // Determine the base path for the current user
    const basePath = location.pathname.startsWith('/teacher') ? '/teacher' : '/student';

    return (
        <div>
            <form>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand className="brand-container" href="#">
                            <span className="brand-text">Academic Analyzer</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleClick}>
                            <FontAwesomeIcon icon={clicked ? faTimes : faBars} style={{ color: '#ffffff' }} />
                        </Navbar.Toggle>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="View" id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/view/personaldata`)}>Personal Data</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/view/academicdata`)}>Academic Data</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/view/otherdata`)}>Other Data</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Edit" id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/edit/personaldata`)}>Personal Data</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/edit/academicdata`)}>Academic Data</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect(`${basePath}/edit/otherdata`)}>Other Data</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link onClick={() => handleRedirect(`${basePath}/analytics`)}>Analytics</Nav.Link>
                                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleRedirect(`/student`)}>Home</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect(`/changepassword`)}>Change Password</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </form>
        </div>
    );
}

export default Navbarfun;
