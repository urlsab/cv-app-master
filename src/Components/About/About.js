import React from 'react';
import './About.css';

import Fade from 'react-reveal/Fade';

import { NavLink, useNavigate, Link } from "react-router-dom";

import { Button } from "@mui/material";

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import EntryNavbar from '../EntryNavbar/EntryNavbar';



const About = () => {

  const navigate = useNavigate();

  return (
    <>
        <EntryNavbar/>
        <div className='aboutContainer'>

          <div className='allText'>
            <Fade delay={400} top><h1 className='symbolAndText'> 🧩 <b className='textStyle'> CVA IS A FREE APP FOR BUILD AND DESIGN CV </b></h1></Fade>
            <Fade delay={800} top><h1 className='symbolAndText'> 🧮 <b className='textStyle'> INCLUDES FEATURES WITH FRIENDLY USE </b></h1></Fade>
            <Fade delay={1200} top> <h1 className='symbolAndText' > 📞 <b className='textStyle'> CONTACT US FOR ANY PURPOSE </b> </h1></Fade>  
          </div>

          <div className='aboutButton'>
            <Fade delay={1600} top> <Button startIcon={<ForwardToInboxIcon/>} sx={{m:4}} size="large" onClick={() => navigate("/contact")} color="primary" variant="contained"> TO CONTACT </Button> </Fade>
          </div>

            {/* <p>hi</p> */}
        </div>
    </>
  )
}

export default About;
