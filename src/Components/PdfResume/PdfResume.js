import "./PdfResume.css";
import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import ResumeTable from "../ResumeTable/ResumeTable";

const PdfResume = () => {

    // maybe change to: useRef(null)
    const pdfExportComponent = useRef();
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

  return (
    <div>
        {/* improve: create generic <exportPdf> to any <component> */}
        <PDFExport ref={pdfExportComponent}>

        {/* typing inside <inputForm> ---> will show up on <resumeTable> in <PdfResume> = here */}
            <ResumeTable/>
        </PDFExport>
        <button 
          style={{margin:"10px 20px 10px 20px", 
          padding: "2px", width:"70px", height:"40px"}} 
          onClick={handleExportWithComponent}>Export to pdf
        </button>
    </div>
  );
}

export default PdfResume;