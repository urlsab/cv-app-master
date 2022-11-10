import React, { useState } from 'react';
import './PostUserInput.css';
import { createRandomId } from '../../utils/randomId';
import { initialState } from '../../utils/ourState';
import { arrInitialState } from '../../utils/arrOurState';
import { arrIcons } from '../../utils/allIcons';
import ResumeGrid from '../ResumeGrid/ResumeGrid';

export const textType = "text";
const arrState = arrInitialState;
const icons = arrIcons;

const PostUserInput = () =>  {

    const [ourForm, setOurForm] = useState(initialState);

    // const onSubmitForm = async () => {
    //     // make shorter and smarter conditional here for submit a full form
    //     // check if something in the form is an empty string
    //         const id = createRandomId();
    //         const form = {
    //         [id]: ourForm.objectName
    //     }
    //     const response = await axios.post('http://localhost:4000/postInput', form);
    //     console.log(response.data);
    // }

    return (
        <>
          <ResumeGrid/>
          <button>Upload To All Data</button>  
        </>
      );  
};

export default PostUserInput;
