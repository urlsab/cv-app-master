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
    const [text, setText] = useState('');

    const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed'}]);

    const [fullName, setFullname] = useState('');

    const navigate = useNavigate();

    const pdfExportComponent = useRef(null);
    
    const handleExportWithComponent = (data) => {
        pdfExportComponent.current.save();
        console.log(data);
    };

    const handleKeyPress = (event, index) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          setText((prevText) => prevText + '\n\u2022 ');
        }
      };

    // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // handleKeyPress(e, index);

    // inputRef[index].current.save();

    const list = [...inputList];
    list[index][name] =  value;
    setInputList(list);
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

                            <PDFExport ref={pdfExportComponent}>

                                <div ref={pdfExportComponent}>

                                    <div className="resume">

                                        <div className='grid-area name'>

                                            <div className='square'>

                                                <div className='firstGroup'>

                                                <TextField
                                                    type="text"
                                                    name="email"
                                                    
                                                    required 
                                                    placeholder='email'
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    inputProps={{maxLength:27}}
                                                    
                                                    value={ourForm.objectName.email}
                                                    
                                                    InputProps={{style: {fontSize:16, color:"black", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    
                                                
                                                    onChange={handleChange.bind()} 
                                                />

                                                <TextField
                                                    type="text"
                                                    name="phoneNumber"
                                                    
                                                    required 
                                                    placeholder='phone number'
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    inputProps={{maxLength:27}}
                                                    
                                                    value={ourForm.objectName.phoneNumber}
                                                    
                                                    InputProps={{style: {fontSize:16, color:"black", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                    sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                    
                                                
                                                    onChange={handleChange.bind()} 
                                                />

                                                    {/* <div
                                                        data-text="Full name"
                                                        data-value={ourForm.objectName.fullName}
                                                        suppressContentEditableWarning={true} 
                                                        contentEditable={true} 
                                                        style={{width:'6cm', fontSize:"20px", marginBottom:"7px"}}
                                                        onChange={(e) => { handleInputChange.bind(e); }}  
                                                        className="listBullet" > 
                                                    </div>

                                                    <div
                                                        data-text="Role"
                                                        data-value={6}
                                                        suppressContentEditableWarning={true} 
                                                        contentEditable={true} 
                                                        style={{width:'6cm', fontSize:"20px", fontFamily:"sans-serif"}}
                                                        onChange={(e) => { handleInputChange.bind(e); }}  
                                                        className="listBullet" > 
                                                    </div> */}

                                                </div>

                                                

                                            </div>

                                            {/* after square */}

                                            <h4 style={{marginLeft:"10px"}}><SchoolIcon sx={{mr:1, height:"15px", width:"15px"}} /> EDUCATION</h4>
                   
                                            <TextField
                                                    type="text"
                                                    name="schoolNameAndlocation"
                                                    
                                                    required 
                                                    placeholder='schoolNameAndlocation'
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    inputProps={{maxLength:27}}
                                                    
                                                    value={ourForm.objectName.schoolNameAndlocation}
                                                    
                                                    InputProps={{style: {fontSize:16, color:"black", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }, display:"in" }}
                                                    
                                                
                                                    onChange={handleChange.bind()} 
                                                />

                                            <div
                                                data-text="education"
                                                suppressContentEditableWarning={true} 
                                                contentEditable={true}
                                                name="schoolNameAndlocation"
                                                style={{width:'6cm', fontSize:"20px"}}
                                                onChange={(e) => { handleInputChange.bind(e); }}  
                                                className="listBullet" > 
                                            </div>
                                                                                                                               

                                        </div>

                                            {/* rigth part */}
                                            <div className="grid-area work">
                                                <h4> <WorkIcon sx={{mr:1, height:"15px", width:"15px"}} /> WORK EXPERIENCE </h4>
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

                    </Fade>
                
            </div>

        </>

    );

}

export default InputsForm;    