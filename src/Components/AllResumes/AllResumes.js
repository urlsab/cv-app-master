import "./AllResumes.css";
import React, { useState } from "react";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveAsIcon from '@mui/icons-material/SaveAs';
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
import { BiAdjust } from "react-icons/bi";

import { PDFExport } from "@progress/kendo-react-pdf";
import Navbar from "../Navbar/Navbar";

import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';

import TextField from '@mui/material/TextField';

import InputsForm from '../InputsForm/InputsForm';

import { Button } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import { InputAdornment } from "@mui/material";
import * as MaterialDesign from "react-icons/md";
import { PiDotBold } from "react-icons/pi";

import TodoLeft from '../TodoLeft/TodoLeft';
import TodoRight from '../TodoRight/TodoRight';
import TodoWork from '../TodoWork/TodoWork';

import { firestoreDB } from "../../config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase.config";
import { addDoc } from "firebase/firestore";

// import Todo from "../Todo/Todo";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { initialState } from "../../utils/ourState";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";


const AllResumes = () => {

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();
    const navigate = useNavigate();
    
    const [user] = useAuthState(auth);

    const [ourForm, setOurForm] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOurForm(prevState => ({
            objectName: {
                ...prevState.objectName,
                [name]: value
            },
        }))
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

const handleEditResume = (id) => {

    // cv.map((el, i)

    // )

    updateDoc(doc(firestoreDB,`${user.email}`, id ), {fullName:{}}).then(res => {
        console.log(res);
//     const handleEditResume = (id) => {
//         updateDoc(doc(firestoreDB,`${user.email}`, id ), {address:16}).then(res => {
//             console.log(res);
        
        window.location.reload(false);
    })
    .catch(error => console.log(error)); 
}

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

            // window.location.reload(true);
            window.location.reload(false);
            // navigate("/allResumes");
            
        }).catch(error => {
            console.log(error);
            console.log("error from handleAddResume function");
    })
    
};

    const handleDeleteDoc = (id) => {
        
        deleteDoc(doc(firestoreDB,`${user.email}`, id )).then(response => {
            console.log("successfully deleted");
            
            window.location.reload(false);
        })
        .catch(error => console.log(error)); 
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

                                <div className="resume">

                                    <div className='grid-area name'>

                                        <div className='square'>
                             
                                            <div className='firstGroup'> 

                                                {/* <TextField
                                                    type="text"
                                                    name="fullName"
                                                    
                                                    required 
                                                    multiline
                                                    placeholder='Full Name'
                                                    className='pdfFonts'

                                                    // for hide the border
                                                    sx={{border: 'none',"& fieldset": { border: 'none' } }}
                                                    defaultValue={cv[i].info.fullName}
                                                    style={{
                                                   
                                                    marginTop:"25px",
                                                
                                                    width:'230px',
                                                    
                                                    }}
                                                    InputProps={{style: {fontSize:24 ,color:'white', padding: '0.2rem', lineHeight:"25px"}}}
                                                    
                                                /> */}

                                                <div 
                                                    name="fullName"
                                                    className='pdfFonts'
                                                    contentEditable={true}                                        
                                                    suppresscontenteditablewarning={true}                                                                                                          
                                                > 
                                                {cv[i].info.fullName}
                                                </div>
                                                
                                                <TextField
                                                    type="text"
                                                    name="jobTitle"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Role'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    defaultValue={cv[i].info.jobTitle}
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
                                                    // onChange={handleChange}
                                                    defaultValue={cv[i].info.email}
                                                    style={{
                                                    
                                                    marginTop:"15px",
                                                  
                                                    width:'230px',
                                                   
                                                    }}
                                                    InputProps={{style: {fontSize:13, color:'white',  padding: '0.2rem', lineHeight:"15px"}, 
                                                    startAdornment: (
                                                        <InputAdornment  position='start'>
                                                           { cv[i].info.email ?
                                                            
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
                                                    defaultValue={cv[i].info.phoneNumber}
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
                                                    defaultValue={cv[i].info.linkedinLink}
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
                                                    defaultValue={cv[i].info.githubLink}
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

                                                <TextField
                                                    type="text"
                                                    name="portfolioLink"
                                                    className='pdfFonts'
                                                    required 
                                                    multiline
                                                    placeholder='Portfolio'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    defaultValue={cv[i].info.portfolioLink}
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
                                                    
                                                }}/>
                                                
                                            </div>

                                        </div>

                                            {/* after square */}

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
                                                    placeholder='Degree name'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    defaultValue={cv[i].info.degreeTypeAndname}
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
                                                    defaultValue={cv[i].info.schoolNameAndlocation}
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
                                                    placeholder='Time range'
                                                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                                                    defaultValue={cv[i].info.timeLearnedDegree}
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
                                                    defaultValue={cv[i].info.ProgrammingLanguages}
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
                                                    defaultValue={cv[i].info.Databases}
                                                    
                                                    
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
                                                    defaultValue={cv[i].info.Frameworks}
                                                    
                                                    
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
                                                    defaultValue={cv[i].info.GeneralKnowledge}
                                                    
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

     
                                </PDFExport>

                                <div className="threeButtonsStyle">
                                        
                                    <Button 
                                        key={el.id}
                                        color="error"
                                        variant="contained"
                                        sx={{m:1}}
                                        startIcon={<DownloadIcon/>}

                                        onClick={() => exportPDF(i)}>PDF 
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
                                            startIcon={<PrintIcon/>}>PRINT</Button>} 
                                            content={() => pdfExportComponent.current}
                                        />
                                    
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
                                    onClick={handleAddResume}>UPDATE
                                </Button>

                                    <Button
                                        startIcon={<DeleteIcon/>}
                                        color="info"
                                        sx={{m:1, backgroundColor:"rgb(20,75,170)"}}
                                        variant="contained"
                                        onClick={ () => { handleDeleteDoc(el.id); }}>Delete
                                        
                                    </Button>    

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
            
            <div className="headersContainer">   
                {/* ✔️ */}
             
                <LightSpeed left delay={300}><h1> 📝 <b className="textStyle">EDIT & UPDATE </b>  </h1> </LightSpeed>
                <LightSpeed left delay={600}><h1> 🚮 <b className="textStyle">DELETE FOREVER </b>  </h1> </LightSpeed>
                <LightSpeed left delay={900}><h1> 📥 <b className="textStyle">DOWNLOAD AS PDF  </b>  </h1> </LightSpeed>
                <LightSpeed left delay={1200}><h1> 📃 <b className="textStyle">PRINT IMMEDIATELY </b>  </h1> </LightSpeed>
            </div>

                {toggle ?
            
                    <div className="hideButtonStyle">

                        <Fade delay={300}>  <Button sx={{m:3}} size="large" startIcon={<VisibilityOffIcon/>} variant="contained" color="secondary" onClick={setToggle}> Hide cvs  </Button> </Fade>

                        {renderFake()}

                    </div>

                    : <Fade delay={300}>  <Button sx={{m:3}} startIcon={<VisibilityIcon/>} size="large" variant="contained" color="warning" onClick={ () => { setToggle(); getCv(); } }> Show cvs  </Button> </Fade>
                    
                }

        </div>

    </>

  );

}

export default AllResumes;