import "./RegisterApp.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from "../../config/firebase.config"
import { firestoreDB } from "../../config/firebase.config";
import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import EntryNavbar from '../EntryNavbar/EntryNavbar';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import Fade from 'react-reveal/Fade';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';
// import axios from 'axios';

const RegisterApp = () => {

    const form = useRef();
    const navigate = useNavigate();
    const curAuth = getAuth();
    // const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isValid, setIsValid] = useState(null);


    const sanitizeInput = (input) => {
        // Basic sanitization: remove HTML tags and trim
        return input.replace(/(<([^>]+)>)/gi, "").trim();
    };

    const navigateToSignIn = () => {
        navigate("/login");
    }
  
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

    const onSubmitHandler = (e) => {
        // e.preventDefault();
        const auth = getAuth();
        const sanitizedEmail = sanitizeInput(emailAdd);
        const sanitizedPassword = sanitizeInput(rePassword);
        const sanitizedFirstName = sanitizeInput(firstName);

        console.log(curAuth, emailAdd, rePassword);
        createUserWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            user.updateProfile({
                displayName: sanitizedFirstName,
            });
            
            // console.log(auth);
            console.log(user);
            console.log(`the user password is: ${rePassword} `);
            createCollectionAndSendPasswordToEmail();
        })
        .catch((error) => {
            alert(error.message);
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            // console.log("error from createUserWithEmailAndPassword function");
            // navigate("/register");
        })

    
}

const createCollectionAndSendPasswordToEmail = () => {

        const sanitizedEmail = sanitizeInput(emailAdd);
        const sanitizedPassword = sanitizeInput(rePassword);
        const sanitizedFirstName = sanitizeInput(firstName);
                
    const usersCollection = collection(firestoreDB, sanitizedEmail);
    // add 00000 to render user name at /dashboard from cv[0] array 
   setDoc(doc(usersCollection, "00000Data"), {thePassword: sanitizedPassword, userName: sanitizedFirstName})
      .then(() => {
          // console.log(initialPassword.objectPassword.thePassword);
          console.log("set password as a collection successfully");
          alert('Acount created successfully')
          navigate("/login");
      })
      .catch(error => {
          console.log(error);
          console.log("error from set password as a collection function")
      })
      
      emailjs.send(
          `${process.env.REACT_APP_SERVICE_ID}`, 
          `${process.env.REACT_APP_TEMPLATE_ID}`, 
          {
          user_name: sanitizedFirstName,
          message: sanitizedPassword,
          user_email: sanitizedEmail,
          },
          `${process.env.REACT_APP_PUBLIC_KEY}`,
      )
      .then((result) => {
          console.log(`email js send the password ${rePassword} to ${emailAdd}  `)
          console.log(result.text);
          console.log(result.status);
          console.log(result);
          // navigate("/login");
      })
      .catch((error) => {
          console.log(error.text);
          console.log("error from emailjs function")
      });
  }


    const isNotEmptyOrWhitespace = (str) => str.trim().length > 0;
    // const hasNoSpaces = (str) => {
    //     return !/\s/.test(str);
    // };

    const handleSpace = (e) => {
        if (e.key === ' ' || e.key === 62 || e.key === 43){
            e.preventDefault();
        }
    }

    return (
        <>
            <div className="containerRegiter">
            <EntryNavbar/>
                <div className="loginForm">
                    <Fade top dalay={300}>  
                        <form ref={form} onSubmit={validateEmail} className="loginFormContainer">                    
                            <TextField                              
                                name="user_name"
                                type="text"                                    
                                required 
                                onKeyDown={handleSpace}
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                // all fields stretch to this width
                                sx={{width:"280px"}}
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                )}}                                  
                                label="Name"   
                                                                
                            />
                            { isNotEmptyOrWhitespace(firstName) && firstName.length < 6 && firstName!=='' && (
                                <Fade><div style={{color:'red',justifyContent:'center', fontSize:'15px',fontWeight:'bold', background:'pink', borderRadius:'5px'}}>{isValid ? '' : 'TYPE AT LEAST 6 CHARACTERS'}</div></Fade>
                            )}
                            

                            <TextField  
                                type="email"
                                label="Email"
                                name="user_email"
                                required  
                                onKeyDown={handleSpace}
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                                
                            }}   
                                value={emailAdd}
                                onChange={(e) => setEmailAdd(e.target.value)}                                                                 
                            />
                            {isValid !== null && (
                                <Fade><div style={{color:'red',justifyContent:'center', fontSize:'15px',fontWeight:'bold', background:'pink', borderRadius:'5px'}}>{isValid ? '✔️' : 'INVALID EMAIL ADDRESS'}</div></Fade>
                            )}

                            <TextField
                                type="password"
                                name="message"
                                label="Password"
                                required 
                                onKeyDown={handleSpace}
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}  
                                autoComplete="on"
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpenIcon />
                                    </InputAdornment>
                                )}}   
                                                                                                   
                            />
                            {isNotEmptyOrWhitespace(rePassword) && rePassword.length < 8 && rePassword!=='' && (
                                <Fade><div style={{color:'red',justifyContent:'center', fontSize:'15px',fontWeight:'bold', background:'pink', borderRadius:'5px'}}>{isValid ? '' : 'TYPE AT LEAST 8 CHARACTERS'}</div></Fade>
                            )}
                                
                            <Button startIcon={<AssignmentTurnedInIcon/>} size="large" color="success" variant="contained" type="submit"> Sign up </Button>
                            <Button onClick={navigateToSignIn} size="large" startIcon={<LoginIcon/>}  variant="outlined" color="primary"> login </Button>
                            
                        </form> 

                    </Fade>
                     
                </div>

                <div className="textContainer">
                    <Fade left delay={600}> <h1> <b className="textStyle"> SIGN UP</b> </h1> </Fade>
                    <Fade left delay={900}> <h1> <b className="textStyle"> FOR EASY </b> </h1> </Fade>
                    <Fade left delay={1200}> <h1> <b className="textStyle">CREATIONS</b> 🎨 </h1> </Fade>
                </div>

            </div>
             
        </>

    );

}

export default RegisterApp;