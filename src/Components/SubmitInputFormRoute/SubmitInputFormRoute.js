import React from "react";

import InputsForm from "../InputsForm/InputsForm";
import SubmitInput from "../SubmitInput/SubmitInput";
import CreatePdfResume from "../CreatePdfResume/CreatePdfResume";


const SubmitInputFormRoute = () => {

    return(
        <div>
            <InputsForm/>
            <SubmitInput/>
            <br/>
            <CreatePdfResume/>
        </div>
    );

}

export default SubmitInputFormRoute;