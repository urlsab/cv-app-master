import React from 'react';
import './ResumeGrid.css';
import { useRef, useState, useEffect } from "react";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import { initialState } from "../../utils/ourState";
import { arrInitialState } from '../../utils/arrOurState';
import { arrIcons } from '../../utils/allIcons';

export const textType = "text";
const arrState = arrInitialState;
const icons = arrIcons;

// const resumeArticles = [' ','EDUCATION', 'CERTIFICATES', 'IMPORTANT LINKS', 'EXPERIENCE', 'SIDEPROJECTS', 'SKILLS']
// const arrClassName = ['name', 'photo', 'about', 'work', 'education', 'skills', 'community'];

const ResumeGrid = () => {

    const [ourForm, setOurForm] = useState(initialState);

    const [layoutSelection, setLayoutSelection] = useState({
        text: "A4",
        value: "size-a4"
      });

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
                        type={textType}
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

    const updatePageLayout = event => {
        setLayoutSelection(event.target.value);
      };
    
      const pdfExportComponent = useRef(null);
    
      const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
      };

    // 

    return (
            <div>
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
        </div>
    );
}

export default ResumeGrid;

        //const ourPDF = (
            //     <Document>
            //         <Page>
            //             <View style={{ 
            //                 padding: 0,
            //                 display: "flex",
            //                 flexDirection:"column",
            //                 alignItems: "start",
            //                 margin: "60px auto",
            //                 border: "2px solid gray",
            //                 backgroundColor: "white",
        
            //                 // max width and height to display without border or extra area
            //                 width: "596px",
            //                 height: "841px"
            //             }}>
        
            
            //                 <View style={{ display:"flex", flexDirection: "column" }}>
            
            //                     {/* EVERY GROUP STARTS A NEW LINE BY ORDER OF COLUMNS */}
            //                     <View style={{ display:"flex", flexDirection: "row" }}>
            //                         <View style={{ flex: 1 }}>
            //                         <Text>full name and role</Text>
            //                             <Text style={{display: "flex"}}>{ourForm.objectName.firstName}</Text>
            //                             <Text>{ourForm.objectName.lastName}</Text>
            //                             <Text>{ourForm.objectName.jobTitle}</Text>
            //                             <Text>{ourForm.objectName.age}</Text>
            //                             <Text>{ourForm.objectName.gender}</Text>
            //                         </View>
            //                         <View style={{ flex: 1 }}>
            //                             <Text>experience</Text>
            //                             <Text>{ourForm.objectName.experience}</Text>
            //                         </View>
            //                     </View>
            
            //                     <View style={{ display:"flex", flexDirection: "row" }}>
            //                         <View style={{ flex: 1 }}>
            //                             <Text>community</Text>
            //                             <Text>{ourForm.objectName.email}</Text>
            //                             <Text>{ourForm.objectName.phoneNumber}</Text>
            //                             <Text>{ourForm.objectName.linkedinLink}</Text>
            //                             <Text>{ourForm.objectName.githubLink}</Text>
            //                             <Text>{ourForm.objectName.facebookLink}</Text>
            //                             <Text>{ourForm.objectName.portfolioLink}</Text>
            //                         </View>
            //                         <View style={{ flex: 1 }}>
            //                             <Text>sideProjects</Text>
            //                             <Text>{ourForm.objectName.sideProjects}</Text>
            //                         </View>
            //                     </View>
            
            //                     <View style={{ display:"flex", flexDirection: "row" }}>
            //                         <View style={{ flex: 1 }}>
            //                             <Text>education</Text>
            //                             <Text>{ourForm.objectName.degree}</Text>
            //                             <Text>{ourForm.objectName.schoolName}</Text>
            //                             <Text>{ourForm.objectName.city}</Text>
            //                             <Text>{ourForm.objectName.country}</Text>
            //                             <Text>{ourForm.objectName.certificates}</Text>
            //                             <Text>{ourForm.objectName.gpa}</Text>
            //                             <Text>{ourForm.objectName.relevantCourses}</Text>
            //                         </View>
            //                         <View style={{ flex: 1 }}>
            //                             <Text>skills</Text>
            //                             <Text>{ourForm.objectName.skills}</Text>
            //                         </View>
            //                     </View>
            
            //                 </View>
            
                        
            //             </View>
            //         </Page>
            //     </Document>
            // );


            // return (
            //     <div>
            //         {/* {renderInputs()}
            // {ourPDF}
            // <PDFDownloadLink document={ourPDF} fileName="somename.pdf">
            //     {({ blob, url, loading, error }) =>
            //         loading ? 'Loading document...' : 'Download now!'
            //     }
            // </PDFDownloadLink> */}
            //     </div> 
            // );
            