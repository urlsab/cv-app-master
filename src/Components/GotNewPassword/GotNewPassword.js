import './GotNewPassword.css';

import React from 'react';

import { Link } from "react-router-dom";
// import { initialPassword } from '../../utils/passwordsObject';

const GotNewPassword = () => {

  return (

    <div className='gotNewPasswordStyle'>
      <h1>you Got New Password !</h1>
      <h2> check your email now </h2>
      {/* <p> your password is {initialPassword.objectPassword}</p> */}
      <Link to="/login">Sing in </Link>
    </div>

  )

};

export default GotNewPassword;
