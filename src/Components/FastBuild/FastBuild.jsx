import './FastBuild.css';
import React, { useState, useRef, useEffect } from "react";
import TodoLeft from '../TodoLeft/TodoLeft';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TodoRight from '../TodoRight/TodoRight';
import { PDFExport } from "@progress/kendo-react-pdf";
import TodoWork from '../TodoWork/TodoWork';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from'react-to-print';
import { initialState } from "../../utils/ourState";
import { Button } from "@mui/material";
import Fade from 'react-reveal/Fade';
// import LightSpeed from 'react-reveal/LightSpeed';
import { FaBold } from "react-icons/fa";
import { TfiUnderline } from "react-icons/tfi";
import { MdAddLink } from "react-icons/md";
// import EntryNavbar from '../EntryNavbar/EntryNavbar';
// import bAnduGif from '../../utils/b and u .gif';
// import addLinkGif from '../../utils/add link.gif';
// import { FaListUl } from "react-icons/fa6";
import DOMPurify from 'dompurify';
import CopyToClipboardButton from '../../utils/CopyToClipboardButton';
import { getStorage, ref, listAll,getDownloadURL , uploadBytes } from "firebase/storage";
import { Document, Packer, Paragraph, TextRun } from "docx";
// import { ref } from 'firebase/storage';
// import { storage } from "../../config/firebase.config";

const FastBuild = ({fileUrl, fileName}) => {

    
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
   
  const [firebaseFiles, setFirebaseFiles] = useState([]);

  const getFilesFromFirebase = async () => {
    const storage = getStorage();
    const listRef = ref(storage, 'resumes'); // Assuming 'resumes' is the folder where files are stored

    try {
      const res = await listAll(listRef);
      const filesPromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      });
      const files = await Promise.all(filesPromises);
      setFirebaseFiles(files);
    } catch (error) {
      console.error("Error fetching files from Firebase:", error);
    }
  };

  useEffect(() => {
    getFilesFromFirebase();
  }, []);

    const storage = getStorage();

    useEffect(() => {
        if (fileUrl) {
          // Load the file content from the URL and update the component state
          fetch(fileUrl)
            .then(response => response.text())
            .then(content => {
              // Parse the content and update the component state
              // This depends on how you've stored the resume data
              // For example, if it's JSON:
              const resumeData = JSON.parse(content);
              setOurForm(resumeData);
            })
            .catch(error => console.error("Error loading file:", error));
        }
      }, [fileUrl]);

    const generateDocx = (data) => {
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun(`${ourForm.objectName.fullName}`),
                  new TextRun(`${ourForm.objectName.phoneNumber}`),
                  new TextRun(`${ourForm.objectName.email}`),
                  new TextRun(`${ourForm.objectName.linkedinLink}`),
                  new TextRun(`${ourForm.objectName.githubLink}`),
                  new TextRun(`${ourForm.objectName.portfolioLink}`),
                ],
              }),
            ],
          }],
        });
      
        return Packer.toBlob(doc);
      };

      const uploadDocxToFirebase = async (data) => {
        try {
          const docxBuffer = await generateDocx(data);
          const fileName = `resume_${Date.now()}.docx`;
          const storageRef = ref(storage, fileName);
      
          const snapshot = await uploadBytes(storageRef, docxBuffer);
          console.log('Uploaded a DOCX file!');
          return snapshot.ref.fullPath;
        } catch (error) {
          console.error("Error uploading DOCX file:", error);
          throw error;
        }
      };
      
      const handleSaveAsDocx = async () => {
        try {
          const filePath = await uploadDocxToFirebase(ourForm.objectName);
          console.log("File saved to Firebase Storage:", filePath);
          
          // You can store the filePath in your database or show it to the user
        } catch (error) {
          console.error("Failed to save DOCX file:", error);
          // Handle the error (e.g., show an error message to the user)
        }
      };
    // const fileRef = ref(storage, 'someFile.docx');

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
        const savedData = localStorage.getItem(id);
        if (savedData) {
            setData(JSON.parse(savedData));
        }
        }
    }, [id]);

  const saveData = () => {
    let saveId = id;
    if (!saveId) {
      saveId = uuidv4();

      // maybe - navigate(`fastBuild/${saveId}`);
      navigate(`/${saveId}`);
    }
    localStorage.setItem(saveId, JSON.stringify(data));
    console.log(`Data saved with ID: ${saveId}`);
  };

// for savin data on inputs tags
//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

  const handleDivChange = (e) => {
    const { name } = e.target.dataset;
    if (name) {
      setData({ ...data, [name]: e.target.innerText });
    }
  };

    useEffect(() => {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.45');
    }, []);

    const [color, setColor] = useState('#86CAC6');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const [selectedText, setSelectedText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [linkApplied, setLinkApplied] = useState(false);
    
    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input.trim());
    };

    const handleLinkInputChange = (event) => {
        setLinkUrl(sanitizeInput(event.target.value));
    };

    const handleApplyLink = () => {
        applyLink();
        setIsPopoverVisible(false);
    };

    const applyLink = () => {
        if (linkUrl && selectedText) {
            const sanitizedUrl = sanitizeInput(linkUrl);
            const sanitizedText = sanitizeInput(selectedText);
            const newNode = document.createElement('a');
            newNode.setAttribute("style", 
            "color:#007bff; font-size: inherit; text-decoration: underline; margin: 0px; padding: 0px; border:none; display: inline; cursor: pointer;"
            );
            newNode.href = sanitizedUrl;
            newNode.textContent = sanitizedText;
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(newNode);
                console.log(linkApplied);
                setLinkApplied(true);
            }
        }
    };

    const [ourForm, setOurForm] = useState(initialState);
    const pdfExportComponent = useRef(null);
    const handleCustomChange = (field, data) => {
        setOurForm({
            ...ourForm,
            objectName: {
                ...ourForm.objectName,
                [field]: sanitizeInput(data),
            }
        })
    }
    
    const handleSelect = () => {
        const selection = window.getSelection();
        if (selection.toString()) {
        const selectedText = selection.toString();
        setSelectedText(selectedText);
        console.log(isPopoverVisible);
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
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement(tagName);
                span.setAttribute('id', id);
                span.appendChild(range.extractContents());
                range.insertNode(span);
                setFlag(!flag);
            }
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
      
    return (
        <>
            <div className='createResumeContainer'>
              
                    <Fade delay={400}>
                        

                        <div className="textContainer">
                            <Fade delay={600}> <h1> <b className="textStyle"> ATS FRIENDLY ! </b> 🤖 </h1> </Fade>
                        </div>
                        
                        <div className='buttonsStyle' style={{ marginTop:'50px',marginBottom:'5px',padding: '2px', border: '1px solid transparent', borderRadius: '5px' }}>
                            
                            <input
                                id="colorPicker"
                                type="color"
                                value={color}
                                onChange={handleColorChange}
                                style={{ 
                                    height:'36.5px',
                                    width:'60px',
                                    cursor: 'pointer',
                                    marginRight:'8px',
                                    borderRadius: '5px',
                                    borderColor:'transparent',
                                }}
                            />

                            <Button 
                                sx={{mr:1}}
                                style={{height:'36.5px',display: 'flex', justifyContent:  'flex-end'}}
                                color='inherit'
                                variant="contained"
                                startIcon={<FaBold/>}
                                onClick={handleBoldi}>
                            </Button>
                            <Button 
                                sx={{mr:1}}
                                style={{height:'36.5px',display: 'flex', justifyContent:  'flex-end'}}
                                color='inherit'
                                variant="contained"
                                startIcon={<TfiUnderline/>}
                                onClick={handleUnderlinei}>
                            </Button>

                            <input
                                type="text"
                                value={linkUrl}
                                onChange={handleLinkInputChange}
                                placeholder="Add URL"
                                onMouseUp={(e) => e.stopPropagation()}
                                style={{ width: '410px', padding:'6.5px', borderRadius:'5px', borderColor:'transparent', marginRight:'2px' }}
                            />

                            <Button   
                                sx={{mr:1, ml:1}}  
                                style={{height:'36.5px',display: 'flex', justifyContent:  'flex-end'}}
                                color='inherit'
                                variant="contained"
                                startIcon={<MdAddLink/>}
                                onClick={handleApplyLink}>
                            </Button> 

                            <CopyToClipboardButton text="•" />
                            
                            
                
                        </div>
                    
                        <PDFExport ref={pdfExportComponent}>

                            <div ref={contentRef} className="resume" onMouseUp={handleSelect}>

                                {/* className='grid-area name' */}
                                <div> 

                                    <div style={{backgroundColor:color}} className='square'>
                                        
                                        <div className='firstGroup forFirstGroup'> 
                                            <div
                                                name="fullName"

                                                
                                                aria-required="true"
                                                
                                                multiline
                                                
                                                style=
                                                {{ 
                                                    marginTop:"20px",
                                                    width:'750px',
                                                    multiline:true,
                                                    fontSize:20,
                                                    display:'flex',
                                                    // color:'white', 
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    padding: '0.2rem', 
                                                    lineHeight:"25px"}}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder="Full Name | Role"
                                                    content={ourForm.objectName.fullName}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                    onInput={(event) => {
                                                        const maxLength = 62; // Set your desired maximum length here
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                            /> 


                                            <div className="iconAndInputs" style={{marginTop:"10px"}}>

                                                

                                                
                                                <div
                                                    name="phoneNumber"
                                                    aria-required="true"
                                                    style={{textAlign:'center',width:'115px',display:'flex',justifyContent:'center', fontSize:14.5 ,marginBottom:'10px',
                                                        
                                                    padding: '0.2rem', lineHeight:"15px" }}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='Phone'
                                                    content={ourForm.objectName.phoneNumber}
                                                    onInput={(event) => {
                                                        const maxLength = 15; // max length on the world! https://worldpopulationreview.com/country-rankings/phone-number-length-by-country
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                />

                                                <div
                                                    name="email"
                                                    multiline
                                                    aria-required="true"
                                                    style={{
                                                        textAlign: 'center',width:'210px',display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center', fontSize:14.5 ,marginBottom:'10px',
                                                        // color:'white', 
                                                        padding: '0.2rem', lineHeight:"15px" }}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='Email'
                                                    content={ourForm.objectName.email}
                                                    onInput={(event) => {
                                                        const maxLength = 25; 
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                />

                                                <div
                                                    name="linkedinLink"
                                                    aria-required="true"
                                                    style={{
                                                        textAlign:'center',width:'203px',display:'flex',justifyContent:'center', fontSize:14.5 ,marginBottom:'10px',
                                                        // color:'white', 
                                                        padding: '0.2rem', lineHeight:"15px" }}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='Linkedin'
                                                    content={ourForm.objectName.linkedinLink}
                                                    onInput={(event) => {
                                                        const maxLength = 30; //'linkedin.com/in/' = base = 16 + customName = 14
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                />

                                                {/* <div
                                                    name="githubLink"
                                                    aria-required="true"
                                                    style={{textAlign:'center',width:'150px', display:'flex',justifyContent:'center', fontSize:14.5 ,marginBottom:'10px',
                                                        // color:'white', 
                                                        padding: '0.2rem', lineHeight:"15px" }}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='optional github'
                                                    content={ourForm.objectName.githubLink}
                                                    onInput={(event) => {
                                                        const maxLength = 30; // Set your desired maximum length here
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                /> */}

                                                <div
                                                    name="portfolioLink"
                                                    aria-required="true"
                                                    style={{width:'230px',display:'flex',textAlign: 'center',alignContent:'center',justifyContent:'center',alignItems:'center', fontSize:14.5 ,marginBottom:'10px',
                                                        // color:'white', 
                                                        padding: '0.2rem', lineHeight:"15px" }}
                                                    suppressContentEditableWarning={true}
                                                    contentEditable={true}
                                                    placeholder='Portfolio and / Github'
                                                    content={ourForm.objectName.portfolioLink}
                                                    onInput={(event) => {
                                                        const maxLength = 40; // 
                                                        let content = event.target.textContent;
                                                        
                                                        if (content.length > maxLength) {
                                                          content = content.slice(0, maxLength);
                                                          event.target.textContent = content;
                                                          
                                                          // Move cursor to end
                                                          const range = document.createRange();
                                                          const sel = window.getSelection();
                                                          range.setStart(event.target.childNodes[0], maxLength);
                                                          range.collapse(true);
                                                          sel.removeAllRanges();
                                                          sel.addRange(range);
                                                        }
                                                        
                                                        const sanitizedInput = sanitizeInput(content);
                                                        handleCustomChange('fieldName', sanitizedInput);
                                                      }}
                                                    // onInput={(event) => {
                                                    //     const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    //     handleCustomChange('fieldName', sanitizedInput);
                                                    // }}
                                                />
                                        </div>

    

      

                                            <TodoLeft/>

                                        
      
                                        </div>

                                    </div>

                                    <div className="grid-area work">
                                        <div
                                            required 
                                            multiline
                                            style={{marginTop:'15px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                        >
                                            WORK EXPERIENCE
                                            <hr style={{height:'2px',backgroundColor:'gray' , border:'none', borderRadius:'5px', width:'750px'}} />
                                        </div>
                                            <TodoWork/>
                                        </div>
                                    <TodoRight/>

                                <div className='afterSquareGroup forSecondGroup'>

                                    <div
                                        required 
                                        multiline
                                        style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                        >
                                            SKILLS
                                            <hr style={{height:'2px',backgroundColor:'gray' , border:'none', borderRadius:'5px', width:'750px'}} />
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
                                                style={{width:'750px',marginBottom:'20px',marginLeft:'20px', fontSize:14.5, padding: '0.2rem', lineHeight:"25px"}}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                
                                                placeholder="Programing languages, db's..."
                                                content={ourForm.objectName.GeneralKnowledge}
                                                onInput={(event) => {
                                                    const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    handleCustomChange('fieldName', sanitizedInput);
                                                }}
                                            />
                                            
                                        </div>

                                        <div
                                            type="text"
                                            name="educationHeader"
                                            required 
                                            multiline
                                            style={{marginTop:'15px',marginLeft:'18px',width:'235px',border: 'none',fontSize:16.5, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"}} 
                                            >
                                            EDUCATION
                                            <hr style={{height:'2px',backgroundColor:'gray' , border:'none', borderRadius:'5px', width:'750px'}} />
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
                                                style={{width:'750px',marginBottom:'20px',marginLeft:'20px', fontSize:14.5 , padding: '0.2rem', lineHeight:"25px" }}
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                placeholder='Knowledge, location, duration...'
                                                content={ourForm.objectName.degreeTypeAndname}
                                                onInput={(event) => {
                                                    const sanitizedInput = sanitizeInput(event.target.textContent);
                                                    handleCustomChange('fieldName', sanitizedInput);
                                                }}
                                            />
                                        </div>
                                    
                                    </div> 
                                    <TodoRight />  
                                </div>
                            </div> 
                        </PDFExport>       
                    </Fade>
                        
                    <Fade delay={800}>
                        <div>

                            
                                <Button 
                                    onClick={reactToPrintFn}
                                // content={() => pdfExportComponent.current}
                                // ref={pdfExportComponent.current}
                                    sx={
                                            [{m:1, mt:3,mb:25, backgroundColor:"rgb(250, 204, 0)",
                                        },
                                        {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                    ]}
                                        variant="contained" 
                                        color="inherit"
                                        startIcon={<PrintIcon/>}>PRINT & PDF
                                </Button>
                                
                           

                        {/* <Button 
                        sx={[
                            {m:1, mt:3,mb:25, backgroundColor:"rgb(0, 128, 255)"},
                            {'&:hover': {backgroundColor: "rgb(0, 100, 200)"}}
                        ]}
                        variant="contained" 
                        color="primary"
                        onClick={handleSaveAsDocx}
                        >
                        Save as DOCX
                        </Button> */}

                            {/* <button onClick={saveData}>Save</button> */}

                        </div>
                    </Fade>
            </div>

        {/* <div>
          <h2>Saved Resumes</h2>
          {firebaseFiles.map((file, index) => (
            <p key={index} fileUrl={file.url} fileName={file.name} >data</p>
          ))}
        </div> */}
        </>
    );
}

export default FastBuild;  