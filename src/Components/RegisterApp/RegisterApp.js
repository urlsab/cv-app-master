import "./RegisterApp.css";

import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import { auth } from "../../firestoreConfig/firestoreConfig"
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

import { initialPassword } from "../../utils/passwordsObject";
import { useAuthState } from "react-firebase-hooks/auth";

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import Fade from 'react-reveal/Fade';
import GradingIcon from '@mui/icons-material/Grading';

import emailjs from '@emailjs/browser';

const RegisterApp = () => {

    const form = useRef();
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigateToSignIn = () => {
        navigate("/");
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, emailAdd, rePassword)
        // hash of "hesed2emet1" = 'UkVEQUNURUQ=' , UkVEQUNURUQ=
        .then((userCredential) => {
            let userData = userCredential.user;
            userData.displayName = rePassword;
            console.log(auth);
            console.log(userData)
            console.log(`the user password is: ${rePassword} `);
        //   console.log(`displayName:${disName}`);
      })

      .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
      })

      // save user password in new collection
      initialPassword.objectPassword.thePassword = rePassword;
      const usersCollection = collection(firestoreDB, `${emailAdd}`);
      setDoc(doc(usersCollection, "userPassword"), initialPassword.objectPassword)
        .then(() => {
            console.log("set password in doc successfully")
        })

        .catch(error => {
            console.log(error);
        });
        console.log(`your password is: ${rePassword} `);
        emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID, 
            process.env.REACT_APP_TEMPLATE_ID, 
            form.current, 
            process.env.REACT_APP_PUBLIC_KEY, {
            user_name: firstName,
            message: rePassword,
            user_email: emailAdd
        })
        .then((result) => {
            console.log(result.text);
            console.log(result.status);
            console.log(result);
            navigate("/")
        })

        .catch ((error) => {
            console.log(error.text);
        });
        
    }

    return (

        <>
    
            <div className="mainContainer">

                <div className="loginForm">
                
                    <form className="loginFormContainer" onSubmit={onSubmitHandler} ref={form}>                    

                        <TextField                              
                            name="user_name"
                            type="text"                                    
                            required 
                            // all fields stretch to this width
                            sx={{width:"280px"}}                               
                            label="Full name"   
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)}                                
                        />
                    
                        <TextField  
                            type="email"
                            label="Email"
                            name="user_email"
                            required  
                            value={emailAdd}
                            onChange={(e) => setEmailAdd(e.target.value)}                                                                 
                        />
                    
                        <TextField
                            type="password"
                            name="message"
                            label="Password"
                            required  
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}                                                                    
                        />
                            
                        <Button startIcon={<AssignmentTurnedInIcon/>} size="large" color="success" variant="contained" type="submit"> Sign up </Button>
                        
                        <Button onClick={navigateToSignIn} size="large" startIcon={<LoginIcon/>}  variant="outlined" color="primary"> login </Button>
                        {/* <Button> Already have an account? <NavLink to="/">Sign in</NavLink> </Button>  */}

                    </form>
                     
                </div>

                <div className="textContainer">
                    <Fade bottom delay={1200}> <h1>📄 <b className="textStyle"> SIGN UP</b> ✏️ </h1> </Fade>
                    <Fade bottom delay={2100}> <h1> 🎁 <b className="textStyle"> FOR  </b>🆓 </h1> </Fade>
                    <Fade bottom delay={3000}> <h1> 💼 <b className="textStyle">CAREER TICKETS</b> 🎫 </h1> </Fade>
                </div>

            </div>
             
        </>

    );

}

export default RegisterApp;