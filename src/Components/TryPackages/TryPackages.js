import React from "react";
import "./TryPackages.css";

const TryPackages = () => {
  
  return (
    <div>
       <p>from try TryPackages</p>
    </div>
  );
}

export default TryPackages;

//ABOVE RETURN

// import { useRef, useState, useEffect } from "react";
// import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

// const [layoutSelection, setLayoutSelection] = useState({
    //     text: "A4",
    //     value: "size-a4"
    //   });
    
    //     const [ourForm, setOurForm] = useState(initialState);
    
    //     const handleChange = (event) => {
    //         const { name, value } = event.target;
    //         setOurForm(prevState => ({
    //             objectName: {
    //                 ...prevState.objectName,
    //                 [name]: value
    //             },
    //         }));
    //     };
    
    //     const renderInputs = () => {
    //         return (
    //             arrState.map(i =>
    //                 (
    //                     <input
    //                         key={i}
    //                         type={textType}
    //                         name={i}
    //                         placeholder={i}
    //                         value={ourForm.objectName[i]}
    //                         maxLength={40}
    //                         onChange={handleChange}
    //                     />
    //                 )
    //             )
    //         );   
    //     }
    
    //   const updatePageLayout = event => {
    //     setLayoutSelection(event.target.value);
    //   };
    
    //   const pdfExportComponent = useRef(null);
    
    //   const handleExportWithComponent = event => {
    //     pdfExportComponent.current.save();
    //   };

//INSIDE THE RETURN

// {renderInputs()}
// <div className="style">
//   <PDFExport ref={pdfExportComponent}>
//     <div className="style">
//       <div className="style">
//         <div className="style">
//           <span className="style">
//              Blauer
//             See Delikatessen
//           </span>
//           <span className="style">Invoice #23543</span>
//         </div>
        
//         <div className="style">
//           {ourForm.objectName.age}
//           {icons[0]}
//         </div>
        
//         <div className="style">
//           <div/>
//           <h4>Export PDF</h4>
              
//         </div>
//       </div>
//     </div>
//   </PDFExport>
  
// </div>
// <button onClick={handleExportWithComponent}>Export to pdf </button>