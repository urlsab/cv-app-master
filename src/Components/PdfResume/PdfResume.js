import "./PdfResume.css";
import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import ResumeTable from "../ResumeTable/ResumeTable";

const PdfResume = () => {

    // maybe put/fix to: useRef(null)
    const pdfExportComponent = useRef();
    
    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

  return (
    <div>
        <PDFExport ref={pdfExportComponent}>
            {/* <ResumeTable/> */}
        </PDFExport>
        <button style={{margin:"auto 5px"}} onClick={handleExportWithComponent}>Export to pdf </button>
    </div>
  );
}

export default PdfResume;