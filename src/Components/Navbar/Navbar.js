import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
            <nav className="main-header">
                <NavLink to="/createPdfResume" exact="true"><b>create Pdf Resume</b></NavLink>
                <NavLink to="/postInput" exact="true"><b>Submit Data</b></NavLink>
                <NavLink to="/allResumes" exact="true"><b>All Resumes</b></NavLink>
                {/* maybe add: <NavLink to="/allResumes/:id" exact="true"><b>See Your Resume</b></NavLink> */}
            </nav>
    );
};

export default Navbar;