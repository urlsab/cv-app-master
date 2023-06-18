import './InputsForm.css';

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import Todo from '../Todo/Todo';

import PrintIcon from '@mui/icons-material/Print';

import TextField from '@mui/material/TextField';

import ReactToPrint from 'react-to-print';

import { firestoreDB, auth } from "../../firestoreConfig/firestoreConfig";
import { arrInitialState } from '../../utils/arrOurState';
import { initialState } from "../../utils/ourState";
import { useToggle } from "../../utils/useToggle";

import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import Fade from 'react-reveal/Fade';

import DownloadIcon from '@mui/icons-material/Download';

import Navbar from "../Navbar/Navbar";

const arrState = arrInitialState;

const InputsForm = () => {

    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    const [toggle, setToggle] = useToggle();

    const [fullName, setFullname] = useState('');

    const navigate = useNavigate();

    const pdfExportComponent = useRef(null);
    
    const handleExportWithComponent = (data) => {
        pdfExportComponent.current.save();
        console.log(data);
    };

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

    return (

        <>
        
            <div className='createResumeContainer'>

                <Navbar/>


                    {/* {toggle ?  */}

                        <Fade delay={400}>

                        <div className='showResumeStyle'>

                            <PDFExport ref={pdfExportComponent}>

                                <div ref={pdfExportComponent}>

                                    <div className="resume">

                                        <div className='styleNameAndTitle'>

                                            
                                                                                                                               
                                            <TextField
                                                type="text"
                                                name="fullName"
                                             
                                                required 
                                                placeholder='Full Name'
                                                id="outlined-multiline-flexible"
                                                multiline
                                                rows={2}
                                                // onClick={addSection}
                                                value={ourForm.objectName.fullName.toUpperCase()}
                                                inputProps={{maxLength:30}}
                                                InputProps={{style: {fontSize:18, color:"black", fontFamily:"Itim", height:"10px" ,width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }, display:"block" }}
                                                
                                                 // .bind() for use the code of onchange also here
                                                onChange={handleChange.bind()} 
                                                
                                            />

                                            {/* <p>
                                                
                                                <span className="textarea" role="textbox" contentEditable="true"></span>
                                            </p> */}

                                            {/* <TextField
                                                type="text"
                                                name="jobTitle"
                                                
                                                required 
                                                placeholder='Role Title'
                                                id="outlined-multiline-flexible"
                                                multiline
                                                inputProps={{maxLength:20}}
                                                
                                                value={ourForm.objectName.jobTitle.toUpperCase()}
                                                
                                                InputProps={{style: {fontSize:19, color:"black", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }, display:"block", mt:1  }}
                                                
                                               
                                                onChange={handleChange.bind()} 
                                                
                                            /> */}

                                            </div>

                                            {/* <div className='styleContactParagraph'> */}

                                            {/* <TextField
                                                type="text"
                                                name="email"
                                                
                                                required 
                                                placeholder='email'
                                                id="outlined-multiline-static"
                                                multiline
                                                
                                                value={ourForm.objectName.email}
                                                inputProps={{maxLength:27}}
                                                InputProps={{style: {fontSize:16, color:"black", fontFamily:"Exo", height:"12px",padding:"9px", width:"7cm"}}}
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
                                                inputProps={{maxLength:18}}
                                                value={ourForm.objectName.phoneNumber}
                                                
                                                InputProps={{style: {fontSize:16, color:"black", fontFamily:"Exo", height:"11px",padding:"8px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }, mt:0.5 }}
                                                
                                                onChange={handleChange.bind()} 
                                                
                                            /> */}

                                           {/* </div> */}

                                            

                                            {/* <h5 style={{marginLeft:"10px"}}><SchoolIcon sx={{mr:1, height:"15px", width:"15px"}} /> EDUCATION</h5> */}
                                                                                
                                        

                                        

                                            <div className="grid-area work">
                                            <h5> <WorkIcon sx={{mr:1, height:"15px", width:"15px"}} /> WORK EXPERIENCE </h5>
                                            <Todo/>
                                            
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
                
            </div>

        </>

    );

}

export default InputsForm;    