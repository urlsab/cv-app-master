import './Entry.css';

import React from 'react';

import { Fade } from 'react-reveal';

import EntryNavbar from '../EntryNavbar/EntryNavbar';

const Entry = () => {

    return (
        <>
            <div className='engine'>

                <EntryNavbar/>

                <div className='both'>
                    
                    <div className='headersStyle'>
                        <Fade delay={300} bottom><h1>  <b className='styleHeader'> WELL COME TO THE CV APP WEBSITE </b>  </h1> </Fade>
                        <Fade delay={600} bottom> <h1>  <b className='styleHeader'>  HERE YOU WILL BUILD CV FOR FREE </b> </h1> </Fade>
                        <Fade delay={900} bottom> <h1>  <b className='styleHeader'>  FASTER THAN YOU THINK </b> 🚀 </h1> </Fade>
                    </div>

                    <div className='symbolStyle'>
                        {/* 👁️🌊 */}
                        <Fade delay={1200} bottom> 
                            <h1 className='styleHeader' > 
                                <img style={{height:"100px", width:"100px"}} src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/64/null/external-cv-human-resources-kmg-design-outline-color-kmg-design.png"/>
                                {/* <img style={{height:"100px", width:"100px"}} src="https://img.icons8.com/external-vectorslab-flat-vectorslab/53/null/external-Giving-CV-human-resource-vectorslab-flat-vectorslab.png"/>  */}
                            </h1> 
                        </Fade>
                    </div>

                </div>
                

            </div>
        </>
        
    );

}

export default Entry;