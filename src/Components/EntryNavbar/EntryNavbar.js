import React, { useEffect } from 'react';
import './EntryNavbar.css';
import { NavLink } from "react-router-dom";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HandymanIcon from '@mui/icons-material/Handyman';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const EntryNavbar = () => {

  useEffect(() => {
    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.7');
  }, []);

  return (
    <>
      <AppBar style={{background:"linear-gradient(162deg, rgb(99, 88, 80) 0%, rgb(54, 108, 158) 70%)"}} position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              <NavLink style={{fontSize:"14px"}} to='/' exact="true"><HomeIcon sx={{mr:"3px"}}/>HOME</NavLink>

              <NavLink style={{fontSize:"14px"}} to='/login' exact="true"><LoginIcon sx={{mr:"3px"}}/>LOGIN</NavLink>
              <NavLink style={{fontSize:"14px"}} to='/register' exact="true"><PersonAddIcon sx={{mr:"3px"}}/>SIGN UP</NavLink>
              <NavLink style={{fontSize:"14px"}} to='/fastBuild' exact="true"><HandymanIcon sx={{mr:"3px"}}/>BUILD</NavLink>
              <NavLink style={{fontSize:"14px"}} to='/about' exact="true"><FingerprintIcon sx={{mr:"3px"}}/>ABOUT</NavLink>
              <NavLink style={{fontSize:"14px"}} to='/contact' exact="true"><ForwardToInboxIcon sx={{mr:"3px"}}/>CONTACT</NavLink>
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