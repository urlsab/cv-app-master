import './InputsForm.css';
import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import TodoLeft from '../TodoLeft/TodoLeft';
import TodoRight from '../TodoRight/TodoRight';
// import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { PDFExport } from "@progress/kendo-react-pdf";
import TodoWork from '../TodoWork/TodoWork';
import PrintIcon from '@mui/icons-material/Print';
// import SaveIcon from '@mui/icons-material/Save';
import ReactToPrint from 'react-to-print';
// import { firestoreDB } from "../../config/firebase.config";
import { auth } from "../../config/firebase.config";
import { initialState } from "../../utils/ourState";
import { Button } from "@mui/material";
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import Navbar from "../Navbar/Navbar";
import { FaBold } from "react-icons/fa";
import { TfiUnderline } from "react-icons/tfi";
import { MdAddLink } from "react-icons/md";
import bAnduGif from '../../utils/b and u .gif';
import addLinkGif from '../../utils/add link.gif';
// import { generatePath } from "react-router";
// import { createRandomId } from '../../utils/randomId';
// import Draggable from 'react-draggable';

const InputsForm = () => {

    useEffect(() => {
        
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.45');
    }, []);

    // const navigate = useNavigate();

    const [color, setColor] = useState('#666777');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const [selectedText, setSelectedText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [linkApplied, setLinkApplied] = useState(false);

    // const saveAsUnicPath = (e) => {
    //     e.preventDefault();
    //     const iDrand = createRandomId();

    //     // try: navigate(`/postInputs/${iDrand}`, { replace: true});
    //     navigate(`/postInputs/${iDrand}`, { replace: false});
    // };    

    // const handleAddPath = (event) => {
        
    //     // firestoreDB making auto uid for any document in hte user.email collection
    //     event.preventDefault();
    //     const iDrand = createRandomId();
    //     ourForm.objectName.path = `/postInputs/${iDrand}`;
    //     // `${user.email}` - cretes new collection with the use email name !!!
    //     const usersCollection = collection(firestoreDB, `${user.email}`);

    //         addDoc(usersCollection, ourForm.objectName)
    //         .then(response => {
                
    //             console.log(response);               
    //             console.log(response.id);
    //             console.log(response.path);
    //             console.log(`/postInputs/${iDrand}`);
    //             navigate("/allResumes");
    //         }).catch(error => {
    //             console.log(error);
    //             console.log("error from handleAddResume function");
    //     })
        
    // };
    
    const handleLinkInputChange = (event) => {
        console.log(isPopoverVisible, linkApplied)
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
    const [user] = useAuthState(auth);
    const [ourForm, setOurForm] = useState(initialState);
    // const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed' }]);
    
    const pdfExportComponent = useRef(null);

    // const handleExportWithComponent = (data) => {
    //     pdfExportComponent.current.save();
    //     console.log(data);
    // };

    // const handleAddResume = (event) => {
        
    //     // firestoreDB making auto uid for any document in hte user.email collection
    //     event.preventDefault();
    //     // `${user.email}` - cretes new collection with the use email name !!!
    //     const usersCollection = collection(firestoreDB, `${user.email}`);

    //         addDoc(usersCollection, ourForm.objectName)
    //         .then(response => {
    //             console.log(ourForm.objectName);
    //             console.log(response);               
    //             console.log(response.id);
    //             console.log(response.path);
    //             navigate("/allResumes")
    //         }).catch(error => {
    //             console.log(error);
    //             console.log("error from handleAddResume function");
    //     })
        
    // };

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

  // select text, push it to an empty array, join('') the array to one big string and then bold it e.g.

    //   let ranges = [];

    // sel = window.getSelection();

    // for (let i = 0; i < sel.rangeCount; i++) {
    //   ranges[i] = sel.getRangeAt(i);
    
    // }

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
    console.log(user);
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

// const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// useEffect(() => {
//     setValidName(USER_REGEX.test(user));
//   }, [user]);
  
//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   const validateEmail = (email) => {
//     // Regular expression for validating email addresses
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailPattern.test(email);
// };

// const isValidEmail = (email) => {
//     // Define a regular expression pattern for email validation.
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return pattern.test(email);
//   }

// const [isVisible, setIsVisible] = useState(false);
// const [position, setPosition] = useState({ x: 0, y: 0 });

// const handleSelectioni = () => {
//   const selectedText = window.getSelection().toString();
//   if (selectedText) {
//     const selectionRects = window.getSelection().getRangeAt(0).getClientRects();
//     const lastRect = selectionRects[selectionRects.length - 1];
//     setPosition({
//       x: lastRect.left + window.scrollX,
//       y: lastRect.top + window.scrollY,
//     });
//     setIsVisible(true);
//   } else {
//     setIsVisible(false);
//   }
// };
      
    return (
        <>
            <div className='createResumeContainer'>
                <Navbar/>
                {/* <Fade delay={400}> */}
                {/* אין בעיה במתודה של השגת טווח(0) - הבעיה היא שברגע שיש פופאובר אז הפונקציות לא מזהות סלקט. גם בסרגל הישן וגם בחדש */}

                {/* <button 
                        // center icon inside the button - justifyContent:  'flex-end' - becasue there is some default margin
                        style={{display: 'flex', justifyContent:  'flex-end'}}
                        onClick={handleBoldi}>
                            <FaBold/>
                    </button>
                    <button 
                        style={{display: 'flex', justifyContent:  'flex-end'}}
                        onClick={handleUnderlinei}>
                            <TfiUnderline/>
                    </button>
                    
                    <button     
                        style={{display: 'flex', justifyContent:  'flex-end'}}
                        onClick={handleApplyLink}
                    >
                        <MdAddLink/>
                    </button> 
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={handleLinkInputChange}
                            placeholder="Enter URL"
                            onMouseUp={(e) => e.stopPropagation()}
                            style={{ width: '200px', borderRadius:'5px', borderColor:'black', marginRight:'1px', marginLeft:'2px' }}
                        /> */}

                

                {/* make placeholder work only if it's inside a wrraper div */}

            {/* <div> */}
                {/* {isVisible && (
                <Draggable >  */}
                    {/* <div
                        style={{
                        position: 'absolute',
                        top: position.y,
                        left: position.x,
                        borderRadius:'10px',
                        backgroundColor: 'gray',
                        zIndex: 1,
                        marginTop:'-40px',
                        }}
                    > */}
                    {/* Your popover content goes here */}

                <div className="textContainer">
                    <Fade delay={600}> <h1> <b className="textStyle"> BUILD YOUR RESUME </b> 🔨 </h1> </Fade>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <LightSpeed left delay={800}><img style={{marginBottom:'80px',marginRight:'20px', border:'2px solid black'}} alt="b and u gif" align="center" width="230" height="150" src={bAnduGif}/></LightSpeed>
                    <LightSpeed left delay={800}><img style={{marginBottom:'80px',marginLeft:'20px', border:'2px solid black'}} alt="add link gif" align="center" width="230" height="150" src={addLinkGif}/></LightSpeed>
                </div>

                    
                <div className='buttonsStyle' style={{ marginBottom:'5px',padding: '2px', border: '1px solid transparent', borderRadius: '5px' }}>
                    
                        <input
                            id="colorPicker"
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            style={{ 
                                height:'32.5px',
                                width:'60px',
                                cursor: 'pointer',
                                marginRight:'8px',
                                borderRadius: '5px',
                                borderColor:'transparent',
                            }}
                        />

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
                    
            {/* </div> */}
                    {/* </div> */}
                {/* </Draggable>
            )} */}
            </div>
                    
                {/* <div className='forSecondGroup'>
                    <div
                        name="sendTo"
                        className='sendtoStyle '
                        aria-required="true"
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                        placeholder="Send to: Company name | Role name | Date send | Role location"
                        content={ourForm.objectName.sendTo}
                        onInput={(event) => {
                            const nameFull = event.target.textContent;
                            handleCustomChange('sendTo', nameFull);
                        }}
                    />
                </div> */}

                        <PDFExport ref={pdfExportComponent}>

                            {/* onMouseUp={()=>{ handleSelect();handleSelectioni()}}  */}
                            {/* margin top effects the head part of the paper before print */}
                            <div className="resume" onMouseUp={handleSelect}>
                                <div className='grid-area name'>
                                    <div style={{backgroundColor:color}} className='square'>
                                        <div className='firstGroup forFirstGroup'> 
                                            <div
                                                name="fullName"
                                                aria-required="true"
                                                multiline
                                                style=
                                                    {{textTransform:"uppercase", 
                                                    marginTop:"20px",
                                                    width:'235px',
                                                    fontSize:20 ,
                                                    color:'white', 
                                                    padding: '0.2rem', 
                                                    lineHeight:"25px"}}
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
                                                style={{marginBottom:'6px',width:'235px',fontSize:16.5 ,color:'white', paddingLeft: '0.2rem', lineHeight:"25px"}}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Role'
                                                value={'gogo'}
                                                content={ourForm.objectName.jobTitle}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('jobTitle', nameFull);
                                                }}
                                            /> 

                                            <div className="iconAndInputs" style={{marginTop:"10px"}}>
                                                {ourForm.objectName.email !=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"2px", marginLeft:'3px'}}
                                                    src='data:image/svg+xml;utf8,
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="white" stroke-linecap="round" stroke-width="1.5" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                                                        </svg>'
                                                /> </Fade>)}

                                            {/*add: verify if it's legal email adrres + exist */}
                                            {/* add: option for clickable email - href="mailto:'someemailaddress'@gmail.com" */}
                                            <div
                                                name="email"
                                                aria-required="true"
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
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
                                            {ourForm.objectName.phoneNumber !=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"2px", marginLeft:'3px'}}
                                                src='data:image/svg+xml;utf8,
                                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" stroke-width="1.5" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                                                    </svg>'
                                            /> </Fade>)}

                                            {/* add option for clickable phonenumber */}
                                            <div
                                                name="phoneNumber"
                                                // onMouseDown={window.location.href}
                                                // href={`tel:+972${ourForm.objectName.phoneNumber}`}
                                                aria-required="true"
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
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
                                            {ourForm.objectName.linkedinLink!=='' && (<Fade> <img alt="svg" 
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
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
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

                                            {ourForm.objectName.githubLink!=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"2px", marginLeft:'3px'}}
                                                src='data:image/svg+xml;utf8,
                                                    <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" stroke-width="1.5" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                                                    </svg>'
                                            /> </Fade>)}

                                            <div
                                                name="githubLink"
                                                aria-required="true"
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
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
                                            {ourForm.objectName.portfolioLink!=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"2px", marginLeft:'3px'}}
                                                src='data:image/svg+xml;utf8,
                                                    <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" stroke-width="1.5" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
                                                    </svg>'
                                            /> </Fade>)}
                                                <div
                                                    name="portfolioLink"
                                                    aria-required="true"
                                                    style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
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

                                    <div
                                        type="text"
                                        name="educationHeader"
                                        // className='pdfFonts'
                                        required 
                                        multiline
                                        style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                        >
                                        EDUCATION
                                    </div>

                                        <div className="iconAndInputs">
                                            {ourForm.objectName.degreeTypeAndname!=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"3px", marginLeft:'18px'}}
                                                src='data:image/svg+xml;utf8,
                                                    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                                                    </svg>'
                                            /> </Fade>)}
                                            <div
                                                name="degreeTypeAndname"
                                                aria-required="true"
                                                style={{width:'210px' , fontSize:14.5 , padding: '0.2rem', lineHeight:"25px" }}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Knowledge, location, duration...'
                                                content={ourForm.objectName.degreeTypeAndname}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('degreeTypeAndname', nameFull);
                                                }}
                                            />
                                        </div>

                                        <div
                                            required 
                                            multiline
                                            style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                        >
                                            SKILLS
                                        </div>

                                        <div className="iconAndInputs">
                                            {ourForm.objectName.GeneralKnowledge!=='' && (<Fade> <img alt="svg" 
                                                style={{marginRight:"3px", marginLeft:'18px'}}
                                                src='data:image/svg+xml;utf8,
                                                    <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                                                        <path d="M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z"/>
                                                    </svg>'
                                            /> </Fade>)}
                                            <div
                                                name="GeneralKnowledge"
                                                aria-required="true"
                                                style={{width:'210px', fontSize:14.5, padding: '0.2rem', lineHeight:"25px" }}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder="Programing languages, db's..."
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
            <div
                required 
                multiline
                style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
            >
                WORK EXPERIENCE
            </div>
            <TodoWork/>
            <TodoRight/>
        </div>
    </div> 

                                
                </PDFExport>       
                {/* </Fade> */}
                <Fade delay={800}>
                    <div className='buttonsStyle'>

                        {/* <a href='' download=''> DOWNLOAD TO PC </a> */}

                        {/* <Button 
                            sx={{m:1, mt:4}}
                            color="error"
                            variant="contained"
                            // startIcon={<PictureAsPdfIcon/>}
                            startIcon={<DownloadIcon/>}
                            onClick={handleExportWithComponent}>pdf 
                        </Button> */}

                        <ReactToPrint 
                            trigger={() => 
                            <Button 
                                sx={
                                        [{m:1, mt:3,mb:19, backgroundColor:"rgb(250, 204, 0)",
                                    },
                                    {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                ]}
                                    variant="contained" 
                                    color="inherit"
                                    startIcon={<PrintIcon/>}>PRINT & PDF
                            </Button>
                            } 
                            content={() => pdfExportComponent.current}
                        />

                            {/* <Button 
                                startIcon={<SaveIcon/>}
                                color="success"
                                variant="contained"
                                sx={{m:1 ,mt: 3, mb:19}}
                                onClick={handleAddPath}>SAVE
                            </Button> */}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default InputsForm;   