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

import { MdEmail } from 'react-icons/md'; 
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
      "color:#007bff; font-size: inherit; text-decoration: underline; margin: 0px; padding: 0px; border:none; display: inline; cursor: pointer;"
      
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

  // maybe just toggle font-weight: bold/normal;
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
  
    // maybe just toggle text-decoration: underline/none
    const handleUnderline = () => {
      if (window.getSelection() && !flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('u');
        
        span.setAttribute('id','cc');
        span?.appendChild(range.extractContents());
        range.insertNode(span);
        setFlag(!flag);
      }
      if (window.getSelection() && flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.getElementById('cc');
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

  const toggleStyle = (tagName, id) => {
    if (window.getSelection()) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const span = document.createElement(tagName);
      span.setAttribute('id', id);
      span.appendChild(range.extractContents());
      range.insertNode(span);
      setFlag(!flag);
    }
  };
  
  const removeStyle = (id) => {
    const span = document.getElementById(id);
    if (span) {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    }
  };
  
  const handleBoldi = (id) => {
    if (!flag) {
      toggleStyle('b', id);
    } else {
      removeStyle('b');
      setFlag(!flag);
    }
  };
  
  const handleUnderlinei = (id) => {
    if (!flag) {
      toggleStyle('u', id);
    } else {
      removeStyle('u');
      setFlag(!flag);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

const isValidEmail = (email) => {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
      
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
            onClick={handleBoldi}>
        </Button>
        <Button 
            sx={{mr:1}}
            style={{display: 'flex', justifyContent:  'flex-end'}}
            color='inherit'
            variant="contained"
            startIcon={<TfiUnderline/>}
            onClick={handleUnderlinei}>
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

            {/* margin top effects the head part of the paper before print */}
            <div style={{marginTop:'1px'}} onMouseUp={handleSelect} className="resume">

                <div className='grid-area name'>

    <div className='square'>

            <div className='firstGroup forFirstGroup'> 

                <div
                    name="fullName"
                    aria-required="true"
                    multiline
                    style={{textTransform:"uppercase", marginTop:"25px",width:'235px',fontSize:24 ,color:'white', padding: '0.2rem', lineHeight:"25px"}}
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
                    aria-required="true"
                    multiline
                    style={{marginTop:"25px",width:'235px',fontSize:20, marginTop:'0px' ,color:'white', padding: '0.2rem', lineHeight:"25px"}}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Role'
                    content={ourForm.objectName.jobTitle}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('jobTitle', nameFull);
                    }}
                /> 

            <div className="iconAndInputs" style={{marginTop:"10px"}}>
                {ourForm.objectName.email !=='' && (<Fade> <img 
                style={{marginRight:"2px", marginLeft:'3px'}}
                    src='data:image/svg+xml;utf8,
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-width="1.5" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>'
                /> </Fade>)}

                {/*add: verify it's legal email adrres + exist */}
                <div
                    name="email"
                    aria-required="true"
                    style={{width:'210px', fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Email'
                    content={ourForm.objectName.email}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('email', nameFull);
                    }}
                />

            </div>

            <div className="iconAndInputs">

                {ourForm.objectName.phoneNumber !=='' && (<Fade> <img 
                    style={{marginRight:"2px", marginLeft:'3px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                        </svg>'
                /> </Fade>)}

                <div
                    name="phoneNumber"
                    aria-required="true"
                    style={{width:'210px', fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Phone Number'
                    content={ourForm.objectName.phoneNumber}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('phoneNumber', nameFull);
                    }}
                />

            </div>

            
            <div className="iconAndInputs">

                {ourForm.objectName.linkedinLink!=='' && (<Fade> <img 
                    style={{marginRight:"2px", marginLeft:'3px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                        </svg>'
                /> </Fade>)}

               
                <div
                    name="linkedinLink"
                    aria-required="true"
                    style={{width:'210px', fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Linkedin Link'
                    content={ourForm.objectName.linkedinLink}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('linkedinLink', nameFull);
                    }}
                />

            </div>   

            <div className="iconAndInputs">

                {ourForm.objectName.githubLink!=='' && (<Fade> <img 
                    style={{marginRight:"2px", marginLeft:'3px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                        </svg>'
                /> </Fade>)}

               
                <div
                    name="githubLink"
                    aria-required="true"
                    style={{width:'210px', fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Github Link'
                    content={ourForm.objectName.githubLink}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('githubLink', nameFull);
                    }}
                />

            </div>  

            <div className="iconAndInputs">
                {ourForm.objectName.portfolioLink!=='' && (<Fade> <img 
                     style={{marginRight:"2px", marginLeft:'3px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="portfolioLink"
                    aria-required="true"
                    style={{width:'210px', fontSize:13 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Portfolio Link'
                    content={ourForm.objectName.portfolioLink}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('portfolioLink', nameFull);
                    }}
                />
            </div>   

                
                
            </div>

        </div>

            {/* after square //*/}

    <div className='afterSquareGroup forSecondGroup'>

            <TextField
                type="text"
                name="educationHeader"
                className='pdfFonts'
                multiline
                sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                value='EDUCATION'
                style={{
                marginTop:'20px',
                marginLeft:'10px',
                width:'235px',
                }}
                InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}   
            />

            <div className="iconAndInputs">
                {ourForm.objectName.degreeTypeAndname!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="degreeTypeAndname"
                    aria-required="true"
                    style={{width:'210px' , fontSize:15 , padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Degree/course name'
                    content={ourForm.objectName.degreeTypeAndname}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('degreeTypeAndname', nameFull);
                    }}
                />
            </div>

            <div className="iconAndInputs">
                {ourForm.objectName.schoolNameAndlocation!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="schoolNameAndlocation"
                    aria-required="true"
                    style={{width:'210px' , fontSize:15 , padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='School Name & Location'
                    content={ourForm.objectName.schoolNameAndlocation}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('schoolNameAndlocation', nameFull);
                    }}
                />
            </div> 

            <div className="iconAndInputs">
                {ourForm.objectName.timeLearnedDegree!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" stroke-width="1.5" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="timeLearnedDegree"
                    aria-required="true"
                    style={{width:'210px' , fontSize:15 , padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Duration'
                    content={ourForm.objectName.timeLearnedDegree}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('timeLearnedDegree', nameFull);
                    }}
                />
            </div> 

            <TextField
                    type="text"
                    name="skillsHeader"
                    className='pdfFonts'
                    required 
                    multiline
                    
                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                    value='SKILLS'
                    
                    style={{
                    marginTop:'20px',
                    marginLeft:'10px',
                    width:'235px',
                    
                    }}
                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}}}
                    
                />

                

            <div className="iconAndInputs">
                {ourForm.objectName.ProgrammingLanguages!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="ProgrammingLanguages"
                    aria-required="true"
                    style={{width:'210px' ,fontSize:15 , padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Programming Languages'
                    content={ourForm.objectName.ProgrammingLanguages}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('ProgrammingLanguages', nameFull);
                    }}
                />
            </div>

            <div className="iconAndInputs">
                {ourForm.objectName.Databases!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                            <path stroke-width="1.5" d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="Databases"
                    aria-required="true"
                    style={{width:'210px', fontSize:15, padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Databases'
                    content={ourForm.objectName.Databases}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('Databases', nameFull);
                    }}
                />
            </div>

            <div className="iconAndInputs">
                {ourForm.objectName.Frameworks!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                    <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                    <path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5.029-.18.077-.37.1-.545.217-2.058-.273-3.543-1.379-4.182-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182.018.175.067.365.095.545-2.127.819-3.466 2.071-3.466 3.5 0 1.429 1.339 2.681 3.466 3.5-.028.18-.077.37-.095.545-.218 2.058.272 3.543 1.379 4.182.376.213.803.322 1.235.316a5.987 5.987 0 0 0 3.514-1.56 5.992 5.992 0 0 0 3.515 1.56 2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182-.019-.175-.067-.365-.1-.545 2.132-.819 3.471-2.071 3.471-3.5Zm-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212-.012.106-.043.222-.058.33-.841-.243-1.7-.418-2.57-.523a16.165 16.165 0 0 0-1.747-1.972 4.9 4.9 0 0 1 2.731-1.234Zm-7.917 8.781c.172.34.335.68.529 1.017.194.337.395.656.6.969a14.09 14.09 0 0 1-1.607-.376 14.38 14.38 0 0 1 .478-1.61Zm-.479-4.076a14.085 14.085 0 0 1 1.607-.376c-.205.313-.405.634-.6.969-.195.335-.357.677-.529 1.017-.19-.527-.35-1.064-.478-1.61ZM8.3 12a19.32 19.32 0 0 1 .888-1.75c.33-.568.69-1.118 1.076-1.65.619-.061 1.27-.1 1.954-.1.684 0 1.333.035 1.952.1a19.63 19.63 0 0 1 1.079 1.654c.325.567.621 1.15.887 1.746a18.869 18.869 0 0 1-1.953 3.403 19.218 19.218 0 0 1-3.931 0 20.169 20.169 0 0 1-1.066-1.653A19.324 19.324 0 0 1 8.3 12Zm7.816 2.25c.2-.337.358-.677.53-1.017.191.527.35 1.065.478 1.611a14.48 14.48 0 0 1-1.607.376c.202-.314.404-.635.597-.97h.002Zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20.214 20.214 0 0 0-.6-.97c.542.095 1.078.22 1.606.376a14.111 14.111 0 0 1-.478 1.611h.002ZM12.217 6.34c.4.375.777.773 1.13 1.193-.37-.02-.746-.033-1.129-.033s-.76.013-1.131.033c.353-.42.73-.817 1.13-1.193Zm-4.249-1.7a1.5 1.5 0 0 1 .76-.187 4.9 4.9 0 0 1 2.729 1.233A16.253 16.253 0 0 0 9.71 7.658c-.87.105-1.728.28-2.569.524-.015-.109-.047-.225-.058-.331-.171-1.619.151-2.787.885-3.211ZM3.718 12c0-.9.974-1.83 2.645-2.506.218.857.504 1.695.856 2.506-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12Zm4.25 7.361c-.734-.423-1.056-1.593-.885-3.212.011-.106.043-.222.058-.331.84.243 1.697.418 2.564.524a16.37 16.37 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037Zm3.11-2.895c.374.021.753.034 1.14.034.387 0 .765-.013 1.139-.034a14.4 14.4 0 0 1-1.14 1.215 14.248 14.248 0 0 1-1.139-1.215Zm5.39 2.895c-.782.451-2.075.072-3.5-1.038a16.248 16.248 0 0 0 1.757-1.981 16.41 16.41 0 0 0 2.565-.523c.015.108.046.224.058.33.175 1.619-.148 2.789-.88 3.212Zm1.6-4.854A16.563 16.563 0 0 0 17.216 12c.352-.812.638-1.65.856-2.507 1.671.677 2.646 1.607 2.646 2.507 0 .9-.975 1.83-2.646 2.507h-.004Z"/>
                    <path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794Z"/>
                  </svg>
                  '
                /> </Fade>)}
                <div
                    name="Frameworks"
                    aria-required="true"
                    style={{width:'210px', fontSize:15, padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Frameworks'
                    content={ourForm.objectName.Frameworks}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('Frameworks', nameFull);
                    }}
                />
            </div>

            <div className="iconAndInputs">
                {ourForm.objectName.GeneralKnowledge!=='' && (<Fade> <img 
                    style={{marginRight:"3px", marginLeft:'18px'}}
                    src='data:image/svg+xml;utf8,
                        <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                            <path d="M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z"/>
                        </svg>'
                /> </Fade>)}
                <div
                    name="GeneralKnowledge"
                    aria-required="true"
                    style={{width:'210px', fontSize:15, padding: '0.2rem', lineHeight:"25px" }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='General Knowledge'
                    content={ourForm.objectName.GeneralKnowledge}
                    onInput={(event) => {
                        const nameFull = event.target.textContent;
                        handleCustomChange('GeneralKnowledge', nameFull);
                    }}
                />
            </div>

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