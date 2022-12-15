import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import {  signOut } from "firebase/auth";
import { auth } from '../../firestoreConfig/firestoreConfig';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
                
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/logout");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });

    }

    return(
            <nav className="main-header">
                {/* <NavLink to="/createPdfResume" exact="true"><b>create Pdf Resume</b></NavLink> */}
                <NavLink to="/postInputs" exact="true"><b>Create Resume</b></NavLink>
                <NavLink to="/allResumes" exact="true"><b>My Resumes</b></NavLink>
                <NavLink to="/logout" exact="true" onClick={handleLogout}><b>Logout</b></NavLink>
                {/* <NavLink to="/register" exact="true"><b>Register</b></NavLink>
                <NavLink to="/login" exact="true"><b>Login</b></NavLink> */}
                {/* <NavLink to="/reset" exact="true"><b>Reset</b></NavLink>
                <NavLink to="/dashboard" exact="true"><b>Dashboard</b></NavLink> */}
                {/* maybe add: <NavLink to="/allResumes/:id" exact="true"><b>See Your Resume</b></NavLink> */}
            </nav>
    );
};

export default Navbar;