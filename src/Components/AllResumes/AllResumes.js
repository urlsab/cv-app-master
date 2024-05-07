import "./AllResumes.css";
import React, { useState } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
import { collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { useToggle } from "../../utils/useToggle";
import { PDFExport } from "@progress/kendo-react-pdf";
import Navbar from "../Navbar/Navbar";
import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import { InputAdornment } from "@mui/material";
import TodoLeft from '../TodoLeft/TodoLeft';
import TodoRight from '../TodoRight/TodoRight';
import TodoWork from '../TodoWork/TodoWork';
import { firestoreDB } from "../../config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase.config";
import { addDoc } from "firebase/firestore";
// import Todo from "../Todo/Todo";
import { initialState } from "../../utils/ourState";
import { useNavigate } from "react-router-dom";

const AllResumes = () => {

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();
    const navigate = useNavigate();
    
    const [user] = useAuthState(auth);

    const [ourForm, setOurForm] = useState(initialState);

    const [selectedText, setSelectedText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    // const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

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

    // React.createRef - avoid hooks rules
    const pdfExportComponent = cv.map((i) => React.createRef(i));
    
    const exportPDF = (i) => {
        console.log(pdfExportComponent[i]);
        pdfExportComponent[i].current.save();
    };

//     const handleEditResume = (id) => {
//         updateDoc(doc(firestoreDB,`${user.email}`, id ), {address:16}).then(res => {
//             console.log(res);
            
//             window.location.reload(false);
//         })
//         .catch(error => console.log(error)); 
// }

    // const handleEditResume = (id) => {

    //     // cv.map((el, i)

    //     // )

    //     updateDoc(doc(firestoreDB,`${user.email}`, id ), {fullName:'yosi'}).then(res => {
    //         console.log(res);
    // //     const handleEditResume = (id) => {
    // //         updateDoc(doc(firestoreDB,`${user.email}`, id ), {address:16}).then(res => {
    // //             console.log(res);
            
    //         window.location.reload(false);
    //     })
    //     .catch(error => console.log(error)); 
    // }

    const handleAddResume = (event) => {
            
        // firestoreDB making auto uid for any document in hte user.email collection
        // event.preventDefault();
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

                // window.location.reload(true);
                window.location.reload(false);
                // navigate("/allResumes");
                
            }).catch(error => {
                console.log(error);
                console.log("error from handleAddResume function");
        })
        // getCv();
    };

    // add new doc and delete the prev doc = 'edit' current doc
    // const handleEditDoc = (event, id) => {
    //     handleDeleteDoc(id);
    //     handleAddResume(event); 
    // }

    const handleDeleteDoc = (id) => {
        
        deleteDoc(doc(firestoreDB,`${user.email}`, id )).then(response => {
            console.log("successfully deleted");
            
            // window.location.reload(false);
        })
        .catch(error => console.log(error)); 
        getCv();
    }

    const getCv = async () => {

        const privateCollection = collection(firestoreDB, `${user.email}` );

        await getDocs(privateCollection).then(response => {
            
            const displayResumes = response.docs.map(doc => ({
                info: doc.data(),
                id: doc.id,
                key: doc.id
            })) 
            setCv(displayResumes);
            console.log(displayResumes[0].info.userName);
            console.log("successfully set all cv's");
           
        })
        .catch(error => console.log(error)); 
    }
    
    let arrRefs = [];
    arrRefs.length = cv.length;
    console.log(`arrRefs length is ${arrRefs.length}`);

    const renderFake = () => {
        return (
            <div> 
                <ol className="olStyle"> 
                {/* el = cv[i] */}
                    { 
                        cv.map((el, i) => 
                            <li className="liStStyle" key={el.id}>
                                <PDFExport key={el.id} ref={pdfExportComponent[i]}>
                                    {/* margin top effects the head part of the paper before print */}
                                    <div onMouseUp={handleSelect} className="resume">
                                        <div className='grid-area name'>
                                            <div className='square'>
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
                                                        onMouseUp={handleSelect}
                                                        suppressContentEditableWarning={true}
                                                        contentEditable={true}
                                                        placeholder="Full Name"
                                                        content={ourForm.objectName.fullName}
                                                        onInput={(event) => {
                                                            const nameFull = event.target.textContent;
                                                            handleCustomChange('fullName', nameFull);
                                                        }}
                                                    >
                                                        {cv[i].info.fullName}
                                                    </div> 

                                            <div
                                                name="jobTitle"
                                                aria-required="true"
                                                multiline
                                                style={{marginBottom:'6px',width:'235px',fontSize:16.5 ,color:'white', paddingLeft: '0.2rem', lineHeight:"25px"}}
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Role'
                                                content={ourForm.objectName.jobTitle}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('jobTitle', nameFull);
                                                }}
                                            >
                                            {cv[i].info.jobTitle}    
                                            </div> 

                                            <div className="iconAndInputs" style={{marginTop:"10px"}}>
                                                {ourForm.objectName.email !=='' && (<Fade> <img 
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
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Email'
                                                content={ourForm.objectName.email}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('email', nameFull);
                                                }}
                                            >
                                            {cv[i].info.email}
                                            </div>

                                        </div>

                                        <div className="iconAndInputs">

                                            {ourForm.objectName.phoneNumber !=='' && (<Fade> <img 
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
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Phone Number'
                                                content={ourForm.objectName.phoneNumber}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('phoneNumber', nameFull);
                                                }}
                                            >
                                            {cv[i].info.phoneNumber}
                                            </div>

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
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Linkedin Link'
                                                content={ourForm.objectName.linkedinLink}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('linkedinLink', nameFull);
                                                }}
                                            >
                                            {cv[i].info.linkedinLink}    
                                            </div>

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
                                                style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Github Link'
                                                content={ourForm.objectName.githubLink}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('githubLink', nameFull);
                                                }}
                                            >
                                            {cv[i].info.githubLink}
                                            </div>

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
                                                    style={{width:'210px', fontSize:14.5 ,color:'white', padding: '0.2rem', lineHeight:"15px", position:'relative' }}
                                                    onMouseUp={handleSelect}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='Portfolio Link'
                                                    content={ourForm.objectName.portfolioLink}
                                                    onInput={(event) => {
                                                        const nameFull = event.target.textContent;
                                                        handleCustomChange('portfolioLink', nameFull);
                                                    }}
                                                >
                                                {cv[i].info.portfolioLink}
                                                </div>
                                        </div>   
      
                                        </div>

                                    </div>

                                        {/* after square //*/}

                                    <div className='afterSquareGroup forSecondGroup'>

                                    <div
                                        style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                    >
                                        EDUCATION
                                    </div>

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
                                                style={{width:'210px' , fontSize:14.5 , padding: '0.2rem', lineHeight:"25px" }}
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Knowledge, loaction, duration...'
                                                content={ourForm.objectName.degreeTypeAndname}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('degreeTypeAndname', nameFull);
                                                }}
                                            >
                                            {cv[i].info.degreeTypeAndname}    
                                            </div>


                                        </div>

                                        <div
                                            style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                        >
                                            SKILLS
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
                                                style={{width:'210px', fontSize:14.5, padding: '0.2rem', lineHeight:"25px" }}
                                                onMouseUp={handleSelect}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder="Programing languages, db's..."
                                                content={ourForm.objectName.GeneralKnowledge}
                                                onInput={(event) => {
                                                    const nameFull = event.target.textContent;
                                                    handleCustomChange('GeneralKnowledge', nameFull);
                                                }}
                                            >
                                           {cv[i].info.GeneralKnowledge}
                                            </div>

                                        </div>

                                        <div
                                            name="dynamicHeaderPartOne"
                                            aria-required="true"
                                            // style={{width:'210px', fontSize:14.5, padding: '0.2rem', lineHeight:"25px" }}
                                            style={{ fontSize:16.5, fontWeight:'bolder', lineHeight:"25px"}}
                                            onMouseUp={handleSelect}
                                            suppressContentEditableWarning={true}
                                            contentEditable={true}
                                            placeholder='dynamicHeaderPartOne'
                                            content={ourForm.objectName.dynamicHeaderPartOne}
                                            onInput={(event) => {
                                                const nameFull = event.target.textContent;
                                                handleCustomChange('dynamicHeaderPartOne', nameFull);
                                            }}
                                        >
                                        {cv[i].info.dynamicHeaderPartOne}
                                        </div>

                                        <div
                                            name="dynamicContentPartOne"
                                            aria-required="true"
                                            // style={{width:'210px', fontSize:14.5, padding: '0.2rem', lineHeight:"25px" }}
                                            style={{ fontSize:14.5, lineHeight:"25px"}}
                                            onMouseUp={handleSelect}
                                            suppressContentEditableWarning={true}
                                            contentEditable={true}
                                            placeholder='dynamicContentPartOne'
                                            content={ourForm.objectName.dynamicContentPartOne}
                                            onInput={(event) => {
                                                const nameFull = event.target.textContent;
                                                handleCustomChange('dynamicContentPartOne', nameFull);
                                            }}
                                        >
                                        {cv[i].info.dynamicContentPartOne}
                                        </div>

                                        {/* <TodoLeft/> */}
        
                                    </div>   

                                </div>

            {/* rigth part */}
            <div className="grid-area work">
            <div
                style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
            >
                WORK EXPERIENCE
            </div>

            <TodoWork/>
            <TodoRight/>
        </div>
    </div> 

                                
                </PDFExport>

                                <div className="threeButtonsStyle">
                                        
                                        {/* fix: icons become ugly in this pdf format */}
                                    {/* <Button 
                                        key={el.id}
                                        color="error"
                                        variant="contained"
                                        sx={{m:1}}
                                        startIcon={<DownloadIcon/>}

                                        onClick={() => exportPDF(i)}>PDF 
                                    </Button> */}

                                    
                                    
                                    {/* <Button
                                        color="inherit"
                                        sx={{m:1}}
                                        variant="contained"
                                        startIcon={<EditIcon/>}
                                        onClick={ () => { handleEditResume(el.id); }}>edit
                                    </Button> */}

                                <Button 
                                    startIcon={<BorderColorIcon/>}
                                    color="inherit"
                                    variant="contained"
                                    sx={{m:1}}
                                    onClick={()=> { handleDeleteDoc(el.id); handleAddResume(el.id+1);}}>EDIT
                                </Button>

                                <Button
                                    startIcon={<DeleteIcon/>}
                                    color="error"
                                    sx={{m:1}}
                                    variant="contained"
                                    onClick={ () => { handleDeleteDoc(el.id); }}>remove
                                </Button>   

                                <ReactToPrint trigger={() => 
                                        <Button 
                                        sx={
                                            [{m:1, backgroundColor:"rgb(250, 204, 0)",
                                        },
                                        {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                    ]}
                                        variant="contained" 
                                        color="inherit"
                                        startIcon={<PrintIcon/>}>PRINT & PDF</Button>} 
                                        content={() => pdfExportComponent[i].current}
                                /> 

                                </div>

                            </li>        
                        ) 
                    }

                </ol>
        </div>

        )         
    }
        
  return (
    <>
        <div className="allResumesContainer">
            <Navbar/>
                <div className="headersContainer" style={{fontFamily:'Itim'}}>   
                    <LightSpeed left delay={300}><h1> 📝 <b className="textStyle" >EDIT </b>  </h1> </LightSpeed>
                    <LightSpeed left delay={600}><h1> 🚮 <b className="textStyle">DELETE  </b>  </h1> </LightSpeed>
                    <LightSpeed left delay={900}><h1> 📃 <b className="textStyle">PRINT NOW </b>  </h1> </LightSpeed>
                    <LightSpeed left delay={1200}><h1> 📥 <b className="textStyle">GET IT AS PDF  </b>  </h1> </LightSpeed>
                    
                </div>

                {toggle ?
                    <div className="hideButtonStyle">
                        <Fade delay={300}>  <Button sx={{m:3}} size="large" startIcon={<VisibilityOffIcon/>} variant="contained" color="secondary" onClick={setToggle}> Hide resumes  </Button> </Fade>
                        {renderFake()}
                    </div>
                    : <Fade delay={300}>  <Button sx={{m:3}} startIcon={<VisibilityIcon/>} size="large" variant="contained" color="warning" onClick={ () => { setToggle(); getCv(); } }> Show resumes  </Button> </Fade>
                }
        </div>
    </>);

}

export default AllResumes;