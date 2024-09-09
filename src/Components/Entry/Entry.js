import './Entry.css';
import React from 'react';
import { Fade } from 'react-reveal';
// import EntryNavbar from '../EntryNavbar/EntryNavbar';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import HandymanIcon from '@mui/icons-material/Handyman';
import { useLayoutEffect } from 'react';

const Entry = ({setShowNavbar}) => {

    useLayoutEffect(() => {
        setShowNavbar(true);
    })

    const navigate = useNavigate();

    const navigateToCreateResume = () => {
        navigate("/fastBuild");
    }

    return (
        <>
            <div className='engine'>

                {/* <EntryNavbar/> */}

                <div className='both'>
                    
                    <div className='headersStyle'>
                        <Fade delay={300} bottom><h1>  <b className='styleHeader'> WELCOME TO THE RESUME BUILDER APP </b>  </h1> </Fade>
                        <Fade delay={600} bottom> <h1>  <b className='styleHeader'>  BUILD NOW AMAZING RESUMES </b> </h1> </Fade>
                        <Fade delay={900} bottom> <h1>  <b className='styleHeader'>  FASTER THAN YOU THINK </b> 🚀 </h1> </Fade>
                    </div>

                    <div className='symbolStyle'>
                        <Fade delay={1200} bottom> 
                            <h1> 
                                {/* <img alt="svg" style={{height:"100px", width:"100px"}} src="https://img.icons8.com/external-vectorslab-flat-vectorslab/53/null/external-Giving-CV-human-resource-vectorslab-flat-vectorslab.png"/> */}
                                <Fade delay={1400} bottom> <Button startIcon={<HandymanIcon/>} onClick={navigateToCreateResume} size="medium" sx={{m:2, width:"140px", height:"60px", mb:14}} variant="contained" color="primary">BUILD NOW</Button> </Fade> 
                            </h1> 
                        </Fade>
                    </div>

                </div>
                
            </div>
        </>
        
    );

}

export default Entry;