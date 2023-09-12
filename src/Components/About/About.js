import './About.css';
import React,{useState, useRef} from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EntryNavbar from '../EntryNavbar/EntryNavbar';

import Quill from '../Quill/Quill';

import TextField from '@mui/material/TextField';

const About = () => {

  const contentRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isLine, setIsline] = useState(false);
  const [isLink, setIslink] = useState(false);

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

  

  
  const [content, setContent] = useState('Editable content goes here');

  // const toggleBold = () => {
  //   setIsBold(!isBold);
  // };

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
  };

  const contentStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
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

  const myRef = React.createRef();

  const inputsHandler = (e) =>{
    setValue( {value: e.target.value} )
}

// if (event.key === 'q') {
      
// }


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

function Box() {

  return (
    <div>
      <b>box </b>
    </div>
  );
}

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


          
          
      <div
        inputRef={contentRef}
        onClick={toggleBold}
        onDoubleClick={toggleLine}
        // onClick={toggleLink}
        contentEditable={true}
        style={{ border: '1px solid #ccc', minHeight: '50px' }}
      >
        bold yu kj  ghg rt 
      </div>
          

          <TextField
            type="text"
            placeholder="type" 
            inputRef={myRef}
            onChange={inputsHandler} 
            onClick={consoleText}
          />



          

          {/* 👇️ show elements on click */}
      {isShown && (
        <div>
          <b>some content</b>
        </div>
      )}

      {/* 👇️ show component on click */}
      {isShown && <Box />}

      

      {/* <div contentEditable id="text">
        The World Before the Flood is an oil-on-canvas painting
      </div>
      <button id="bold_button" onClick={handleBoldClick}>Bold</button> */}
    

          {/* <TextField
              label="Type here"
              variant="outlined"
              fullWidth
              onFocus={handleFocus}
              onBlur={handleBlur}
              InputProps={{
                style: {
                  // textDecoration: isFocused ? 'underline' : 'none',
                  fontWeight:  isFocused ? 'bold' : 'normal'
                },
              }}
            /> */}

          {/* <Quill/> */}

        </div>
    </>
  )
}

export default About;

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