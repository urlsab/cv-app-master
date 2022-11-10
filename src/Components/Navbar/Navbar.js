import React from 'react';
import { NavLink } from "react-router-dom";
import { textType } from '../FullProfile/PostUserInput';

import './Navbar.css';

const Navbar = () => {
    return(
            <nav className="main-header">
                <NavLink to="/allData" exact="true"><b>to all data</b></NavLink>
                <NavLink to="/postInput" exact="true"><b>to post input</b></NavLink>
            </nav>
    );
};

export default Navbar;