import React from "react";
import "./AddToFirestore.css";
import { useState } from "react";
import { addDoc ,collection } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

const AddToFirestore = () => {

    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name ===''){
            return;
        }
    }

    const cvCollection = collection(firestoreDB, 'resumes');
    // can also write only {name} becasue {name:name}
        addDoc(cvCollection, {name: name}).then(response => {
            console.log(response.id);
        }).catch(error => {
            console.log(error);
        alert(name)
    })
    
  return (
    <div>
       <p className="chars">Add To Firestore</p>
       <form onSubmit={handleSubmit}>
        <label htmlFor="name">resume name</label>
        <input 
            type="text"
            id="name"
            value={name}
            onChange={event => setName(event.target.value)}
        />
        <button type="submit">add resume name</button>
       </form>
    </div>
  );
}

export default AddToFirestore;