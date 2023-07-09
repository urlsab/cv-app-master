import './InputsForm.css';

import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import PsychologyIcon from '@mui/icons-material/Psychology';

import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import Todo from '../Todo/Todo';

// import InputAdornment from '@mui/material/InputAdornment';

import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DateRangeIcon from '@mui/icons-material/DateRange';
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

// name, contact, education, skill, optionial 
// s(relevant courses, licens, certifictas), work experience, optional (side projects)

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
                        <PDFExport ref={pdfExportComponent}  >
                            
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
                                                    sx={{border: 'none',"& fieldset": { border: 'none' } }}
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
                                                    InputProps={{style: {fontFamily:"Rubik",fontSize:24 ,color:'white', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
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
                                                  
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:20, color:'white',  padding: '0.2rem', lineHeight:"25px"}}}
                                                    
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
                                                    
                                                    marginTop:"15px",
                                                  
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <EmailIcon sx={{fontSize:15, color: "gray"}}/>
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
                                                    
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <PhoneAndroidIcon sx={{fontSize:15, color:"gray"}}/>
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
                                                    
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <LinkedInIcon sx={{fontSize:15, color:"gray"}}/>
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
                                                  
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <GitHubIcon sx={{fontSize:15, color:"gray"}}/>
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
                                                   
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Exo",fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <FilePresentIcon sx={{fontSize:15, color:"gray"}}/>
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>
                                                
                                            </div>

                                        </div>

                                            {/* after square */}

                                            <div className='afterSquareGroup'>
                                     
                                            <h4 style={{marginLeft:'22px', marginBottom:'5px', fontFamily:'Lato'}}> 
                                                {/* <SchoolIcon sx={{mr:1, height:"15px", width:"15px"}} />  */}
                                            EDUCATION</h4>

                                                <TextField
                                                    type="text"
                                                    name="degreeTypeAndname"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Degree name'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.degreeTypeAndname}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:18, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                
                                                <TextField
                                                    type="text"
                                                    name="schoolNameAndlocation"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='School name & location'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.schoolNameAndlocation}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:18,color:'orange', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                
                                                <TextField
                                                    type="text"
                                                    name="timeLearnedDegree"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Time range'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.timeLearnedDegree}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:18, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <DateRangeIcon sx={{fontSize:15, color:"gray"}}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                    
                                                />

                                            <h4 style={{marginLeft:'22px', marginBottom:'1px', fontFamily:"Lato"}}> 
                                                {/* <PsychologyIcon sx={{mr:1, height:"15px", width:"15px"}} />  */}
                                            SKILLS</h4>

                                                <TextField
                                                    type="text"
                                                    name="ProgrammingLanguages"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Languages: JS, CSS e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.ProgrammingLanguages}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:15, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="Databases"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Databases: MongoDB e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.Databases}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:15, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                
                                                <TextField
                                                    type="text"
                                                    name="Frameworks"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Frameworks: React, NodeJS e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.Frameworks}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:15, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="GeneralKnowledge"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Knowledge: React-hooks e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.GeneralKnowledge}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:15, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="dynamicHeaderPartOne"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Optional section'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.dynamicHeaderPartOne.toUpperCase()}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    marginTop:'20px',
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:20, fontWeight:'bold', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="dynamicContentPartOne"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Optional content'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.dynamicContentPartOne}
                                                    onChange={handleChange}
                                                    // defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontFamily:"Lato",fontSize:15, padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />
                                            
                                            </div>   
 
                                        </div>

                                            {/* rigth part */}
                                            <div className="grid-area work">
                                                <h4 style={{fontFamily:"Lato"}}> 
                                                    {/* <WorkIcon sx={{mr:1, height:"15px", width:"15px"}} />  */}
                                                WORK EXPERIENCE </h4>
                                                <Todo/>
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