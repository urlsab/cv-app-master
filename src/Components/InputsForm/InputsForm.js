import './InputsForm.css';

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import SchoolIcon from '@mui/icons-material/School';

import WorkIcon from '@mui/icons-material/Work';

import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import PsychologyIcon from '@mui/icons-material/Psychology';

import PrintIcon from '@mui/icons-material/Print';

import MenuBookIcon from '@mui/icons-material/MenuBook';

import TextField from '@mui/material/TextField';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

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

    const [fullName, setFullname] = useState('');
    // const [text, setText] = useState('');
    // const [text, setText] = useState('');
    // const [text, setText] = useState('');
    // const [text, setText] = useState('');

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
                console.log("error from handleAddResume function");
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

    const renderTextFields = () => {
        return (
            arrState.map((i) =>
                <TextField
                    type="text"
                    name={i}
                    // label="Your Message"
                    required 
                    placeholder={i}
                    id="outlined-multiline-static"
                    multiline
                    
                    value={ourForm.objectName[i]}
                    // maxRows={3}
                    InputProps={{style: {fontSize:20, color:"black", fontFamily:"Itim", backgroundColor:"green"}}}
                    sx={{border: 'none',"& fieldset": { border: 'none' } }}
                    
                    onChange={handleChange.bind()} 
                    // rows={4}
                />
            )
        )
    }


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

                    {/* <div className='formInputContainer'>
                    
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

                    </div> */}

                    {/* {toggle ?  */}

                        <Fade delay={400}>

                        <div className='showResumeStyle'>

                            
                            <PDFExport  ref={pdfExportComponent}>

                                <div ref={pdfExportComponent}>

                                    <div className="resume">

                                        {/* {renderTextFields()} */}

                                         <div className="grid-area name">

                                            <div className='styleNameAndTitle'>
                                            
                                            <TextField
                                                type="text"
                                                name="fullName"
                                             
                                                required 
                                                placeholder='Full Name'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.fullName}
                                                
                                                InputProps={{style: {fontSize:26, color:"white", fontFamily:"Itim", height:"10px" ,width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }, }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            <TextField
                                                type="text"
                                                name="jobTitle"
                                                
                                                required 
                                                placeholder='Role Title'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.jobTitle}
                                                
                                                InputProps={{style: {fontSize:20, color:"white", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            </div>

                                            <div className='styleContactParagraph'>

                                            <TextField
                                                type="text"
                                                name="email"
                                                
                                                required 
                                                placeholder='email'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.email}
                                                
                                                InputProps={{style: {fontSize:15, color:"white", fontFamily:"Exo", height:"12px",padding:"9px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            <TextField
                                                type="text"
                                                name="phoneNumber"
                                                
                                                required 
                                                placeholder='phone number'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.phoneNumber}
                                                
                                                InputProps={{style: {fontSize:14, color:"white", fontFamily:"Exo", height:"11px",padding:"8px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            <TextField
                                                type="text"
                                                name="githubLink"
                                                
                                                required 
                                                placeholder='githubLink'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.githubLink}
                                                
                                                InputProps={{style: {fontSize:14, color:"white", fontFamily:"Exo", height:"11px",padding:"8px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            <TextField
                                                type="text"
                                                name="linkedinLink"
                                                
                                                required 
                                                placeholder='linkedinLink'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.linkedinLink}
                                                
                                                InputProps={{style: {fontSize:14, color:"white", fontFamily:"Exo", height:"11px",padding:"8px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            
                                            <TextField
                                                type="text"
                                                name="portfolioLink"
                                                
                                                required 
                                                placeholder='portfolioLink'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.portfolioLink}
                                                
                                                InputProps={{style: {fontSize:14, color:"white", fontFamily:"Exo", height:"11px",padding:"8px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            </div>

                                            
                                            {/* <div className='contactStyle'> */}
                                                
                                                {/* <b >{ourForm.objectName.githubLink}</b>
                                                <b >{ourForm.objectName.linkedinLink}</b>
                                                <b >{ourForm.objectName.email}</b>
                                                <b >{ourForm.objectName.portfolioLink}</b> */}
                                            {/* </div> */}
                                            
                                        </div>

                                        <div className="grid-area education">
                                            {ourForm.objectName.degreeTypeAndname ? <Fade delay={300}><h5 style={{marginLeft:"30px"}}><SchoolIcon sx={{mr:1, height:"15px", width:"15px"}} /> EDUCATION</h5></Fade> : null}   
                                            <div style={{marginLeft:"30px"}}>
                                                <b className='contentSpaces'>{ourForm.objectName.degreeTypeAndname}</b> 
                                                <b className='contentSpaces'>{ourForm.objectName.schoolNameAndlocation}</b> 
                                                <b className='contentSpaces'>{ourForm.objectName.timeLearnedDegree}</b>
                                                
                                            </div> 

                                                
                                        </div>

                                        <div className='grid-area relevantCourses'>
                                        {ourForm.objectName.relevantCourses ? <Fade delay={300}><h6 style={{marginLeft:"30px"}}> <MenuBookIcon sx={{mr:1, height:"15px", width:"15px"}} /> RELEVANT COURSES</h6></Fade> : null}
                                            <div style={{marginLeft:"30px"}}>
                                                <b className='contentSpaces'>{ourForm.objectName.relevantCourses}</b>
                                            </div>
                                        </div>

                                        <div className="grid-area work">
                                            {ourForm.objectName.position ? <Fade delay={300}><h5> <WorkIcon sx={{mr:1, height:"15px", width:"15px"}} /> WORK EXPERIENCE </h5></Fade> : null}  
                                            <b className='contentSpaces'>{ourForm.objectName.position}</b>
                                            <b className='contentSpaces'>{ourForm.objectName.companyName}</b>
                                            <b className='contentSpaces'>{ourForm.objectName.locationAndDuration}</b>
                                            <b className='contentSpaces'>{ourForm.objectName.products}</b>      
                                        </div>

                                        <div className="grid-area sideProjects">
                                            {ourForm.objectName.projectName ? <Fade delay={300}><h5> <AppRegistrationIcon sx={{mr:1, height:"15px", width:"15px"}} /> SIDE PROJECTS </h5></Fade> : null}
                                            <b className='contentSpaces'>{ourForm.objectName.projectName}</b> 
                                            <b className='contentSpaces'>{ourForm.objectName.buildDuration}</b>  
                                            <b className='contentSpaces'>{ourForm.objectName.shortProjectDescription}</b>  
                                            <b className='contentSpaces'>{ourForm.objectName.techUsed}</b>  
                                            <b className='contentSpaces'>{ourForm.objectName.githubCodeLink}</b>    
                                        </div>

                                        <div className="grid-area skills">
                                            {ourForm.objectName.ProgrammingLanguages ? <Fade delay={300}><h5><PsychologyIcon sx={{mr:1, height:"15px", width:"15px"}}/> SKILLS </h5><Fade delay={600}>  <b style={{fontSize:"13px"}}>Programming Languages: {ourForm.objectName.ProgrammingLanguages}</b> </Fade> </Fade> : null}
                                            <div className='skillsHeadersStyle'>
                                              
                                                {ourForm.objectName.Databases ? <Fade delay={300}><b style={{fontSize:"13px"}}>Databases: {ourForm.objectName.Databases} </b></Fade> : null} 
                                                {ourForm.objectName.Frameworks ? <Fade delay={300}><b style={{fontSize:"13px"}}>Frameworks: {ourForm.objectName.Frameworks} </b></Fade> : null} 
                                                {ourForm.objectName.GeneralKnowledge ? <Fade delay={300}><b style={{fontSize:"13px"}}>General knowledge: {ourForm.objectName.GeneralKnowledge} </b></Fade> : null} 
                                            </div>
                                              
                                        </div> 

                                    </div> 

                                </div>

                            
                            </PDFExport>

                            <Fade delay={800}>
                                <div className='buttonsStyle'>

                                    {/* <a href='' download=''> DOWNLOAD TO PC </a> */}

                                    <Button 
                                        sx={{m:1, mt:4}}
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
                                                    [{m:1,mt:4, backgroundColor:"rgb(250, 204, 0)",
                                                },
                                                {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                            ]}
                                                variant="contained" 
                                                color="inherit"
                                                startIcon={<PrintIcon/>}>PRINT
                                        </Button>
                                        } 
                                        content={() => pdfExportComponent.current}
                                    />

                                <Button 
                                    startIcon={<SaveIcon/>}
                                    color="success"
                                    variant="contained"
                                    sx={{m:1, mt: 4}}
                                    onClick={handleAddResume}>Save Resume
                                </Button>

                                </div>

                            </Fade>
                            
                        </div>

                        </Fade>
                        
                            {/* : <Button 
                                color="warning"
                                variant="contained" 
                                startIcon={<VisibilityIcon/>}
                                onClick={setToggle}>Show Resume
                            </Button> */}
                        
                    {/* } */}
                
            </div>

        </>

    );

}

export default InputsForm;