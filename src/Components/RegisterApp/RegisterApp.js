import "./RegisterApp.css";

import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import { auth } from "../../firestoreConfig/firestoreConfig"
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

import { initialPassword } from "../../utils/passwordsObject";
import { useAuthState } from "react-firebase-hooks/auth";

import emailjs from '@emailjs/browser';

const RegisterApp = () => {

    const form = useRef();
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

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
      });
      // save user password in new collection
      initialPassword.objectPassword.thePassword = rePassword;
      const usersCollection = collection(firestoreDB, `${emailAdd}`);
      setDoc(doc(usersCollection, "userPassword"), initialPassword.objectPassword)
        .then(() => {
          console.log("set password in doc successfully")
      }).catch(error => {
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
      }).catch ((error) => {
          console.log(error.text);
      });
        
}

    // const sendPasswordToEmail = (event) => {
    //     // event.preventDefault();
        
    // }

  return (

    <>
    <main className="registerStyle" >        
        <section>

            <div>

                <div>

                    <div>
                        <h2>
                            Are you new? Sign up today
                        </h2>                        
                    </div>

                    <form onSubmit={onSubmitHandler} ref={form}>                   
                        <div>

                            <div>
                                <label htmlFor="email-address">
                                    Full name
                                </label>
                                <input
                                    label="user_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}                                    
                                    name="user_name"
                                    type="text"                                    
                                    required                                
                                    placeholder="First name"                                   
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input
                                    type="email"
                                    label="user_email"
                                    name="user_email"
                                    value={emailAdd}
                                    onChange={(e) => setEmailAdd(e.target.value)}                                    
                                    required
                                    placeholder="Email address"                                
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="message"
                                    label="Create password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}                                    
                                    required
                                    placeholder="Password"                                
                                />
                            </div>
                        </div>                        
                        <div>
                            <button type="submit" style={{marginTop: "20px"}}> Sign up </button>
                            
                        </div>                        
                    </form>
                    {/* <button onClick={sendPasswordToEmail}>send password to email</button> */}
                    <p className="text-sm text-white text-center">
                        Already have an account?{' '}
                        <NavLink to="/">Sign in</NavLink>
                    </p>
                </div>
            </div>
            
        </section>
      </main>
    </>
  );

}

export default RegisterApp;