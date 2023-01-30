import "./LoginApp.css";

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { auth } from "../../../src/firestoreConfig/firestoreConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Fade from 'react-reveal/Fade';

const LoginApp = () => {

  // const [user, loading, error] = useAuthState(auth);
  
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const googleSignIn = () => {
        const googleAuth = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuth);
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            console.log(password);
            navigate("/dashboard");
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorCode);
        });
    }

    return (

        <>

            <div className="mainContainer">

                <Fade top delay={300}>
                                      
                    <form className="loginFormContainer"> 
                                            
                        <div className="textFieldStyle">                                        
                            <TextField
                                // className="inputStyle"
                                id="email-address"
                                name="email"
                                type="email" 
                                label="Email Address"                                   
                                required                                            
                                placeholder="Email address"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="textFieldStyle">            
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"                                    
                                required                                            
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="textFieldStyle">
                            <Button variant="contained" color="info" onClick={onLogin}> Login By Password </Button>
                        </div>

                        <div className="textFieldStyle">
                            <Button variant="contained" color="error" onClick={handleGoogleSignIn}> Signin with google </Button>
                        </div>         
                        
                        <div className="textFieldStyle">
                                <NavLink to="/register" > Create New account</NavLink>
                        </div>
                        
                    </form>

                </Fade>

                <div className="textContainer">
                    <Fade left delay={1200} >  <h1 className="textStyle"> One Simple Step</h1> </Fade>
                    <Fade left delay={2100} >  <h1 className="textStyle"> To Start Create</h1> </Fade>
                    <Fade left delay={3000} >  <h1 className="textStyle"> An Amazing CV</h1> </Fade>
                </div>
                
            </div>
            
        </>
   
  );

}

export default LoginApp;