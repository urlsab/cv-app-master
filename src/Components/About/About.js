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

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


const About = () => {

  const [txt,setTxt] = useState('');
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => { 
    setIsShown(current => !current);
  };

  
  const selection = window.getSelection();
  const selected = selection.toString();

  const navigate = useNavigate();

  const theme = 'bubble';
  const modules = {
    toolbar: ['bold', 'italic', 'underline', 'link'],
  };
  const formats = ['bold', 'italic', 'underline', 'strike'];
  const placeholder = 'type...';
  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  
  const Box = () => {
    return (
        <b>{selected}</b>  
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

          {/* 👇️ show component on click */}
          {isShown && <Box />}
          <TextField
            type="text"
            name="fullName"
            
            required 
            multiline
            placeholder='Full Name'
            className='pdfFonts'
            onClick={handleClick}
            style={ txt ? { fontWeight:'bold'} : {}}
            value={txt + selected}
            onChange={(e)=> setTxt(e.target.value.replace(selected) + selected)}
            // value={ourForm.objectName.fullName.toUpperCase()}
            // onChange={handleChange}
          />
       </div>
    </>
  )
}

export default About;




{/* 👇️ show elements on click */}
      {/* {isShown && (
        <div>
          
          <b>{selected}</b>
        </div>
      )} */}