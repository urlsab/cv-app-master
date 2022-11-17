import React from "react";
import './ResumeTable.css';

const ResumeTable = () => {

    return ( 
        // improve: create <resumetable> by map()
        <div>
            <main className="wrapper">
                
                <article className="resume">

                    <section className="grid-area name">
                    <h4>NAME</h4> 
                        <b className="spaceInline"></b>
                        <b className='spaceIline'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                    </section>

                    <section className="grid-area about">
                    <h4>ABOUT</h4>
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>    
                    </section>

                    <section className="grid-area community">
                    <h4>COMMUNITY</h4>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b> 
                    </section>

                    <section className="grid-area education">
                        <h3>EDUCATION</h3>
                        <b className='contentSpaces'></b>
                    </section>

                    <section className="grid-area work">
                        <h4>EXPERIENCE</h4>   
                        <b className='contentSpaces'></b>
                        <b className='contentSpaces'></b>    
                    </section>

                    <section className="grid-area photo">
                        <h4>SIDEPROJECT</h4> 
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b> 
                    </section>

                    <section className="grid-area skills">
                    <h4>SKILLS</h4>
                        <b className='contentSpaces'></b> 
                        <b className='contentSpaces'></b>   
                    </section>
                </article>
            </main>
        </div>
    );
}

export default ResumeTable;