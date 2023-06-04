import "./RegisterApp.css";

import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import { auth } from "../../firestoreConfig/firestoreConfig"
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

import { getAuth } from "firebase/auth";

import { initialPassword } from "../../utils/passwordsObject";
import { useAuthState } from "react-firebase-hooks/auth";

import EntryNavbar from '../EntryNavbar/EntryNavbar';

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import Fade from 'react-reveal/Fade';
import GradingIcon from '@mui/icons-material/Grading';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

import HomeIcon from '@mui/icons-material/Home';

import emailjs from '@emailjs/browser';

const RegisterApp = () => {

    const form = useRef();
    const navigate = useNavigate();

    const curAuth = getAuth();

    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigateToSignIn = () => {
        navigate("/login");
    }

    // const sendToEmail = (e) => {

    //     e.preventDefault();

    //     emailjs.send(
    //         process.env.REACT_APP_SERVICE_ID,
    //         process.env.REACT_APP_TEMPLATE_ID, {
    //             user_name: firstName,
    //             message: rePassword,
    //             user_email: emailAdd
    //         },
    //         process.env.REACT_APP_PUBLIC_KEY

    //         // process.env.REACT_APP_SERVICE_ID, 
    //         // process.env.REACT_APP_TEMPLATE_ID, 
    //         // form.current, 
    //         // 'nTckRns0_Iv6mZOUS'
    //         // process.env.REACT_APP_PUBLIC_KEY
    //     //     , {
    //     //     user_name: firstName,
    //     //     message: rePassword,
    //     //     user_email: emailAdd
    //     // }
    //     )

    //     .then((result) => {
    //         console.log(`email js send the password ${rePassword} to ${emailAdd}  `)
    //         console.log(result.text);
    //         console.log(result.status);
    //         console.log(result);
    //         navigate("/");
    //     })

    //     .catch((error) => {
    //         console.log(error.text);
    //         console.log("error from emailjs function")
    //     });
    // }

    // add await key word = function will run any req one after one
    const onSubmitHandler = async (e) => {

        e.preventDefault();

        console.log(curAuth, emailAdd, rePassword);

        await createUserWithEmailAndPassword(curAuth, emailAdd, rePassword)

        // hash of "hesed2emet1" = 'UkVEQUNURUQ=' , UkVEQUNURUQ=
        .then((userCredential) => {
            let userData = userCredential.user;

            

            userData.displayName = firstName;
            userData.phoneNumber = firstName;
            
            console.log(auth);
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

      // save user password in new collection
      
    //   console.log(rePassword);
    //   initialPassword.objectPassword.thePassword = rePassword;
    
    //   e.preventDefault();
      const usersCollection = collection(firestoreDB, `${emailAdd}`);
      
      // add AAA to aviod render user name at /dashboard from cv[0] array 
      await setDoc(doc(usersCollection, "00000Data"), {thePassword: rePassword, userName: firstName})
        .then(() => {
            // console.log(initialPassword.objectPassword.thePassword);
            console.log("set password as a collection successfully");
            
            // navigate("/");
            
        })

        .catch(error => {
            console.log(error);
            console.log("error from set password as a collection function")
        })
        
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID, 
            process.env.REACT_APP_TEMPLATE_ID, 
            {
            user_name: firstName,
            message: rePassword,
            user_email: emailAdd
            },
            process.env.REACT_APP_PUBLIC_KEY,
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

        const userArray = [firstName];

        const users = localStorage.setItem('userName', JSON.stringify(userArray));
        console.log(users);

        const userData = JSON.parse(localStorage.getItem('userName'));
        console.log(userData);

        const saveUserNameLoacl = localStorage.setItem(emailAdd, JSON.stringify(firstName));
        console.log(saveUserNameLoacl);
        
    }

    return (

        <>

        <EntryNavbar/>

        {/* <Fade><a className="homeStyle" href="/"><HomeIcon/></a></Fade> */}
    
            <div className="containerRegiter">

                <div className="loginForm">

                    <Fade top dalay={300}>
                       
                        <form ref={form} onSubmit={onSubmitHandler}  className="loginFormContainer">                    

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
                                type="password"
                                name="message"
                                label="Password"
                                required  
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
                            {/* <button onClick={sendToEmail}>send password to email</button> */}
                            {/* <Button> Already have an account? <NavLink to="/">Sign in</NavLink> </Button>  */}

                        </form> 

                    </Fade>
                     
                </div>

                <div className="textContainer">
                    <Fade left delay={600}> <h1> <b className="textStyle"> SIGN UP</b> </h1> </Fade>
                    <Fade left delay={900}> <h1> <b className="textStyle"> FOR FREE </b> </h1> </Fade>
                    <Fade left delay={1200}> <h1> <b className="textStyle">CREATION</b> 🎨 </h1> </Fade>
                </div>

            </div>
             
        </>

    );

}

export default RegisterApp;