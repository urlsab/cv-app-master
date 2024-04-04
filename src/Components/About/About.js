import './About.css';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EntryNavbar from '../EntryNavbar/EntryNavbar';

const About = () => {

  const navigate = useNavigate();

  return (
    <>
        <div className='aboutContainer'>
        <EntryNavbar/>
          <div className='allText'>
            <Fade delay={400} top><h1 style={{marginBottom:'60px'}} className='symbolAndText'> <b className='textStyle'> CVA IS A FREE APP FOR BUILD AND DESIGN CV </b></h1></Fade>
            <Fade delay={800} top><h1 style={{marginBottom:'60px'}} className='symbolAndText'> <b className='textStyle'> INCLUDES FEATURES WITH FRIENDLY USE </b></h1></Fade>
            <Fade delay={1200} top> <h1 style={{marginBottom:'60px'}} className='symbolAndText'> <b className='textStyle'> CONTACT US FOR ANY PURPOSE </b> 📞 </h1></Fade> 
            <div className='aboutButton'>
              <Fade delay={1600} top> <Button startIcon={<ForwardToInboxIcon/>} sx={{m:4, mt:10, mb:10}} size="large" onClick={() => navigate("/contact")} color="primary" variant="contained"> TO CONTACT </Button> </Fade>
            </div> 
          </div>

          

       </div>
    </>
  )
}

export default About;