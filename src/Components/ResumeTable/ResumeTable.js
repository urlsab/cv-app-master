import React from "react";
import './ResumeTable.css';

import { useState } from "react";
// import { initialState } from "../../utils/ourState";
import { cvCollection } from "../../firestoreConfig/firestoreConfig";
import { getDocs } from "firebase/firestore";
import { useToggle } from "../../utils/useToggle";

const ResumeTable = () => {

    // const [ourForm, setOurForm] = useState(initialState);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setOurForm(prevState => ({
    //         objectName: {
    //             ...prevState.objectName,
    //             [name]: value
    //         },
    //     }));
    // };

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();

    // fix: show whole resume object
    const getCv = () => {
        getDocs(cvCollection).then(response => {
            const displayResumes = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setCv(displayResumes);
        })
        .catch(error => console.log(error));
    }

    return (
        
        <div>
            <button onClick={setToggle}>toggle it</button>
            {toggle ? 
            
            
            <main className="wrapper">
                
                <article className="resume">

                    <section className="grid-area name">
                    <h4>NAME</h4> 
                        <b className="spaceInline"></b>
                        <b className='spaceIline'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                    </section>

                    <section className="grid-area about">
                    <h4>ABOUT</h4>
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>    
                    </section>

                    <section className="grid-area community">
                    <h4>COMMUNITY</h4>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b> 
                    </section>

                    <section className="grid-area education">
                        <h3>EDUCATION</h3>
                        <b className='contentSpaces'></b>
                    </section>

                    <section className="grid-area work">
                        <h4>EXPERIENCE</h4>   
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>    
                    </section>

                    <section className="grid-area photo">
                        <h4>SIDEPROJECT</h4> 
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b> 
                    </section>

                    <section className="grid-area skills">
                    <h4>SKILLS</h4>
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b>   
                    </section>
            
                </article>
            </main>
            : null}
        </div>
    );
}

export default ResumeTable;