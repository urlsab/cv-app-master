import './ResetPassword.css'

import React, { useState, useRef, useEffect } from "react";

import { useNavigate ,Link } from "react-router-dom";

import { query, where } from "firebase/firestore";

import emailjs from '@emailjs/browser';
import randomString from 'randomstring';
import { useAuthState } from "react-firebase-hooks/auth";
import {  createUserWithEmailAndPassword, signInWithEmailLink  } from 'firebase/auth';

import { collection } from "firebase/firestore";

// import { initialPassword } from "../../utils/passwordsObject";

// import { documentId, setDoc } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { auth } from "../../../src/firestoreConfig/firestoreConfig";
// import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc, getDocs } from 'firebase/firestore';
import { initialPassword } from '../../utils/passwordsObject';


const Reset = () => {

  const form = useRef();

  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const [emailAdd, setEmail] = useState('');
  const [prevPassword, setNewPassword] = useState('');
  
  const sendEmail = (e) => {
    e.preventDefault();
    // const q = collection(firestoreDB, `${user.email}`);
    console.log(`your password is: ${user.displayName}`);
    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID, 
      process.env.REACT_APP_TEMPLATE_ID, 
      form.current, 
      process.env.REACT_APP_PUBLIC_KEY, {
        user_name: name,
        message: user.displayName,
        user_email: emailAdd
    })
      .then((result) => {
          console.log(result.text);
          console.log(prevPassword);
          console.log(name);
          console.log(result.status);
          console.log(result);
          // navigate("/gotNewPassword");
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
        value={emailAdd}
        onChange={(e)=>setEmail(e.target.value)} />
      <input 
        type="text" 
        // name="message" 
        placeholder='your message' 
        required
        // disabled
        // hidden

        // fix: for any type - we render new rand password - should be only after submit
        value={prevPassword}
        onChange={(e)=> setNewPassword(e.target.value)}
        />
      <input 
        type="submit" 
        value="Send new password to my email" />
    </form>
    {/* <button> match email path to user</button> */}
    <div>
          Don't have an account? <Link to="/">Register now </Link>
    </div>
    </div>
  );

}

export default Reset;