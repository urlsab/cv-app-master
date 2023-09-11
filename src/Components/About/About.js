import './About.css';
import React,{useState} from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EntryNavbar from '../EntryNavbar/EntryNavbar';

import Quill from '../Quill/Quill';

import TextField from '@mui/material/TextField';

const About = () => {

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
    const selectedText = state.value.substring(cursorStart,cursorEnd).bold(); 
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