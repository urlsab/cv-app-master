import React from 'react';
import './Examples.css';
import Navbar from '../Navbar/Navbar';

 const Examples = () => {
  return (
    <>
      <div className='wrapExamples'>
          <Navbar/>
            <div className='imgContainer'>
                <img style={{marginBottom:"50px", marginTop:"40px"}} src="cv template example.png" width="400" height="500"></img>
                <img style={{marginBottom:"50px"}} src="cv eg 2.png" width="400" height="500"></img>
                <img style={{marginBottom:"50px"}} src="cv eg 3.png" width="400" height="500"></img>
                <img style={{marginBottom:"50px"}} src="cv eg 4.png" width="400" height="500"></img>
            </div> 
        </div>
    </>
  )
}

export default Examples;
