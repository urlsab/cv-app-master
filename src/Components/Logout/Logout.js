import './Logout.css';
import React, { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Fade from 'react-reveal/Fade';
import HomeIcon from '@mui/icons-material/Home';
import { useLayoutEffect } from 'react';

const Logout = ({ setShowNavbar }) => {

      useLayoutEffect(() => {
        setShowNavbar(false);
    }, [setShowNavbar(false)])

    useEffect(() => {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute('content', 'width=device-width, inintial-scale=0.45');
    }, []);

  const navigate = useNavigate();

  const navigateToHome = () => {
    // avoid user name index in local storage + memory waste
    // localStorage.clear();
    navigate("/");
  }

  return (
    <div className="logoutContainer">  
      <Fade bottom delay={300}> <h2> <b className='goodBeyStyle'> YOUR GREAT RESUME - OUR SUCCESS </b> </h2> </Fade> 
      
      {/* <b className='styleName'> {localStorage.getItem(localStorage.key(0))}  </b> */}
      <Fade bottom delay={600}> <h3> <b className='goodBeyStyle'>  SEE YOU SOON  </b> 🤙 </h3>  </Fade>      
      <Fade delay={900}> <Button style={{marginBottom:'80px'}} sx={{m:3}} startIcon={<HomeIcon/>} onClick={navigateToHome} color="primary" variant="contained"> home </Button> </Fade>
    </div>
  )
}

export default Logout;

// add dynamic names