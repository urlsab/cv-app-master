import './InputsForm.css';

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import SchoolIcon from '@mui/icons-material/School';

import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import PrintIcon from '@mui/icons-material/Print';

import TextField from '@mui/material/TextField';

import ReactToPrint from 'react-to-print';

import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';

import { firestoreDB, auth } from "../../firestoreConfig/firestoreConfig";
import { arrInitialState } from '../../utils/arrOurState';
import { initialState } from "../../utils/ourState";
import { useToggle } from "../../utils/useToggle";

import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Fade from 'react-reveal/Fade';

import DownloadIcon from '@mui/icons-material/Download';

import { arrIcons } from '../../utils/allIcons';

import Navbar from "../Navbar/Navbar";

const arrState = arrInitialState;

const InputsForm = () => {

    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    const [toggle, setToggle] = useToggle();

    const navigate = useNavigate();

    // const currentPassword = ourForm.objectName.userPassword;

    // maybe change to: useRef(null)
    const pdfExportComponent = useRef(null);
    
    const handleExportWithComponent = (data) => {
        pdfExportComponent.current.save();
        console.log(data);
        // console.log(fileName);
    };

    //add: refresh after submit - usenavigate-maybe
    //users/id/resumes/id/full object
    const handleAddResume = (event) => {
        
        // firestoreDB making auto uid for any document in hte user.email collection
        event.preventDefault();
        // `${user.email}` - cretes new collection with the use email name !!!
        const usersCollection = collection(firestoreDB, `${user.email}`);

            addDoc(usersCollection, ourForm.objectName)
            .then(response => {
                console.log(ourForm.objectName);
                console.log(response);
                //mayby: we use the path for each user id
                console.log(response.id);
                //mayby: we use the path for each user resumes
                console.log(response.path);
                navigate("/allResumes")
                
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
    };


    const renderInputs = () => {

        return (
            arrState.map((i)  =>
                (
                    <TextField
                        required="required"
                        key={i}
                        type="text"
                        name={i}
                        placeholder={i}
                        // maybe comment that - for long descriptions of work experience e.g.
                        maxLength={40}
                        value={ourForm.objectName[i]}
                        onChange={handleChange}
                        size="small"
                        
                        InputProps={{startAdornment: (
                            <InputAdornment position="start">
                                {arrIcons[i]}
                            </InputAdornment>
                        )}}  
                    />
                )
            )
        );   
    }

    return (

        <>
        
            <div className='createResumeContainer'>

                <Navbar/>

                    <div className='formInputContainer'>
                    
                        <Fade delay={800}>
                            <form className='inputsFieldsContainer' onSubmit={handleAddResume}>
                            
                                {renderInputs()}

                                <Button 
                                    startIcon={<SaveIcon/>}
                                    color="success"
                                    variant="contained"
                                    type="submit">Save Resume
                                </Button>

                            </form>
                        </Fade>

                    </div>

                    {toggle ? 

                        <Fade delay={400}>

                        <div className='showResumeStyle'>

                            <Button 
                                color="secondary"
                                variant="contained"
                                startIcon={<VisibilityOffIcon/>} 
                                onClick={setToggle}>Hide Resume
                            </Button>

                            {/* fileName='baba.pdf' */}
                            <PDFExport  ref={pdfExportComponent}>

                                <div ref={pdfExportComponent}>
                                    <main className="wrapper">

                                        <article className="resume">

                                            <section className="grid-area name">
                                                <b className="spaceInline">{ourForm.objectName.fullName}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.jobTitle}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.address}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.phoneNumber}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.githubLink}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.linkedinLink}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.email}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.portfolioLink}</b>
                                            </section>

                                            <section className="grid-area education">
                                                {ourForm.objectName.degreeTypeAndname ? <Fade delay={300}><h3><SchoolIcon sx={{mr:1, height:"15px", width:"15px"}}/>EDUCATION</h3></Fade> : null}    
                                                <b className='contentSpaces'>{ourForm.objectName.degreeTypeAndname}</b> 
                                                <b className='contentSpaces'>{ourForm.objectName.schoolNameAndlocation}</b> 
                                                <b className='contentSpaces'>{ourForm.objectName.timeLearnedDegree}</b>
                                                {/* <b className='contentSpaces'>{ourForm.objectName.gpa}</b> */}
                                                 
                                            </section>

                                            <section className='grid-area relevantCourses'>
                                            {ourForm.objectName.relevantCourses ? <Fade delay={300}><h5>RELEVANT COURSES</h5></Fade> : null}
                                                <b className='contentSpaces'>{ourForm.objectName.relevantCourses}</b>
                                            </section>

                                            <section className="grid-area work">
                                                {ourForm.objectName.position ? <Fade delay={300}><h3> WORK EXPERIENCE </h3></Fade> : null}  
                                                <b className='contentSpaces'>{ourForm.objectName.position}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.companyName}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.locationAndduration}</b>
                                                <b className='contentSpaces'>{ourForm.objectName.products}</b>      
                                            </section>

                                            <section className="grid-area sideProjects">
                                                {ourForm.objectName.projectName ? <Fade delay={300}><h3> SIDE PROJECTS </h3></Fade> : null}
                                                <b className='contentSpaces'>{ourForm.objectName.projectName}</b> 
                                                <b className='contentSpaces'>{ourForm.objectName.buildDuration}</b>  
                                                <b className='contentSpaces'>{ourForm.objectName.shortProjectDescription}</b>  
                                                <b className='contentSpaces'>{ourForm.objectName.techUsed}</b>  
                                                <b className='contentSpaces'>{ourForm.objectName.githubCodeLink}</b>    
                                            </section>

                                            <section className="grid-area skills">
                                                {ourForm.objectName.ProgrammingLanguages ? <Fade delay={300}><h3> SKILLS </h3></Fade> : null}
                                                {ourForm.objectName.ProgrammingLanguages ? <Fade delay={300}><b>Programming Languages: {ourForm.objectName.ProgrammingLanguages}</b></Fade> : null} 
                                                {ourForm.objectName.Databases ? <Fade delay={300}><b>Databases: {ourForm.objectName.Databases} </b></Fade> : null} 
                                                {ourForm.objectName.Frameworks ? <Fade delay={300}><b>Frameworks: {ourForm.objectName.Frameworks} </b></Fade> : null} 
                                                {ourForm.objectName.GeneralKnowledge ? <Fade delay={300}><b>General knowledge: {ourForm.objectName.GeneralKnowledge} </b></Fade> : null}   
                                            </section>

                                        </article>
                                    </main>
                                </div>

                            
                            </PDFExport>

                            <Fade delay={800}>
                                <div className='buttonsStyle'>

                                    {/* <a href='' download=''> DOWNLOAD TO PC </a> */}

                                    <Button 
                                        sx={{m:1}}
                                        color="error"
                                        variant="contained"
                                        // startIcon={<PictureAsPdfIcon/>}
                                        startIcon={<DownloadIcon/>}
                                        onClick={handleExportWithComponent}>pdf 
                                    </Button>

                                    <ReactToPrint 
                                        trigger={() => 
                                        <Button 
                                        sx={
                                            [{m:1, backgroundColor:"rgb(250, 204, 0)",
                                        },
                                        {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                    ]}
                                        variant="contained" 
                                        color="inherit"
                                        startIcon={<PrintIcon/>}>PRINT</Button>} 
                                        content={() => pdfExportComponent.current}/>
                                </div>
                            </Fade>
                            
                            

                        </div>

                        </Fade>
                        
                            : <Button 
                                color="warning"
                                variant="contained" 
                                startIcon={<VisibilityIcon/>}
                                onClick={setToggle}>Show Resume
                            </Button>
                        
                    }
                
            </div>

        </>

    );

}

export default InputsForm;