import './About.css';
import React,{useState, useRef} from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EntryNavbar from '../EntryNavbar/EntryNavbar';

import Quill from '../Quill/Quill';

import TextField from '@mui/material/TextField';

import { useQuill } from 'react-quilljs';
// import TextField from '@mui/material/TextField';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const About = () => {

  const theme = 'bubble'; // options when hover

  const modules = {
    toolbar: ['bold', 'italic', 'underline', 'link'],
  };

  const formats = ['bold', 'italic', 'underline', 'strike'];

  const placeholder = 'type...';

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  const contentRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isLine, setIsline] = useState(false);
  const [isLink, setIslink] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const toggleBold = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (range) {
      const selectedText = range.toString();
      const boldText = isBold ? selectedText : `<strong>${selectedText}</strong>`;
      
      // Create a DocumentFragment to hold the bold text
      const fragment = document.createRange().createContextualFragment(boldText);

      // Replace the selected text with the bold text
      range.deleteContents();
      range.insertNode(fragment);

      setIsBold(!isBold);
    }
  };

  const toggleLine = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (range) {
      const selectedText = range.toString();
      const lineText = isLine ? selectedText : `<u>${selectedText}</u>`;
      
      // Create a DocumentFragment to hold the bold text
      const fragment = document.createRange().createContextualFragment(lineText);

      // Replace the selected text with the bold text
      range.deleteContents();
      range.insertNode(fragment);

      setIsline(!isLine);
    }
  };

  const toggleLink = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (range) {
      const selectedText = range.toString();
      const linkText = isLink ? selectedText : `<a>${selectedText}</a>`;
      
      // Create a DocumentFragment to hold the bold text
      const fragment = document.createRange().createContextualFragment(linkText);

      // Replace the selected text with the bold text
      range.deleteContents();
      range.insertNode(fragment);

      setIslink(!isLink);
    }
  };

  

  const contentStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
  };

  const contentLine = {
    textDecoration: isBold ? 'underline' : 'none',
  };


  const navigate = useNavigate();

  const [isShown, setIsShown] = useState(false);

  const [state, setValue] = useState({value: ""});
  const [isFocused, setIsFocused] = useState(false);

  

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const textBoldRef = useRef(null);
  const aRef = useRef(null);
  const textUnderlineRef = useRef(null);

  const [selectedText, setSelectedText] = useState('');
  const [link, setLink] = useState('');
  const [selectedBoldText, setSelectedBoldText] = useState('');

  const handleLinkSelection = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const text = range.toString();

    // Check if the selected text is not empty and a link is provided
    if (text && link) {
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.appendChild(document.createTextNode(text));
      range.deleteContents();
      range.insertNode(linkElement);
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleboldChange = (e) => {
    setSelectedBoldText(e.target.value);
  };

  const handleBoldSelection = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const boldText = document.createElement('strong');
    boldText.appendChild(document.createTextNode(selectedText));
    range.deleteContents();
    range.insertNode(boldText);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
  };

  const handleUnderlineSelection = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const underlineText = document.createElement('u');
    underlineText.appendChild(document.createTextNode(selectedText));
    range.deleteContents();
    range.insertNode(underlineText);
  };

  const myRef = React.createRef();

  const inputsHandler = (e) =>{
    setValue( {value: e.target.value} )
}

const [inputValue, setInputValue] = useState('');
  const [isBoldi, setIsBoldi] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleBoldi = () => {
    setIsBoldi(!isBoldi);
  };

  const renderText = () => {
    if (isBoldi) {
      return <strong>{inputValue}</strong>;
    } else {
      return inputValue;
    }
  };

// if (event.key === 'q') {
      
// }

const handleFocusi = event => {
  event.preventDefault();
  const { target } = event;
  const extensionStarts = target.value.lastIndexOf('.');
  target.focus();
  target.setSelectionRange(0, extensionStarts);
}

// console.log(selectedText);
  const consoleText = (event) => {
    const txt = 'hi';
    const textVal = myRef.current;
    const cursorStart = textVal.selectionStart;
    const cursorEnd = textVal.selectionEnd;
    const selectedText = state.value.substring(cursorStart,cursorEnd); 
    const makestr = selectedText.toString();
    console.log(makestr, txt);
    setIsShown(current => !current);
    
};

  return (
    <>
        
        <div className='aboutContainer'>
        <EntryNavbar/>
          <div className='allText'>
            <Fade delay={400} top><h1 className='symbolAndText'>  <b className='textStyle'> CVA IS A FREE APP FOR BUILD AND DESIGN CV </b></h1></Fade>
            <Fade delay={800} top><h1 className='symbolAndText'>  <b className='textStyle'> INCLUDES FEATURES WITH FRIENDLY USE </b></h1></Fade>
            <Fade delay={1200} top> <h1 className='symbolAndText' >  <b className='textStyle'> CONTACT US FOR ANY PURPOSE </b> 📞 </h1></Fade>  
          </div>

          <div className='aboutButton'>
            <Fade delay={1600} top> <Button startIcon={<ForwardToInboxIcon/>} sx={{m:4}} size="large" onClick={() => navigate("/contact")} color="primary" variant="contained"> TO CONTACT </Button> </Fade>
          </div>
 
      <TextField
        variant="outlined"
        label="Type here"
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleBoldi}
        multiline
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        InputProps={{
          style: {
            fontWeight: isBoldi ? 'bold' : 'normal',
          },
        }}
      />
   
      <div
        inputRef={contentRef}
        onClick={toggleBold}
        onDoubleClick={toggleLine}
        // onClick={toggleLink}
        contentEditable={true}
        style={{ border: '1px solid #ccc', minHeight: '50px' }}
      >
        bold  
      </div>
          

          <TextField
            type="text"
            placeholder="type" 
            inputRef={myRef}
            onChange={inputsHandler} 
            onClick={consoleText}
          />

       <p ref={aRef} onMouseUp={handleTextSelection}>
         {' '}
         link that aa
       </p>

      <TextField
        type="text"
        placeholder="Enter a link"
        value={link}
        onChange={handleLinkChange}
      />
      <button onClick={handleLinkSelection} disabled={!selectedText}>
        Link Selected Text
      </button>

      {isHovering && (
          <div>
            <div
              ref={quillRef}
              className="bubble-editor"
              style={{display:'flex', height: '100px', border: 'none' }}
            />
            <h1>hi</h1>
            <Quill/>
          </div>
        )}

          <Quill/>

        </div>
    </>
  )
}

export default About;