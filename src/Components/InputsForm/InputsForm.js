import './InputsForm.css';
import React, { useState, useRef } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { FiGithub } from "react-icons/fi";
import { BiLink } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { AiOutlineDatabase } from "react-icons/ai";
import { AiOutlineTool } from "react-icons/ai";
import { BsCode } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TodoLeft from '../TodoLeft/TodoLeft';
import TodoRight from '../TodoRight/TodoRight';
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";

import TodoWork from '../TodoWork/TodoWork';
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import ReactToPrint from 'react-to-print';
import { firestoreDB, auth } from "../../firestoreConfig/firestoreConfig";
import { initialState } from "../../utils/ourState";
import { Button, InputAdornment } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import Fade from 'react-reveal/Fade';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from "../Navbar/Navbar";

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const InputsForm = () => {

    const theme = 'bubble'; // options when hover

    const modules = {
        toolbar: ['bold', 'italic', 'underline', 'link']
    };

    const formats = ['bold', 'italic', 'underline', 'strike'];

    // const placeholder = 'type...';
    // , placeholder

    const { quillRef } = useQuill({ theme, modules, formats });
    
    // loading, error - check if false - render gif - if true - stop render
    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    const [text, setText] = useState('');
    const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed' }]);

    const navigate = useNavigate();
    
    const pdfExportComponent = useRef(null);
    
    const handleExportWithComponent = (data) => {
        pdfExportComponent.current.save();
        console.log(data);
    };

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
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

                            <div style={{backgroundColor:"gray", height:'700px', width:'650px'}} >

                            <div className="resume">

                                <div className='grid-area name'>

                                    <div className='square'>

                                            <div className='firstGroup'> 

                                            
                                            
                                                

                                                <TextField
                                                    type="text"
                                                    name="fullName"
                                                    onFocusCapture={()=> alert('focused')}
                                                    onDoubleClick={()=> alert('doubleClicked')}
                                                    // onBlurCapture={()=> alert ('blured')}
                                                    required 
                                                    multiline
                                                    placeholder='Full Name'
                                                    className='pdfFonts'
                                                    onm
                                                    // for hide the border
                                                    sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                    value={ourForm.objectName.fullName.toUpperCase()}
                                                    onChange={handleChange}
                                                    style={{
                                                   
                                                    marginTop:"25px",
                                                
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:24 ,color:'white', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />
                                           
                                           <div  ref={quillRef} >

                                            </div>

                                            <div ref={quillRef} >

                                            </div>

                                                <TextField
                                                    type="text"
                                                    name="jobTitle"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Role'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.jobTitle}
                                                    onChange={handleChange}
                                                    style={{
                                                  
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:20, color:'white',  padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="email"
                                                    name="email"
                                                    className='pdfFonts'
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
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment  position='start'>
                                                           { ourForm.objectName.email ?
                                                            
                                                           <Fade> <MdAlternateEmail style={{fontSize:15, color:'white'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                <TextField
                                                    type="text"
                                                    name="phoneNumber"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Phone Number'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.phoneNumber}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.phoneNumber ?
                                                            
                                                           <Fade> <BsPhone style={{fontSize:15, color:'white'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>
                                               
                                                <TextField
                                                    type="text"
                                                    name="linkedinLink"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Linkedin link'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.linkedinLink}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.linkedinLink ?
                                                            
                                                           <Fade> <TiSocialLinkedin style={{fontSize:15, color:'white'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>

                                                <TextField
                                                    type="text"
                                                    name="githubLink"
                                                    required 
                                                    multiline
                                                    className='pdfFonts'
                                                    placeholder='Github'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.githubLink}
                                                    onChange={handleChange}
                                                    style={{
                                                  
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.githubLink ?
                                                            
                                                           <Fade> <FiGithub style={{fontSize:15, color:'white'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/>
                                                
                                            {/* 
                                                <TextField
                                                    type="text"
                                                    name="portfolioLink"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Portfolio'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.portfolioLink}
                                                    onChange={handleChange}
                                                    style={{
                                                   
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.portfolioLink ?
                                                            
                                                           <Fade> <BiLink style={{fontSize:15, color:'white'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                    
                                                }}/> */}
                                                
                                            </div>

                                        </div>

                                            {/* after square //*/}

                                    <div className='afterSquareGroup'>
                                     
                                            <TextField
                                                    type="text"
                                                    name="educationHeader"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Optional section'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value='EDUCATION'
                                               
                                                    style={{
                                                    marginTop:'20px',
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="degreeTypeAndname"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Degree/course name'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.degreeTypeAndname}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"}, 
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.degreeTypeAndname ?
                                                            
                                                           <Fade><TbSchool style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="schoolNameAndlocation"
                                                    className='pdfFonts'
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
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.schoolNameAndlocation ?
                                                            
                                                           <Fade> <HiOutlineLocationMarker style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                />

                                                <TextField
                                                    type="text"
                                                    name="timeLearnedDegree"
                                                    className='pdfFonts'
                                                    required 
                                                    
                                                    multiline
                                                    placeholder='Duration'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.timeLearnedDegree}
                                                    onChange={handleChange}
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.timeLearnedDegree ?
                                                            
                                                           <Fade> <RxCalendar style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                    
                                                />

                                            <TextField
                                                    type="text"
                                                    name="skillsHeader"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Optional section'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value='SKILLS'
                                                  
                                                    style={{
                                                    marginTop:'20px',
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="ProgrammingLanguages"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Languages: JS, CSS e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.ProgrammingLanguages}
                                                    onChange={handleChange}
                                                    // defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.ProgrammingLanguages ?
                                                            
                                                           <Fade> <BsCode style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                
                                                />

                                                <TextField
                                                    type="text"
                                                    name="Databases"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Databases: MongoDB e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.Databases}
                                                    onChange={handleChange}
                                                    
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.Databases ?
                                                            
                                                           <Fade> <AiOutlineDatabase style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                />
 
                                                <TextField
                                                    type="text"
                                                    name="Frameworks"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Frameworks: React e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.Frameworks}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.Frameworks ?
                                                            
                                                           <Fade> <AiOutlineTool style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                    
                                                />

                                                <TextField
                                                    type="text"
                                                    name="GeneralKnowledge"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Knowledge: React-hooks e.g.'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={ourForm.objectName.GeneralKnowledge}
                                                    onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    
                                                    marginLeft:'18px',
                                                    marginBottom:'10px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                           { ourForm.objectName.GeneralKnowledge ?
                                                            
                                                           <Fade> <LiaProjectDiagramSolid style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                                                            
                                                        </InputAdornment>
                                                    )
                                                }}
                                                    
                                                />

                                                <TodoLeft/>

                                        </div>   
 
                                    </div>

                                    

                                            {/* rigth part */}
                                            <div className="grid-area work">
                                            
                                                <TextField
                                                    type="text"
                                                    name="workHeader"
                                                    className='pdfFonts'
                                                    required 
                                                    
                                                    multiline
                                                    // placeholder='Optional section'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    value={'WORK EXPERIENCE'}
                                                    // onChange={handleChange}
                                                    defaultValue={'Languages:'}
                                                    
                                                    style={{
                                                    marginTop:'20px',
                                                    marginLeft:'18px',
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                />

                                                <TodoWork/>

                                                <TodoRight/>

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

                                {/* <Button 
                                    startIcon={<SaveIcon/>}
                                    color="success"
                                    variant="contained"
                                    sx={{m:1, mt: 4}}
                                    onClick={handleAddResume}>Save Resume
                                </Button> */}

                                </div>

                            </Fade>

                    </Fade>
                
            </div>

        </>

    );

}

export default InputsForm;   



// const textBoldRef = useRef(null);
//   const aRef = useRef(null);
//   const textUnderlineRef = useRef(null);

//   const [selectedText, setSelectedText] = useState('');
//   const [link, setLink] = useState('');
//   const [selectedBoldText, setSelectedBoldText] = useState('');

//   const handleLinkSelection = () => {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const text = range.toString();

//     // Check if the selected text is not empty and a link is provided
//     if (text && link) {
//       const linkElement = document.createElement('a');
//       linkElement.href = link;
//       linkElement.appendChild(document.createTextNode(text));
//       range.deleteContents();
//       range.insertNode(linkElement);
//     }
//   };

//   const handleLinkChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleboldChange = (e) => {
//     setSelectedBoldText(e.target.value);
//   };

//   const handleBoldSelection = () => {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const selectedText = range.toString();
//     const boldText = document.createElement('strong');
//     boldText.appendChild(document.createTextNode(selectedText));
//     range.deleteContents();
//     range.insertNode(boldText);
//   };

//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     setSelectedText(selection.toString());
//   };

//   const handleUnderlineSelection = () => {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const selectedText = range.toString();
//     const underlineText = document.createElement('u');
//     underlineText.appendChild(document.createTextNode(selectedText));
//     range.deleteContents();
//     range.insertNode(underlineText);
//   };

//   return (
//     <div>
//       <div onMouseUp={handleBoldSelection} ref={textBoldRef}>
//         pp
//       </div>

//       <p ref={aRef} onMouseUp={handleTextSelection}>
//         {' '}
//         link that aa
//       </p>

//       <TextField
//         type="text"
//         placeholder="Enter a link"
//         value={link}
//         onChange={handleLinkChange}
//       />
//       <button onClick={handleLinkSelection} disabled={!selectedText}>
//         Link Selected Text
//       </button>

//       <p ref={textUnderlineRef} onMouseUp={handleUnderlineSelection}>
//         Select some text and click here to underline it.
//       </p>
//     </div>
//   );
// };

{/* <TextField
value={this.state.fieldFirstName}
onChange={(e: any) => this.onChangeFieldFirstName(e.target.value)}
onFocus={() => this.onFocusFieldFirstName()}
onBlur={() => this.onBlurField()}/> */}

// handleFocus = event => {
//     event.preventDefault();
//     const { target } = event;
//     const extensionStarts = target.value.lastIndexOf('.');
//     target.focus();
//     target.setSelectionRange(0, extensionStarts);
//   }

// const Form = ({handleChange, handleFocus, handleBlur, handleSubmit}) => {
//     return(
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           select
//           onChange={handleChange}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//          />
//          <Button variant="contained" type="submit">Submit<Button>
//       </form>
//    )
//   }

// const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

// <TextField
//         label="Type here"
//         variant="outlined"
//         fullWidth
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         InputProps={{
//           style: {
//             fontWeight: isFocused ? 'bold' : 'normal',
//           },
//         }}
//       />


// working !!!

// const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//  <TextField
//         label="Type here"
//         variant="outlined"
//         fullWidth
//         onFocus={handleBlur}
//         onDoubleClick={handleFocus}
//         InputProps={{
//           style: {
//             fontWeight: isFocused ? 'bold' : 'normal',
//             textdecoration: isFocused ? 'underline' : 'normal'
//           },
//         }}
//       />