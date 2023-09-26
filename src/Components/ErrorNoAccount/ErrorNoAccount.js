import React from 'react';

import './ErrorNoAccount.css';

import Fade from 'react-reveal/Fade';

const ErrorNoAccount = () => {
  
  return (
    <>
        <div className='errorNoAccountContainer'>
            <Fade top delay={300}>  <h1> <b className='mesStyle' > IF YOU ARE HERE </b> 🏁 </h1> </Fade>
            <Fade top delay={600}>  <h1 > <b className='mesStyle'> YOU DON'T HAVE AN ACCOUNT </b> ⛔ </h1> </Fade>
            <Fade top delay={900}><a className='createLinkStyle' href='/register' > CREATE AN ACCOUNT </a> </Fade>
        </div>
        
    </>
  )
}

export default ErrorNoAccount
