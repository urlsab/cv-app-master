import React, { useState, useRef } from "react";
import './Reset.css'
import emailjs from '@emailjs/browser';
import randomString from 'randomstring';

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Reset.css";

const Reset = () => {

  const navigate = useNavigate();
  const theNewPassword = randomString.generate(9);

  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_wexx65q', 
      'template_a2f6uf1', 
      form.current, 
      'nTckRns0_Iv6mZOUS', {
        user_name: name,
        message: password,
        user_email: email
    })
      .then((result) => {
          console.log(result.text);
          navigate("/");
      }, (error) => {
          console.log(error.text);
          console.log(theNewPassword);
      });
  };
   
  return (
    <div className="resetStyle">
    <form ref={form} onSubmit={sendEmail}>
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
        // disabled
        hidden
        value={theNewPassword}
        // onChange={(e)=>setNewPassword(theNewPassword)} 
        />
      <input 
        type="submit" 
        value="Send new password to my email" />
    </form>
    <div>
          Don't have an account? <Link to="/register">Register now </Link>
    </div>
    </div>
  );
}
export default Reset;