import React, { useState, useRef } from "react";
import "./AllResumes.css";

import { collection, getDocs } from "firebase/firestore";
import { cvCollection } from "../../firestoreConfig/firestoreConfig";
import { usersCollection } from "../../firestoreConfig/firestoreConfig";

import { useToggle } from "../../utils/useToggle";
import { PDFExport } from "@progress/kendo-react-pdf";
import Navbar from "../Navbar/Navbar";

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firestoreConfig/firestoreConfig";

const AllResumes = () => {

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();
    const [user, loading, error] = useAuthState(auth);

    // maybe change to: useRef(null)
    const pdfExportComponent = useRef();
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    const getCv = () => {
        const privateCollection = collection(firestoreDB, `${user.email}` )
        getDocs(privateCollection).then(response => {
            const displayResumes = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setCv(displayResumes);
        })
        .catch(error => console.log(error));
    }

  // maybe: delete that
  //   useEffect(() => {
  //     getCv();
  // }, [])

  return (
      <div>

        <Navbar/>
        <p className="letters">All Resumes users made</p>

        {/* <button onClick={() => getCv()}>Show All Resumes</button> */}

        {toggle ?
        
        <div>
            <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}}  
                onClick={setToggle}>Hide My Resumes
            </button>

        <ol>
         {cv.map(showCv => 
           <li key={showCv.id}> 

            <PDFExport ref={pdfExportComponent}>
              <div>
                 <main className="wrapper">
                  
                  <article className="resume">

                      <section className="grid-area name">
                      <h4>NAME</h4> 
                          <b className="spaceInline">{showCv.data.firstName}</b>
                          <b className='spaceIline'>{showCv.data.lastName}</b>
                          <b className='contentSpaces'>{showCv.data.email}</b>
                          <b className='contentSpaces'>{showCv.data.age}</b>
                      </section>

                      <section className="grid-area about">
                      <h4>ABOUT</h4>
                          <b className='contentSpaces'>{showCv.data.country}</b> 
                          <b className='contentSpaces'>{showCv.data.city}</b>
                          <b className='contentSpaces'>{showCv.data.phoneNumber}</b>    
                      </section>

                      <section className="grid-area community">
                      <h4>COMMUNITY</h4>
                          <b className='contentSpaces'>{showCv.data.jobTitle}</b>
                          <b className='contentSpaces'>{showCv.data.linkedinLink}</b>
                          <b className='contentSpaces'>{showCv.data.facebookLink}</b>
                          <b className='contentSpaces'>{showCv.data.portfolioLink}</b>
                          <b className='contentSpaces'>{showCv.data.githubLink}</b>
                          <b className='contentSpaces'>{showCv.data.experience}</b> 
                      </section>

                      <section className="grid-area education">
                          <h3>EDUCATION</h3>
                          <b className='contentSpaces'>{showCv.data.sideProjects}</b>
                      </section>

                      <section className="grid-area work">
                          <h4>EXPERIENCE</h4>   
                          <b className='contentSpaces'>{showCv.data.skills}</b>
                          <b className='contentSpaces'>{showCv.data.schoolName}</b>    
                      </section>

                      <section className="grid-area photo">
                          <h4>SIDEPROJECT</h4> 
                          <b className='contentSpaces'>{showCv.data.relevantCourses}</b> 
                          <b className='contentSpaces'>{showCv.data.degree}</b> 
                          <b className='contentSpaces'>{showCv.data.gpa}</b> 
                      </section>

                      <section className="grid-area skills">
                      <h4>SKILLS</h4>
                          <b className='contentSpaces'>{showCv.data.certificates}</b> 
                          <b className='contentSpaces'>{showCv.data.gender}</b>   
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
           </li> 
          )}
        </ol>

    </div>

        : <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}}  
                onClick={ ()=> {setToggle(); getCv();}}>Show My Resumes
        </button>}

      </div>
  );
}

export default AllResumes;