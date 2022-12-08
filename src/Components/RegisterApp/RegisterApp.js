import "./RegisterApp.css";

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

import { auth } from "../../firestoreConfig/firestoreConfig"
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

import { initialPassword } from "../../utils/passwordsObject";

const RegisterApp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigate = useNavigate();

  const onSubmitHandler = async (e) => {

    e.preventDefault();
    
    await createUserWithEmailAndPassword(auth, emailAdd, rePassword)

    // hash of "hesed2emet1" = 'UkVEQUNURUQ=' , UkVEQUNURUQ=
      .then((userCredential) => {
          const userData = userCredential.user;
          console.log(auth);
          console.log(userData);
          console.log(`the user password is: ${rePassword}`);
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
          navigate("/");
      }).catch(error => {
          console.log(error);
  })
}

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

                    <form onSubmit={onSubmitHandler}>                   
                        <div>

                            <div>
                                <label htmlFor="email-address">
                                    First name
                                </label>
                                <input
                                    label="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}                                    
                                    name="firstname"
                                    type="text"                                    
                                    required                                
                                    placeholder="First name"                                   
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address">
                                    Last name
                                </label>
                                <input
                                    label="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}                                    
                                    required
                                    type="text"
                                    name="lastname"                                                                       
                                    placeholder="Last name"                                    
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
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
                                    label="Create password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}                                    
                                    required
                                    placeholder="Password"                                
                                />
                            </div>
                        </div>                        
                        <div>
                            <button type="submit"> Sign up </button>
                        </div>                        
                    </form>
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