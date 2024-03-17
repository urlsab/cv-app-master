import './InputsForm.css';
import React, { useState, useRef, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { FiGithub } from "react-icons/fi";
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
import { firestoreDB, auth } from "../../config/firebase.config";
import { initialState } from "../../utils/ourState";
import { Button, InputAdornment } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import Fade from 'react-reveal/Fade';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from "../Navbar/Navbar";
import { createRandomId } from '../../utils/randomId';

import { FaBold } from "react-icons/fa";
import { TfiUnderline } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { MdAddLink } from "react-icons/md";

const InputsForm = () => {

    const [selectedText, setSelectedText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    // const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [linkApplied, setLinkApplied] = useState(false);
    const [boldEnabled, setBoldEnabled] = useState(false);
    const [underlineEnabled, setUnderlineEnabled] = useState(false);

  const handleLinkInputChange = (event) => {
    setLinkUrl(event.target.value);
  };

  const handleApplyLink = () => {
    applyLink();
    setIsPopoverVisible(false);
  };

  const applyLink = () => {
    if (linkUrl && selectedText) {
      const newNode = document.createElement('a');
      newNode.setAttribute("style", 
      "color:blue; font-size: inherit; text-decoration: none; margin: 0px; padding: 0px; border:none; display: inline; cursor: pointer;"
      
      );
      newNode.href = linkUrl;
      newNode.textContent = selectedText;

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(newNode);

      setLinkApplied(true);
    }
  };

    // loading, error - check if false - render gif - if true - stop render
    const [user, loading, error] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
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
                console.log(response.id);
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

    const handleCustomChange = (field, data) => {
        setOurForm({
            ...ourForm,
            objectName: {
                ...ourForm.objectName,
                [field]: data,
            }
        })
    }
    
  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      const selectedText = selection.toString();
      setSelectedText(selectedText);
      setIsPopoverVisible(true);
    } else {
      setSelectedText('');
      setIsPopoverVisible(false);
    }
  };

  const [flag, setFlag] = useState(false);

  const handleBold = () => {
      if (window.getSelection() && !flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('b');
        span.setAttribute('id', 'bb');
        span?.appendChild(range.extractContents());
        range.insertNode(span);
        setFlag(!flag);
      }
      if (window.getSelection() && flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.getElementById('bb');
        console.log(selection);
        span?.replaceWith(...span.childNodes);
        range.insertNode(span);
        setFlag(!flag);
      }
    };
  
    const handleUnderline = () => {
      if (window.getSelection() && !flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('u');
        
        span.setAttribute('id','bb');
        span?.appendChild(range.extractContents());
        range.insertNode(span);
        setFlag(!flag);
      }
      if (window.getSelection() && flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.getElementById('bb');
        span?.replaceWith(...span.childNodes);
        range.insertNode(span);
        setFlag(!flag);
      }
    };

  const boldSelectedText = () => {
    const range = window.getSelection().getRangeAt(0);
    const boldElement = document.createElement('strong');
    if (boldEnabled) {
      boldElement.appendChild(range.extractContents());
      range.insertNode(boldElement);
    } else {
      const parentElement = range.commonAncestorContainer.parentElement;
      if (parentElement.nodeName === 'STRONG') {
        const textNode = document.createTextNode(parentElement.textContent);
        parentElement.parentNode.replaceChild(textNode, parentElement);
      }
    }
  };

  const underlineSelectedText = () => {
    const range = window.getSelection().getRangeAt(0);
    const underlineElement = document.createElement('u');
    if (underlineEnabled) {
      underlineElement.appendChild(range.extractContents());
      range.insertNode(underlineElement);
    } else {
      const parentElement = range.commonAncestorContainer.parentElement;
      if (parentElement.nodeName === 'U') {
        const textNode = document.createTextNode(parentElement.textContent);
        parentElement.parentNode.replaceChild(textNode, parentElement);
      }
    }
  };
      
    return (
        <>
        <div  className='createResumeContainer'>
        <Navbar/>
        <Fade delay={400}>

    <div className='buttonsStyle' style={{  padding: '10px', border: '1px solid transparent', borderRadius: '5px' }}>
        
        <Button 
            sx={{mr:1}}
            // center icon inside the button - justifyContent:  'flex-end' - becasue there is some default margin
            style={{display: 'flex', justifyContent:  'flex-end'}}
            color='inherit'
            variant="contained"
            startIcon={<FaBold/>}
            onClick={handleBold}>
        </Button>
        <Button 
            sx={{mr:1}}
            style={{display: 'flex', justifyContent:  'flex-end'}}
            color='inherit'
            variant="contained"
            startIcon={<TfiUnderline/>}
            onClick={handleUnderline}>
        </Button>
        <input
            type="text"
            value={linkUrl}
            onChange={handleLinkInputChange}
            placeholder="Enter URL"
            onMouseUp={(e) => e.stopPropagation()}
            style={{ width: '300px', padding:'6.5px', borderRadius:'5px', borderColor:'transparent', marginRight:'2px' }}
        />
        <Button     
            style={{display: 'flex', justifyContent:  'flex-end'}}
            color='inherit'
            variant="contained"
            startIcon={<MdAddLink/>}
            onClick={handleApplyLink}>
        </Button> 
        
    </div>

        <PDFExport ref={pdfExportComponent}>

            <div style={{marginTop:'20px'}} onMouseUp={handleSelect} className="resume">

                <div className='grid-area name'>

    <div className='square'>

            <div className='firstGroup'> 

                <div
                    name="fullName"
                    required 
                    multiline
                    style={{marginTop:"25px",width:'235px',fontSize:24 ,color:'white', padding: '0.2rem', lineHeight:"25px"}}
                    //className='pdfFonts'
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder="Full Name"
                    content={ourForm.objectName.fullName}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('fullName', nameFull);
                    }}
                /> 

                <div
                    name="jobTitle"
                    required 
                    multiline
                    style={{marginTop:"25px",width:'235px',fontSize:20, marginTop:'0px' ,color:'white', padding: '0.2rem', lineHeight:"25px"}}
                    //className='pdfFonts'
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Role'
                    content={ourForm.objectName.jobTitle}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('fullName', nameFull);
                    }}
                /> 

                <div
                    name="email"
                    required 
                    multiline
                    style={{marginTop:"10px",width:'235px',fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px"}}
                    //className='pdfFonts'
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Email'
                    
                    content={ourForm.objectName.email}
                    onInput={(event) => {
                        const nameFull = event.target.textContent + `p`;
                        handleCustomChange('fullName', nameFull);
                    }}
                />

                {/* {Object(`${<MdAlternateEmail style={{fontSize:13, color:'white'}}/>}`).toString()} */}
                   
                   

                
                 

                {/* <TextField
                    type="email"
                    
                    
                    
                    style={{
                    
                    marginTop:"15px",
                    
                    
                    
                    }}
                    
                    startAdornment: (
                        <InputAdornment  position='start'>
                            { ourForm.objectName.email ?
                            
                            <Fade> <MdAlternateEmail style={{fontSize:13, color:'white'}}/>
                                </Fade> : null }
                            
                        </InputAdornment>
                    )
                    
                }}/> */}

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
                    
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.phoneNumber ?
                            
                            <Fade> <BsPhone style={{fontSize:13, color:'white'}}/> </Fade> : null }
                            
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
                    
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.linkedinLink ?
                            
                            <Fade> <TiSocialLinkedin style={{fontSize:13, color:'white'}}/> </Fade> : null }
                            
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
                    
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.githubLink ?
                            
                            <Fade> <FiGithub style={{fontSize:13, color:'white'}}/> </Fade> : null }
                            
                        </InputAdornment>
                    )
                    
                }}/>
                
            
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
                    
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.portfolioLink ?
                            
                            <Fade> <CgProfile style={{fontSize:13, color:'white'}}/> </Fade> : null }
                            
                        </InputAdornment>
                    )
                    
                }}/> 
                
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
                    width:'235px',
                    
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"}, 
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.degreeTypeAndname ?
                            
                            <Fade><TbSchool style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.schoolNameAndlocation ?
                            
                            <Fade> <HiOutlineLocationMarker style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.timeLearnedDegree ?
                            
                            <Fade> <RxCalendar style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment  position='start'>
                            { ourForm.objectName.ProgrammingLanguages ?
                            
                            <Fade> 
                                <BsCode style={{fontSize:13, color:'gray'}}/> 
                            </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.Databases ?
                            
                            <Fade> <AiOutlineDatabase style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.Frameworks ?
                            
                            <Fade> <AiOutlineTool style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                    startAdornment: (
                        <InputAdornment position='start'>
                            { ourForm.objectName.GeneralKnowledge ?
                            
                            <Fade> <LiaProjectDiagramSolid style={{fontSize:13, color:'gray'}}/> </Fade> : null }
                            
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
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}
                    
                />

                <TodoWork/>

                <TodoRight/>

            </div>

    </div> 

                                

                            </PDFExport>

                            
                        </Fade>

                   

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
                                onClick={handleAddResume}>SAVE
                            </Button> */}

                    </div>

                </Fade>

            </div>

        </>

    );

}

export default InputsForm;   