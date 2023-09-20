import './About.css';
import React, { useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EntryNavbar from '../EntryNavbar/EntryNavbar';

import TextField from '@mui/material/TextField';

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


const About = () => {

  const theme = 'bubble';
  const modules = {
    toolbar: ['bold', 'italic', 'underline', 'link'],
  };
  const formats = ['bold', 'italic', 'underline', 'strike'];
  const placeholder = 'type...';
  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  const [txt,setTxt] = useState('');
  const [isShown, setIsShown] = useState(false);
  const selection = window.getSelection().toString();
  const navigate = useNavigate();

  // bold only label text that we choose before
  const boldTextParser = (text) => {
    const choose = window.getSelection().toString();
    let i = 0;
    let l = 0;
    let renderables = [];
    let boldtext = '';
  
    for (i = 0; i < text.length; i += 1) {
      if (text[i] === ' ') {
        renderables.push(text[i]);
  
        if (text[i + 1] === '(') {
        // hold boldtext in a variable
          let isBoldTextFound = false;
          while (!isBoldTextFound) {
            for (l = i + 2; l < text.length; l += 1) {
              if (text[l] !== ')') {
                boldtext = boldtext.concat(text[l]);
              } else if (text[l] === ')') {
                isBoldTextFound = true;
                break;
              }
            }
          }
          // put bold text in rendables and update position in string
          renderables.push(
            <strong>
              {boldtext}
            </strong>,
          );
          // reset variables
          boldtext = '';
          i = l + 1;
        }
      }
      renderables.push(text[i]);
    }
    return renderables;
  };

  const handleClick = (event) => {
    // How to bring those line to work together ?
    const selection = window.getSelection().toString();
    event.target.style.fontWeight = 'bold';
    console.log(selection);
    setIsShown(current => !current);
  };
    
  
  return (
    <>
  
        <div className='aboutContainer'>
        <EntryNavbar/>
          <div className='allText'>
            <Fade delay={400} top><h1 className='symbolAndText'> <b className='textStyle'> CVA IS A FREE APP FOR BUILD AND DESIGN CV </b></h1></Fade>
            <Fade delay={800} top><h1 className='symbolAndText'> <b className='textStyle'> INCLUDES FEATURES WITH FRIENDLY USE </b></h1></Fade>
            <Fade delay={1200} top> <h1 className='symbolAndText'> <b className='textStyle'> CONTACT US FOR ANY PURPOSE </b> 📞 </h1></Fade>  
          </div>

          <div className='aboutButton'>
            <Fade delay={1600} top> <Button startIcon={<ForwardToInboxIcon/>} sx={{m:4}} size="large" onClick={() => navigate("/contact")} color="primary" variant="contained"> TO CONTACT </Button> </Fade>
          </div>

          <TextField
            type="text"
            name="fullName"
            required 
            multiline
            placeholder='Full Name'
            className='pdfFonts'
            onDoubleClick={handleClick}
            value={txt}
            onChange={(e)=> setTxt(e.target.value + selection)}
          />

          <TextField 
          // onChange={(e)=> setTxt(e.target.value)} 
            label={boldTextParser(selection)} 
          />

          <TextField 
            label={boldTextParser('use (label) and (not) defaultValue')} 
          />

       </div>
    </>
  )
}

export default About;