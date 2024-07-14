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

const RegisterApp = () => {

    const form = useRef();
    const navigate = useNavigate();
    const curAuth = getAuth();
    // const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigateToSignIn = () => {
        navigate("/login");
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(curAuth, emailAdd, rePassword);
        createUserWithEmailAndPassword(curAuth, emailAdd, rePassword)
        .then((userCredential) => {
            let userData = userCredential.user;
            userData.displayName = firstName;
            userData.phoneNumber = firstName;
            // console.log(auth);
            console.log(userData);
            console.log(`the user password is: ${rePassword} `);
            console.log(`displayName:${userData.displayName}`);
            console.log(`phoneNumber:${userData.phoneNumber}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            console.log("error from createUserWithEmailAndPassword function")
        })
    
      const usersCollection = collection(firestoreDB, `${emailAdd}`);
      // add 00000 to render user name at /dashboard from cv[0] array 
     setDoc(doc(usersCollection, "00000Data"), {thePassword: rePassword, userName: firstName})
        .then(() => {

            // console.log(initialPassword.objectPassword.thePassword);
            console.log("set password as a collection successfully");
            navigate("/");
        })
        .catch(error => {
            console.log(error);
            console.log("error from set password as a collection function")
        })
        
        emailjs.send(
            `${process.env.REACT_APP_SERVICE_ID}`, 
            `${process.env.REACT_APP_TEMPLATE_ID}`, 
            {
            user_name: firstName,
            message: rePassword,
            user_email: emailAdd
            },
            `${process.env.REACT_APP_PUBLIC_KEY}`,
        )
        .then((result) => {
            console.log(`email js send the password ${rePassword} to ${emailAdd}  `)
            console.log(result.text);
            console.log(result.status);
            console.log(result);
            navigate("/login");
        })
        .catch((error) => {
            console.log(error.text);
            console.log("error from emailjs function")
        });
    }

    return (
        <>
            <div className="containerRegiter">
            <EntryNavbar/>
                <div className="loginForm">
                    <Fade top dalay={300}>  
                        <form ref={form} onSubmit={onSubmitHandler}  className="loginFormContainer">                    
                            <TextField                              
                                name="user_name"
                                type="text"                                    
                                required 

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
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )}}   
                                value={emailAdd}
                                onChange={(e) => setEmailAdd(e.target.value)}                                                                 
                            />

                            <TextField
                                type="password"
                                name="message"
                                label="Password"
                                required  
                                autoComplete="on"
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpenIcon />
                                    </InputAdornment>
                                )}}   
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}                                                                    
                            />
                                
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