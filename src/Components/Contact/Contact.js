import './Contact.css';
import React, { useState, useRef } from "react";
// import EntryNavbar from '../EntryNavbar/EntryNavbar';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import { auth } from "../../config/firebase.config"
import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Fade from 'react-reveal/Fade';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';

const Contact = () => {

    const form = useRef();
    const navigate = useNavigate();

    const curAuth = getAuth();

    // const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [text, setText] = useState('');
    const [number, setNumber] = useState('');
    const [isValid, setIsValid] = useState(null);

    const sanitizeInput = (input) => {
      return DOMPurify.sanitize(input);
    };

    const validateEmail = async (e) => {
      e.preventDefault();
      const apiKey = `${process.env.REACT_APP_VALID_EMAIL}`;
      // const sanitizedEmail = encodeURIComponent(sanitizeInput(emailAdd));
      const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailAdd}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if the email is valid based on the API response
        if (data.is_valid_format && data.deliverability === "DELIVERABLE") {
          console.log("The email address is valid!");
          onSubmitHandler();
        } else {
          console.log("The email address is not valid.");
          setIsValid('');
        }
      } catch (error) {
        console.error("There was a problem with the validation:", error);
        alert("An error occurred while validating the email.");
      } 
    };

    const onSubmitHandler = async (e) => {

      // e.preventDefault();

      if (!firstName || !emailAdd || !text || !number) {
          alert("All fields are required");
          return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAdd)) {
          alert("Please enter a valid email address");
          return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(number)) {
          alert("Please enter a valid 10-digit phone number");
          return;
      }

      console.log(curAuth, emailAdd, text);
      
      emailjs.send(
          process.env.REACT_APP_SERVICE_ID_CONTACT, 
          process.env.REACT_APP_TEMPLATE_ID_CONTACT, 
          {
            user_name: sanitizeInput(firstName),
            message: sanitizeInput(text),
            user_email: sanitizeInput(emailAdd),
            user_number: sanitizeInput(number) 
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
        {/* <EntryNavbar/>     */}
          <div className='textsContainerContact' style={{marginTop:'30px',marginBottom:'140px'}}>
            <Fade delay={300} top> <h1>  <b className='shortText'>FOR ANY ISSUE </b> </h1> </Fade>
            <Fade delay={600} top> <h1>  <b className='shortText'>  LEAVE A MESSAGE HERE </b> </h1> </Fade>
            <Fade delay={900} top> <h1>  <b className='shortText'>  AND WE'LL CALL YOU BACK SOON  </b> 📬 </h1> </Fade>
          </div>

          <div style={{marginBottom:'90px', marginTop:'10px'}} className='textBoxContainer'>
            
            <Fade delay={1200} top >
                        
              <form ref={form} onSubmit={validateEmail} className="loginFormContainer">                    

                <TextField                              
                    name="user_name"
                    type="text"                                    
                    required 
                    // placeholder="Full name"
                    // all fields stretch to this width
                    sx={{width:"280px"}}
                    InputProps={{maxLength:30,pattern: "[A-Za-z ]{1,50}",startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    )}}                                  
                    label="Name"   
                    value={firstName} 
                    onChange={(e) => setFirstName(sanitizeInput(e.target.value))}                                
                />

                <TextField  
                  type="email"
                  label="Email"
                  name="user_email"
                  required  
                  // placeholder="Full name"
                  InputProps={{maxLength:30,pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,}$",startAdornment: (
                      <InputAdornment position="start">
                          <EmailIcon />
                      </InputAdornment>
                  )}}   
                  value={emailAdd}
                  onChange={(e) => setEmailAdd(sanitizeInput(e.target.value))}                                                                 
                />

              {isValid !== null && (
                <Fade><div style={{color:'red',justifyContent:'center',fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif', fontSize:'15px',fontWeight:'bold', background:'pink', borderRadius:'5px'}}>{isValid ? '✔️' : 'INVALID EMAIL ADDRESS'}</div></Fade>
              )}

                <TextField  
                  type="text"
                  label="Phone Number"
                  name="user_number"
                  required  
                  // placeholder="Full name"
                  InputProps={{maxLength:20,pattern: "{10}",startAdornment: (
                      <InputAdornment position="start">
                          <ContactPhoneIcon />
                      </InputAdornment>
                  )}}   
                  value={number}
                  onChange={(e) => setNumber(sanitizeInput(e.target.value))}                           
              />

              <TextField
                type="text"
                name="message"
                label="Your Message"
                required 
                id="outlined-multiline-static"
                multiline
                value={text}
                onChange={(e) => setText(sanitizeInput(e.target.value))}
                
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