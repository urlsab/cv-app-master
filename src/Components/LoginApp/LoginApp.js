import "./LoginApp.css";

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { auth } from "../../../src/firestoreConfig/firestoreConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Fade from 'react-reveal/Fade';

import PasswordIcon from '@mui/icons-material/Password';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import GradingIcon from '@mui/icons-material/Grading';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const LoginApp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [user, loading, error] = useAuthState(auth);

    const googleSignIn = () => {
        const googleAuth = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuth);
    }

    const navigateToRegister = () => {
        navigate("/register")
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

                <div className="loginForm">

                    <Fade top delay={300}>
                                          
                        <form className="loginFormContainer"> 

                            
                            {/* <EmailIcon/> */}
                            <TextField
                                id="email"
                                name="email"
                                type="email" 
                                label="Email"                                   
                                required 
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )}}     
                                // all fields stretch to this width
                                sx={{width:"280px"}}                                   
                                onChange={(e)=>setEmail(e.target.value)}
                            /> 
                                                                                         
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"                                    
                                required 
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                )}}                                             
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                    
                            <Button size="large" startIcon={<VpnKeyIcon/>} variant="contained" color="inherit" onClick={onLogin}> Login </Button>
                        
                            <Button size="large" startIcon={<GoogleIcon/>} variant="contained" color="error" onClick={handleGoogleSignIn}>  Login</Button>
                                           
                            <Button onClick={navigateToRegister} size="large" startIcon={<PersonAddIcon/>} variant="outlined" color="primary">  Sign up  </Button>
                                     
                        </form>

                    </Fade>

                </div>
                    
                <div className="textContainer">
                    <Fade left delay={1200}> <h1> <b className="textStyle"> LOGIN</b> 🔌 </h1> </Fade>
                    <Fade left delay={2100}> <h1> ✍&#127996; <b className="textStyle"> TO </b> </h1> </Fade>
                    <Fade left delay={3000}> <h1> ✨ <b className="textStyle">MASTERPIECE</b> ✨  </h1> </Fade>
                </div>
                
            </div>
            
        </>
   
  );

}

export default LoginApp;