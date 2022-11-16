import React from "react";

import { initialState } from "../../utils/ourState";
import { useState } from "react";

import { addDoc } from "firebase/firestore";
import { cvCollection } from "../../firestoreConfig/firestoreConfig";

const SubmitInput = () => {

    const [ourForm, setOurForm] = useState(initialState);

    const handleAddResume = (event) => {
        event.preventDefault();
        // firestoreDB making auto id for any object
        // add: the whole data to firestoreDB
            addDoc(cvCollection, ourForm.objectName).then(response => {
                console.log(ourForm.objectName);
                console.log(response);
                //mayby: we use the path for each user id
                console.log(response.id);
                //mayby: we use the path for each user resumes
                console.log(response.path);
            }).catch(error => {
                console.log(error);
        })
    };

    return (
        <div>
            <button type="submit" onClick={handleAddResume}>submit</button>
        </div>
    );

}

export default SubmitInput;