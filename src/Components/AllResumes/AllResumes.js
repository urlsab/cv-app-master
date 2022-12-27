import React, { useState, useRef } from "react";
import "./AllResumes.css";

import { collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { useToggle } from "../../utils/useToggle";
import { createRandomId } from "../../utils/randomId";
import { PDFExport } from "@progress/kendo-react-pdf";
import Navbar from "../Navbar/Navbar";

import { useNavigate } from "react-router-dom";

// import { initialState } from "../../utils/ourState";

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firestoreConfig/firestoreConfig";
import { pdf } from "@progress/kendo-drawing";

const AllResumes = () => {

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();
    
    const [user] = useAuthState(auth);
    // maybe add: , loading, error

    const navigate = useNavigate();

    // maybe change to: useRef(null)
    const pdfExportComponent = useRef();
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    const handleEditResume = (id) => {
        updateDoc(doc(firestoreDB,`${user.email}`, id ), {age:16})
}

    const handleDeleteDoc = (id) => {
        // const privateCollection = collection(firestoreDB, `${user.email}` );
        deleteDoc(doc(firestoreDB,`${user.email}`, id )).then(response => {
            console.log("successfully deleted");
            // make: delete from screen immediately without refresh page
            //reload page - and see how the resume deleted from screen
            window.location.reload(false);
        })
        .catch(error => console.log(error)); 
    }

    const getCv = async () => {

        const privateCollection = collection(firestoreDB, `${user.email}` );

        await getDocs(privateCollection).then(response => {
            
            const displayResumes = response.docs.map(doc => ({
                info: doc.data(),
                id: doc.id,
                key: doc.id
            })) 
            setCv(displayResumes);
            console.log("successfully set all cv's");
            // render that as a components in map !
            // console.log(displayResumes[1].info);
            // console.log(`the age value is ${displayResumes[1].info.age}` );
            
        })
        .catch(error => console.log(error)); 
    }

    // const createRefsSize = () => {
        // console.log(cv.length);
        let arrRefs = [];
        arrRefs.length = cv.length;
        console.log(`arrRefs length is ${arrRefs.length}`);

        // const pushRefs = () => {
        //     for (let i = 0; i < arrRefs.length; i++) {
        //         arrRefs.push(pdfExportComponent);
        //     }  
        // }
    // }

    const renderFake = () => {

        // pushRefs();

        return (
            <div>          
                <ol> 
                {/* el = cv[i] */}
                    {
                        cv.map((el, i) => 
                        
                            <li key={el.id}>
                                <PDFExport key={cv[i]} ref={pdfExportComponent}>
                                    <p>{cv[i].info.age}</p>
                                {/* <main className="wrapper">
                                
                                <article className="resume">

                                    <section className="grid-area name">
                                    <h4>NAME</h4> 
                                        <b className="spaceInline">{cv[i].info.firstName}</b>
                                        <b className='spaceIline'>{cv[i].info.firstName}</b>
                                        <b className='contentSpaces'>{cv[i].info.email}</b>
                                        <b className='contentSpaces'>{cv[i].info.age}</b>
                                    </section>

                                    <section className="grid-area about">
                                    <h4>ABOUT</h4>
                                        <b className='contentSpaces'>{cv[i].info.country}</b> 
                                        <b className='contentSpaces'>{cv[i].info.city}</b>
                                        <b className='contentSpaces'>{cv[i].info.phoneNumber}</b>    
                                    </section>

                                    <section className="grid-area community">
                                    <h4>COMMUNITY</h4>
                                        <b className='contentSpaces'>{cv[i].info.jobTitle}</b>
                                        <b className='contentSpaces'>{cv[i].info.linkedinLink}</b>
                                        <b className='contentSpaces'>{cv[i].info.facebookLink}</b>
                                        <b className='contentSpaces'>{cv[i].info.portfolioLink}</b>
                                        <b className='contentSpaces'>{cv[i].info.githubLink}</b>
                                        <b className='contentSpaces'>{cv[i].info.experience}</b> 
                                    </section>

                                    <section className="grid-area education">
                                        <h3>EDUCATION</h3>
                                        <b className='contentSpaces'>{cv[i].info.sideProjects}</b>
                                    </section>

                                    <section className="grid-area work">
                                        <h4>EXPERIENCE</h4>   
                                        <b className='contentSpaces'>{cv[i].info.skills}</b>
                                        <b className='contentSpaces'>{cv[i].info.schoolName}</b>    
                                    </section>

                                    <section className="grid-area photo">
                                        <h4>SIDEPROJECT</h4> 
                                        <b className='contentSpaces'>{cv[i].info.revantCourses}</b> 
                                        <b className='contentSpaces'>{cv[i].info.degree}</b> 
                                        <b className='contentSpaces'>{cv[i].info.gpa}</b> 
                                    </section>

                                    <section className="grid-area skills">
                                    <h4>SKILLS</h4>
                                        <b className='contentSpaces'>{cv[i].info.certificates}</b> 
                                        <b className='contentSpaces'>{cv[i].info.gender}</b>   
                                    </section>
                                </article>
                                </main> */}
                                </PDFExport>

                                <button 
                                    style={{margin:"10px 20px 10px 20px", 
                                    padding: "2px", width:"70px", height:"40px"}} 
                                    onClick={ () => { handleExportWithComponent(); }}>Export to pdf 
                                </button>
                                
                                <button
                                    style={{margin:"10px 20px 10px 20px", 
                                    padding: "2px", width:"70px", height:"40px"}} 
                                    onClick={ () => { handleDeleteDoc(el.id); }}>Delet this resume
                                </button>

                                <button
                                    style={{margin:"10px 20px 10px 20px", 
                                    padding: "2px", width:"70px", height:"40px"}} 
                                    onClick={ () => { handleEditResume(el.id); }}>edit this resume
                                </button>

                            </li>        
                        ) 
                    }
                </ol>
    </div>
    )         
}
        


  // maybe: replace that with the getcv that inisde onclick button bcv[i]ow
  //   useEffect(() => {
  //     getCv();
  // }, [])

  return (
      <div>

{/* {goodBye()} */}

        <Navbar/>

        <p className="letters">All Resumes users made</p>

        {/* {runFuncs()} */}

        {toggle ?
        
        <div>

            <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}}  
                onClick={ () => { setToggle(); } }>Hide My Resumes
            </button>

            
            {renderFake()}

        </div>

            : <button 
                    style={{margin:"10px 20px 10px 20px", 
                    padding: "2px", width:"70px", height:"40px"}}  
                    onClick={ () => { setToggle(); getCv(); } }>Show My Resumes
            </button>
    }

      </div>
  );
}

export default AllResumes;

/*

   
            cv.map(showCv => (
                <div>
                <li key={showCv.id}> 

                <PDFExport ref={pdfExportComponent}>
                 <main className="wrapper">
                  
                  <article className="resume">

                      <section className="grid-area name">
                      <h4>NAME</h4> 
                          <b className="spaceInline">{privateCollection.id}</b>
                          <b className='spaceIline'>{cv[i].info.lastName}</b>
                          <b className='contentSpaces'>{cv[i].info.email}</b>
                          <b className='contentSpaces'>{cv[i].info.age}</b>
                      </section>

                      <section className="grid-area about">
                      <h4>ABOUT</h4>
                          <b className='contentSpaces'>{cv[i].info.country}</b> 
                          <b className='contentSpaces'>{cv[i].info.city}</b>
                          <b className='contentSpaces'>{cv[i].info.phoneNumber}</b>    
                      </section>

                      <section className="grid-area community">
                      <h4>COMMUNITY</h4>
                          <b className='contentSpaces'>{cv[i].info.jobTitle}</b>
                          <b className='contentSpaces'>{cv[i].info.linkedinLink}</b>
                          <b className='contentSpaces'>{cv[i].info.facebookLink}</b>
                          <b className='contentSpaces'>{cv[i].info.portfolioLink}</b>
                          <b className='contentSpaces'>{cv[i].info.githubLink}</b>
                          <b className='contentSpaces'>{cv[i].info.experience}</b> 
                      </section>

                      <section className="grid-area education">
                          <h3>EDUCATION</h3>
                          <b className='contentSpaces'>{cv[i].info.sideProjects}</b>
                      </section>

                      <section className="grid-area work">
                          <h4>EXPERIENCE</h4>   
                          <b className='contentSpaces'>{cv[i].info.skills}</b>
                          <b className='contentSpaces'>{cv[i].info.schoolName}</b>    
                      </section>

                      <section className="grid-area photo">
                          <h4>SIDEPROJECT</h4> 
                          <b className='contentSpaces'>{cv[i].info.rcv[i]evantCourses}</b> 
                          <b className='contentSpaces'>{cv[i].info.degree}</b> 
                          <b className='contentSpaces'>{cv[i].info.gpa}</b> 
                      </section>

                      <section className="grid-area skills">
                      <h4>SKILLS</h4>
                          <b className='contentSpaces'>{cv[i].info.certificates}</b> 
                          <b className='contentSpaces'>{cv[i].info.gender}</b>   
                      </section>
                  </article>
                 </main>
                 </PDFExport> 
                 <button 
                style={{margin:"10px 20px 10px 20px", 
                padding: "2px", width:"70px", height:"40px"}} 
                onClick={handleExportWithComponent}>Export to pdf 
            </button>
                 </li>
              </div>
            
            ))

            */