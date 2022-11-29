import React, { useState, useRef } from "react";
import './InputsForm.css';

import { addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firestoreConfig/firestoreConfig";
import { collection } from "firebase/firestore";
import { PDFExport } from "@progress/kendo-react-pdf";

import { arrInitialState } from '../../utils/arrOurState';
import { initialState } from "../../utils/ourState";
import { useToggle } from "../../utils/useToggle";
import Navbar from "../Navbar/Navbar";

// import PdfResume from "../PdfResume/PdfResume";

const arrState = arrInitialState;

const InputsForm = () => {

    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    const [toggle, setToggle] = useToggle();

    // maybe change to: useRef(null)
    const pdfExportComponent = useRef();
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    //add: refresh after submit - usenavigate-maybe
    //users/id/resumes/id/full object
    const handleAddResume = (event) => {
        
        // firestoreDB making auto id for any object
        event.preventDefault();
        // `${user.email}` - cretes new collection with the use email name !!!
        const usersCollection = collection(firestoreDB, `${user.email}`);
            addDoc(usersCollection, ourForm.objectName).then(response => {
                console.log(ourForm.objectName);
                console.log(response);
                //mayby: we use the path for each user id
                console.log(response.id);
                //mayby: we use the path for each user resumes
                console.log(response.path);
                
            }).catch(error => {
                console.log(error);
        })
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOurForm(prevState => ({
            objectName: {
                ...prevState.objectName,
                [name]: value
            },
        }))
        // maybe add: return something
    };

    const renderInputs = () => {

        return (
            arrState.map(i =>
                (
                    <input
                        required="required"
                        key={i}
                        type="text"
                        name={i}
                        placeholder={i}
                        maxLength={40}
                        value={ourForm.objectName[i]}
                        onChange={handleChange}
                        style={{width:"150px"}}
                    />
                )
            )
        );   
    }

    return (
        <div style={{margin:"auto 30px"}}>
            <Navbar/>
            <form onSubmit={handleAddResume}>
            <br/>

            {renderInputs()}

            <br/>
            <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}} 
                type="submit">Save Resume
            </button>
            </form>

            <br/>
            
        {toggle ? 
        <div>
            <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}}  
                onClick={setToggle}>Hide Resume
            </button>
            <PDFExport ref={pdfExportComponent}>
                <div>
                    <main className="wrapper">
                        
                        <article className="resume">

                            <section className="grid-area name">
                            <h4>NAME</h4> 
                                <b className="spaceInline">{ourForm.objectName.firstName}</b>
                                <b className='spaceIline'>{ourForm.objectName.lastName}</b>
                                <b className='contentSpaces'>{ourForm.objectName.email}</b>
                                <b className='contentSpaces'>{ourForm.objectName.age}</b>
                            </section>

                            <section className="grid-area about">
                            <h4>ABOUT</h4>
                                <b className='contentSpaces'>{ourForm.objectName.country}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.city}</b>
                                <b className='contentSpaces'>{ourForm.objectName.phoneNumber}</b>    
                            </section>

                            <section className="grid-area community">
                            <h4>COMMUNITY</h4>
                                <b className='contentSpaces'>{ourForm.objectName.jobTitle}</b>
                                <b className='contentSpaces'>{ourForm.objectName.linkedinLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.facebookLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.portfolioLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.githubLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.experience}</b> 
                            </section>

                            <section className="grid-area education">
                                <h3>EDUCATION</h3>
                                <b className='contentSpaces'>{ourForm.objectName.sideProjects}</b>
                            </section>

                            <section className="grid-area work">
                                <h4>EXPERIENCE</h4>   
                                <b className='contentSpaces'>{ourForm.objectName.skills}</b>
                                <b className='contentSpaces'>{ourForm.objectName.schoolName}</b>    
                            </section>

                            <section className="grid-area photo">
                                <h4>SIDEPROJECT</h4> 
                                <b className='contentSpaces'>{ourForm.objectName.relevantCourses}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.degree}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.gpa}</b> 
                            </section>

                            <section className="grid-area skills">
                            <h4>SKILLS</h4>
                                <b className='contentSpaces'>{ourForm.objectName.certificates}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.gender}</b>   
                            </section>
                        </article>
                    </main>
                </div>
            </PDFExport>
            <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}} 
                onClick={handleExportWithComponent}>Export to pdf 
            </button>
        </div>
        
            : <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}}  
                onClick={setToggle}>Show Resume
            </button>}
            
    </div>
    );

}

export default InputsForm;