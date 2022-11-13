import React from "react";
import "./AddResume.css";
import { useState, useRef } from "react";
import { addDoc ,collection } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { PDFExport } from "@progress/kendo-react-pdf";

import { initialState } from "../../utils/ourState";
import { arrInitialState } from '../../utils/arrOurState';
import { arrIcons } from '../../utils/allIcons';
import axios from "axios";
import { createRandomId } from "../../utils/randomId";


export const textType = "text";
const arrState = arrInitialState;
const icons = arrIcons;
const cvCollection = collection(firestoreDB, 'resumes');

const AddResume = () => {

    const [ourForm, setOurForm] = useState(initialState);

    const addResume = () => { 
        addDoc(cvCollection, {name: ourForm.objectName.firstName }).then(response => {
            console.log(response.id);
        }).catch(error => {
            console.log(error);
    })
}
;

    const handleSubmit = (event) => {
        event.preventDefault();
        if(ourForm ===''){
            return;
        }
        else {
            addResume();
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOurForm(prevState => ({
            objectName: {
                ...prevState.objectName,
                [name]: value
            },
        }));
    };

    const renderInputs = () => {
        return (
            arrState.map(i =>
                (
                    <input
                        key={i}
                        type="text"
                        name={i}
                        placeholder={i}
                        value={ourForm.objectName[i]}
                        maxLength={40}
                        onChange={handleChange}
                    />
                )
            )
        );   
    }

    const pdfExportComponent = useRef(null);
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    
    
  return (
    <div>
       <p className="chars">Add To Firestore</p>
       <form onSubmit={handleSubmit}>
        {renderInputs()}
        <PDFExport ref={pdfExportComponent}>
            <main className="wrapper">
                
                        <article className="resume">

                            <section className="grid-area name">
                            <h4>NAME</h4> 
                                {icons[0]}
                                <b className="spaceInline">{ourForm.objectName.firstName}</b>
                                <b className='spaceIline'>{ourForm.objectName.lastName}</b>
                                <b className='contentSpaces'>{ourForm.objectName.age}</b>
                                <b className='contentSpaces'>{ourForm.objectName.jobTitle}</b>
                            </section>

                            <section className="grid-area about">
                            <h4>ABOUT</h4>
                                <b className='contentSpaces'>{ourForm.objectName.skills}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.degree}</b>
                                <b className='contentSpaces'>{ourForm.objectName.gender}</b>    
                            </section>

                            <section className="grid-area community">
                            <h4>COMMUNITY</h4>
                                <b className='contentSpaces'>{ourForm.objectName.phoneNumber}</b>
                                <b className='contentSpaces'>{ourForm.objectName.email}</b>
                                <b className='contentSpaces'>{ourForm.objectName.linkedinLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.githubLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.portfolioLink}</b>
                                <b className='contentSpaces'>{ourForm.objectName.facebookLink}</b> 
                            </section>

                            <section className="grid-area education">
                                <h3>EDUCATION</h3>
                                <b className='contentSpaces'>{ourForm.objectName.schoolName}</b>
                            </section>

                            <section className="grid-area work">
                                <h4>EXPERIENCE</h4>   
                                <b className='contentSpaces'>{ourForm.objectName.country}</b>
                                <b className='contentSpaces'>{ourForm.objectName.city}</b>    
                            </section>

                            <section className="grid-area photo">
                                <h4>SIDEPROJECT</h4> 
                                <b className='contentSpaces'>{ourForm.objectName.relevantCourses}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.experience}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.certificates}</b> 
                            </section>

                            <section className="grid-area skills">
                            <h4>SKILLS</h4>
                                <b className='contentSpaces'>{ourForm.objectName.sideProjects}</b> 
                                <b className='contentSpaces'>{ourForm.objectName.gpa}</b>   
                            </section>
                    
                        </article>
                    </main>
                </PDFExport>
                <button onClick={handleExportWithComponent}>Export to pdf </button>
        <button type="submit">Save Resume</button>
       </form>
    </div>
  );
}

export default AddResume;