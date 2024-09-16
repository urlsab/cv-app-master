import "./LoginApp.css";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
// import EntryNavbar from '../EntryNavbar/EntryNavbar';
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Fade from 'react-reveal/Fade';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { useAuthState } from "react-firebase-hooks/auth";

const LoginApp = () => {

    useEffect(() => {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.7');
    }, []);

    const navigate = useNavigate();
    const curAuth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(null);
    // const [user, loading, error] = useAuthState(auth);

    const sanitizeInput = (input) => {
        // Basic sanitization: remove HTML tags and trim
        return input.replace(/(<([^>]+)>)/gi, "").trim();
    };

    const validateEmail = async (e) => {
        e.preventDefault();
        const apiKey = `${import.meta.env.VITE_APP_VALID_EMAIL}`;
        // const sanitizedEmail = encodeURIComponent(sanitizeInput(emailAdd));
        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;
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
            console.log(error.message)
        }
    };

    const onSubmitHandler = async (e) => {
        // e.preventDefault();
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);
        console.log(curAuth, email, password);
        if (!validateEmail(sanitizedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            await signInWithEmailAndPassword(curAuth, sanitizedEmail, sanitizedPassword)
                // console.log(curAuth);
                // console.log(password);
                navigate("/dashboard");    
            }

        catch (error)  {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            console.log(curAuth);
            alert("Fix email or password or disconnect your google account if you tried to log in with google");
        };
    }

    const handleSpace = (e) => {
        if (e.key === ' ' || e.key === 62 || e.key === 43){
            e.preventDefault();
        }
    }

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        if (!value.includes(' ') && !value.includes('>') && !value.includes('+')) {
            setter(value);
        }
    };

    return (

        <>

            <div className="mainContainer">

            {/* <EntryNavbar/> */}

                <div className="loginForm">

                    <Fade top delay={300}>
                                          
                        <form  className="loginFormContainer"> 
 
                            {/* <EmailIcon/> */}
                            <TextField
                                id="email"
                                name="email"
                                type="email" 
                                label="Email"                                   
                                required 
                                onKeyDown={handleSpace}
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )}}     
                                // all fields stretch to this width
                                sx={{width:"280px"}}                                   
                                onChange={(e) => handleInputChange(e, setEmail)}
                            /> 

                            {isValid !== null && (
                                <Fade><div style={{color:'red',justifyContent:'center', fontSize:'15px',fontWeight:'bold', background:'pink', borderRadius:'5px'}}>{isValid ? '✔️' : 'INVALID EMAIL ADDRESS'}</div></Fade>
                            )}
                                                                                         
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"  
                                onKeyDown={handleSpace}                                  
                                required 
                                InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpenIcon />
                                    </InputAdornment>
                                )}}                                             
                                onChange={(e) => handleInputChange(e, setPassword)}
                            />
                    
                            {error && <div style={{color:'red', fontSize:'13px', fontWeight:'bold'}}>{error}</div>}
                            <Button size="large" startIcon={<VpnKeyIcon/>} variant="contained" color="inherit" onClick={validateEmail}> Login  </Button>
                            <Button size="large" startIcon={<GoogleIcon/>} variant="contained" color="error" onClick={handleGoogleSignIn}> with google  </Button>
                            <Button onClick={navigateToRegister} size="large" startIcon={<PersonAddIcon/>} variant="outlined" color="primary">  Sign up  </Button>
                                     
                        </form>

                    </Fade>

                </div>
                    
                <div className="textContainer">
                    <Fade left delay={600}> <h1> <b className="textStyle"> LOGIN</b> </h1> </Fade>
                    <Fade left delay={900}> <h1> <b className="textStyle"> AND EDIT </b> </h1> </Fade>
                    <Fade left delay={1200}> <h1> <b  className="textStyle">RIGHT NOW</b > 👨‍💻 </h1> </Fade>
                </div>
                
                
                
            </div>
            
            
        </>
   
  );

}

export default LoginApp;