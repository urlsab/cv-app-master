import React from 'react';
import PdfResume from '../PdfResume/PdfResume';
import ResumeTable from '../ResumeTable/ResumeTable';

const CreatePdfResume = () => {

    return (
        <div>
            <ResumeTable/>
            <PdfResume/>
        </div>
    );

}

export default CreatePdfResume