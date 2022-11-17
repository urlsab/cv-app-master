import React, { useState } from "react";
import "./AllResumes.css";

import { getDocs } from "firebase/firestore";
import { cvCollection } from "../../firestoreConfig/firestoreConfig";

import { useToggle } from "../../utils/useToggle";

const ResumeFirestore = () => {

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();

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

  // maybe: delete that
  //   useEffect(() => {
  //     getCv();
  // }, [])

  return (
      <div>
        <p className="letters">All Resumes users made</p>
        <button onClick={() => getCv()}>Show All Resumes</button>
        <ol>
         {cv.map(showCv => 
           <li key={showCv.id}> 

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
           </li> 
          )}
        </ol>
      </div>
  );
}

export default ResumeFirestore;