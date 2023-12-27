import React from 'react';
import "./EditToFirestore.css";

import { useState } from "react";

// setDoc = update the whole document - even delete what we didn't change
import { doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';

const EditToFirestore = () => {

    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name ==='' || id === '') {
            return;
        }
        const docRef = doc(firestoreDB, 'resumes', id );
        updateDoc(docRef, {name}).then(response => {
            console.log(response);
        }).catch(error => {console.log(error);});
    }

  return (
    <div>
       <p className="styleLetters"> To Firestore</p>
       <form onSubmit={handleSubmit}>
        <label htmlFor="id">resume id</label>
        <input 
            type="text"
            id="id"
            value={id}
            onChange={event => setId(event.target.value)}
        />
        <br/>
        <label htmlFor="name">resume name</label>
        <input 
            type="text"
            id="name"
            value={name}
            onChange={event => setName(event.target.value)}
        />

        <button type="submit">edit resume id</button>
       </form>
    </div>
  );

};

export default ToFirestore;