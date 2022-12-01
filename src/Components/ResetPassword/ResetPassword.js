import './ResetPassword.css'

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import emailjs from '@emailjs/browser';
import randomString from 'randomstring';
import { useAuthState } from "react-firebase-hooks/auth";
//,UpdatePasswordHook,useUpdatePassword,useUpdateProfile

import { auth } from "../../firestoreConfig/firestoreConfig";

const Reset = () => {

  const navigate = useNavigate();
  const theNewPassword = randomString.generate(9);

  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // maybe delete setNewPassword
  const [prevPassword, setNewPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

// const updatePassword = useUpdatePassword(auth, prevPassword);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID, 
      process.env.REACT_APP_TEMPLATE_ID, 
      form.current, 
      process.env.REACT_APP_PUBLIC_KEY, {
        user_name: name,
        message: prevPassword,
        user_email: email
    })
      .then((result) => {
          console.log(result.text);
          // console.log(theNewPassword);
          navigate("/gotNewPassword");
      }, (error) => {
          console.log(error.text);
      });
  };
   
  return (
    <div className="resetStyle">
    <form ref={form} onSubmit={sendEmail} >
      <input 
        type="text" 
        name="user_name" 
        placeholder='name' 
        required
        value={name} 
        onChange={(e)=>setName(e.target.value)} />
      <input 
        type="email" 
        name="user_email" 
        placeholder='email' 
        required 
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
      <input 
        type="text" 
        name="message" 
        placeholder='your message' 
        required
        disabled
        // hidden

        // fix: for any type - we render new rand password - should be only after submit
        value={theNewPassword}
        // onChange={(e)=>setNewPassword(theNewPassword)} 
        />
      <input 
        type="submit" 
        value="Send new password to my email" />
    </form>
    <div>
          Don't have an account? <Link to="/">Register now </Link>
    </div>
    </div>
  );
}
export default Reset;