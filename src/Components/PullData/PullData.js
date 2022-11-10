import React, { useEffect, useState, useRef} from 'react';
import { getAllResumesData } from '../../api/resume';
import './PullData.css';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const PullData = () => {
    const [resumeData, setResumeData] = useState([]);

    const pdfExportComponent = useRef(null);
    
      const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAllResumesData();
            setResumeData(data);
        }
        getData();
    }, [])

    const renderData = () => {
        return resumeData.map(element => {
                const id = Object.keys(element)[0]; // GRAB THE OBJECTNAME - ITS THE ID...
                const resumeFields = element[id];

                return (
                    <ul key={id}>
                        <PDFExport key={id} ref={pdfExportComponent}>
                        <p key={id} className="itemStyle">{JSON.stringify(resumeFields)}</p>
                        {/* prints only the last cv - why? */}
                        </PDFExport>
                        <button onClick={handleExportWithComponent}>Export to pdf </button>
                    </ul>
                )
            }
        )
    }

    return (
        <div className='styledResumeData'>
            <p>all resumes</p>
            {renderData()}
        </div>
    )
}

export default PullData;