import './Contact.css';
import React, { useState, useRef } from "react";
import EntryNavbar from '../EntryNavbar/EntryNavbar';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { auth } from "../../config/firebase.config"
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Fade from 'react-reveal/Fade';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';

const Contact = () => {

    const form = useRef();
    const navigate = useNavigate();

    const curAuth = getAuth();

    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [text, setText] = useState('');
    const [number, setNumber] = useState('');

    const onSubmitHandler = async (e) => {

      e.preventDefault();

      console.log(curAuth, emailAdd, text);
      
      emailjs.send(
          process.env.REACT_APP_SERVICE_ID_CONTACT, 
          process.env.REACT_APP_TEMPLATE_ID_CONTACT, 
          {
            user_name: firstName,
            message: text,
            user_email: emailAdd,
            user_number: number 
          },
          process.env.REACT_APP_PUBLIC_KEY_CONTACT
      )

      .then((result) => {
          console.log(result.text);
          console.log(result.status);
          console.log(result);
          navigate("/");
      })

      .catch((error) => {
          console.log(error.text);
          console.log("error from emailjs function")
      });
      
  }

  return (
    <>
        <div className='contactContainer'>
        <EntryNavbar/>    
          <div className='textsContainerContact'>
            <Fade delay={300} top> <h1>  <b className='shortText'>FOR ANY ISSUE </b> </h1> </Fade>
            <Fade delay={600} top> <h1>  <b className='shortText'>  LEAVE A MESSAGE HERE </b> </h1> </Fade>
            <Fade delay={900} top> <h1>  <b className='shortText'>  AND WE'LL CALL YOU BACK SOON  </b> 📬 </h1> </Fade>
          </div>

          <div className='textBoxContainer'>
            
            <Fade  delay={1200} top >
                        
              <form ref={form} onSubmit={onSubmitHandler} className="loginFormContainer">                    

                <TextField                              
                    name="user_name"
                    type="text"                                    
                    required 
                    // placeholder="Full name"
                    // all fields stretch to this width
                    sx={{width:"280px"}}
                    InputProps={{startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    )}}                                  
                    label="Full name"   
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}                                
                />

                <TextField  
                  type="email"
                  label="Email"
                  name="user_email"
                  required  
                  // placeholder="Full name"
                  InputProps={{startAdornment: (
                      <InputAdornment position="start">
                          <EmailIcon />
                      </InputAdornment>
                  )}}   
                  value={emailAdd}
                  onChange={(e) => setEmailAdd(e.target.value)}                                                                 
                />

                <TextField  
                  type="text"
                  label="Phone Number"
                  name="user_number"
                  required  
                  // placeholder="Full name"
                  InputProps={{startAdornment: (
                      <InputAdornment position="start">
                          <ContactPhoneIcon />
                      </InputAdornment>
                  )}}   
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}                                                                 
              />

              <TextField
                type="text"
                name="message"
                label="Your Message"
                required 
                id="outlined-multiline-static"
                multiline
                value={text}
                  
                onChange={(e) => setText(e.target.value)} 
                
                // InputProps - works for other things
                inputProps={{maxLength:105}}
                
                rows={4}
                
              />
                      
              <Button endIcon={<SendIcon/>} size="large" color="info" variant="contained" type="submit"> SEND</Button>

              </form> 

            </Fade>

          </div>
            
        </div>

    </>

  )

}

export default Contact;