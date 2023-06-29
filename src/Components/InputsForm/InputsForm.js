import './InputsForm.css';

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import Todo from '../Todo/Todo';

// import InputAdornment from '@mui/material/InputAdornment';

import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import PrintIcon from '@mui/icons-material/Print';

import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ReactToPrint from 'react-to-print';

import { firestoreDB, auth } from "../../firestoreConfig/firestoreConfig";
import { arrInitialState } from '../../utils/arrOurState';
import { initialState } from "../../utils/ourState";
import { useToggle } from "../../utils/useToggle";

import { Button, InputAdornment } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import Fade from 'react-reveal/Fade';

import DownloadIcon from '@mui/icons-material/Download';

import Navbar from "../Navbar/Navbar";

const arrState = arrInitialState;

const InputsForm = () => {

    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    const [text, setText] = useState('');
    const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed'}]);

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
                    <Fade delay={400}>
                        <PDFExport ref={pdfExportComponent}>
                            <div ref={pdfExportComponent}>
                                <div className="resume">
                                    <div className='grid-area name'>

                                        <div className='square'>

                                            <div className='firstGroup'> 

                                                <TextField
                                                    type="text"
                                                    name="fullName"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Full Name'

                                                    // for hide the border
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.fullName.toUpperCase()}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    marginTop:"25px",
                                                    //marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Rubik",fontSize:24, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="jobTitle"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Role'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.jobTitle}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    // marginTop:"25px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:20, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="email"
                                                    name="email"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Email'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.email}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    marginTop:"15px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <EmailIcon sx={{fontSize:15, color: "white"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                <TextField
                                                    type="text"
                                                    name="phoneNumber"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Phone Number'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.phoneNumber}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    //marginTop:"10px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <PhoneAndroidIcon sx={{fontSize:15, color:"white"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                
                                                <TextField
                                                    type="text"
                                                    name="linkedinLink"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Linkedin link'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.linkedinLink}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    //marginTop:"10px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <LinkedInIcon sx={{fontSize:15, color:"white"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                
                                                <TextField
                                                    type="text"
                                                    name="githubLink"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Github'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.githubLink}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    //marginTop:"10px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <GitHubIcon sx={{fontSize:15, color:"white"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                
                                                <TextField
                                                    type="text"
                                                    name="portfolioLink"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Portfolio'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.portfolioLink}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    //marginTop:"10px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <FilePresentIcon sx={{fontSize:15, color:"white"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>
                                                
                                            </div>

                                        </div>

                                            {/* after square */}

                                            
                                           
                                                
                                                
                                            <div className='afterSquareGroup'>
                                            
                                                

                                            <h4> 
                                                {/* <SchoolIcon sx={{mr:1, height:"15px", width:"15px"}} />  */}
                                            
                                            EDUCATION</h4>

                                            
                                                <TextField
                                                    type="text"
                                                    name="degreeTypeAndname"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Degree type & name'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.degreeTypeAndname}
                                                    onChange={handleChange}
                                                    style={{
                                                    //resize: 'both',
                                                    // fontSize:'50px',
                                                    // marginTop:"25px",
                                                    // marginBottom: '10px',
                                                    // border: 'none',
                                                    // padding: '0.5rem',
                                                    
                                                    width:'230px',
                                                    
                                                    // position: 'relative',
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:18, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />
                   
                                            {/* <TextField
                                                type="text"
                                                name="schoolNameAndlocation"
                                                required 
                                                placeholder='schoolNameAndlocation'
                                                id="outlined-multiline-static"
                                                multiline
                                                inputProps={{maxLength:27}}
                                                value={ourForm.objectName.schoolNameAndlocation}         
                                                InputProps={{style: {fontSize:18, color:"black", fontFamily:"Exo", height:"9px", width:"7cm"}}}
                                                sx={{border: 'none',"& fieldset": { border: 'none' }, display:"in" }}
                                                onChange={handleChange.bind()} 
                                            /> */}

                                            {/* <div
                                                data-text="education"
                                                suppressContentEditableWarning={true} 
                                                contentEditable={true}
                                                name="schoolNameAndlocation"
                                                style={{width:'6cm', fontSize:"20px"}}
                                                onChange={(e) => { handleInputChange.bind(e); }}  
                                                className="listBullet" > 
                                            </div> */}
                                            
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