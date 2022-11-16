import React from "react";
import './InputsForm.css';

import { arrInitialState } from '../../utils/arrOurState';
import { initialState } from "../../utils/ourState";
import { useState } from "react";

import SubmitInput from "../SubmitInput/SubmitInput";

// import { addDoc } from "firebase/firestore";
// import { cvCollection } from "../../firestoreConfig/firestoreConfig";
// import PdfResume from "../PdfResume/PdfResume";
// import ResumeTable from "../ResumeTable/ResumeTable";
// import ToggleResumeTable from "../ToggleResumeTable/ToggleResumeTable";

const arrState = arrInitialState;

const InputsForm = () => {

    const [ourForm, setOurForm] = useState(initialState);
    // const [toggle, setToggle] = useState(false);

    // const handleAddResume = (event) => {
    //     event.preventDefault();
    //     // firestoreDB making auto id for any object
    //     // add: the whole data to firestoreDB
    //         addDoc(cvCollection, ourForm.objectName).then(response => {
    //             console.log(ourForm.objectName);
    //             console.log(response);
    //             //mayby: we use the path for each user id
    //             console.log(response.id);
    //             //mayby: we use the path for each user resumes
    //             console.log(response.path);
    //         }).catch(error => {
    //             console.log(error);
    //     })
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOurForm(prevState => ({
            objectName: {
                ...prevState.objectName,
                [name]: value
            },
        }))
        // maybe add: return something
    };

    const renderInputs = () => {

        return (
            arrState.map(i =>
                (
                    <input
                        key={i}
                        type="text"
                        name={i}
                        placeholder={i}
                        maxLength={40}
                        value={ourForm.objectName[i]}
                        required
                        onChange={handleChange}
                        style={{width:"150px"}}
                    />
                )
            )
        );   
    }

    //SubmitInputForm

    return (
        // className="InputsFormStyle"
        <div style={{margin:"auto 30px"}}>
            <form>
            <br/>
            {renderInputs()}
            <br/>
            {/* <SubmitInput/> */}
            {/* <button style={{margin:"10px 20px 10px 20px", padding: "2px", width:"70px", height:"40px"}} type="submit">Save Resume</button> */}
            </form>

            <br/>
            {/* <ToggleResumeTable/> */}
            {/* <button style={{margin:"40px 500px", padding: "1px", width:"90px", height:"40px"}} onClick={() => setToggle(!toggle)} >
                See Resume
            </button>

            <br/>
            {toggle && (<ResumeTable/>)} */}
            {/* or: {toggle && (<PdfResume/>)} */}

            {/* <button style={{margin:"10px 20px 10px 20px", padding: "2px", width:"90px", height:"40px"}} onClick={() => handleChange()}>pass inputs to resume</button>  */}
        </div>
    );

}

export default InputsForm;