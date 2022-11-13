import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
            <nav className="main-header">
                <NavLink to="/postInput" exact="true"><b>Create Your Resume</b></NavLink>
                <NavLink to="/allResumes" exact="true"><b>All Resumes</b></NavLink>
            </nav>
    );
};

export default Navbar;