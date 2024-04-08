import React from 'react';
import './EntryNavbar.css';
import { NavLink } from "react-router-dom";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const EntryNavbar = () => {
  return (
    <>
      <AppBar style={{background:"linear-gradient(162deg, rgb(99, 88, 80) 0%, rgb(54, 108, 158) 70%)"}} position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              <NavLink style={{fontSize:"16px"}} to='/' exact="true"><HomeIcon sx={{mr:"4px"}}/>HOME</NavLink>

              <NavLink style={{fontSize:"16px"}} to='/login' exact="true"><LoginIcon sx={{mr:"4px"}}/>LOGIN</NavLink>
              <NavLink style={{fontSize:"16px"}} to='/register' exact="true"><PersonAddIcon sx={{mr:"4px"}}/>SIGN UP</NavLink>

              <NavLink style={{fontSize:"16px"}} to='/about' exact="true"><FingerprintIcon sx={{mr:"4px"}}/>ABOUT</NavLink>
              <NavLink style={{fontSize:"16px"}} to='/contact' exact="true"><ForwardToInboxIcon sx={{mr:"4px"}}/>CONTACT</NavLink>
              {/* <img className='styleLogoCv' src="https://img.icons8.com/external-basicons-color-edtgraphics/50/null/external-cv-hr-edtim-lineal-color-edtim-3.png"/> */}
              {/* <NavLink to="/logout" exact="true" onClick={handleLogout}><LogoutIcon sx={{mr:"4px"}}/>LOGOUT</NavLink> */}
              {/* maybe add: <NavLink to="/allResumes/:id" exact="true"><b>See Your Resume</b></NavLink> */}
          </Toolbar>   
        </Container>
      </AppBar>
    </>
  )
}

export default EntryNavbar;