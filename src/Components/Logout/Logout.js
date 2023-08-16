import './Logout.css';

import React  from 'react';

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Fade from 'react-reveal/Fade';
import HomeIcon from '@mui/icons-material/Home';

const Logout = () => {

  const navigate = useNavigate();

  const navigateToHome = () => {

    // avoid user name index in local storage + memory waste
    localStorage.clear();

    navigate("/");
  }

  return (
    <div className="logoutContainer">  
      <Fade bottom delay={300}> <h1> <b className='goodBeyStyle'> YOUR GREAT CV - OUR SUCCESS </b> </h1> </Fade> 
      
      {/* <b className='styleName'> {localStorage.getItem(localStorage.key(0))}  </b> */}
      <Fade bottom delay={1100}> <h1 > <b className='goodBeyStyle'>  SEE YOU SOON  </b> 🤙 </h1>  </Fade>      
      <Fade delay={900}> <Button sx={{m:3}} startIcon={<HomeIcon/>} onClick={navigateToHome} color="primary" variant="contained"> home </Button> </Fade>
    </div>
  )
}

export default Logout;

// add dynamic names