import "./AllResumes.css";
import React, { useState, useRef } from "react";

import { collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { useToggle } from "../../utils/useToggle";

import { PDFExport } from "@progress/kendo-react-pdf";
import Navbar from "../Navbar/Navbar";

import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';

import { Button } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firestoreConfig/firestoreConfig";
// import { pdf } from "@progress/kendo-drawing";

const AllResumes = () => {

    const [printIndex, setPrintIndex] = useState(-1);
    const pdfExportRef = useRef(null);

    const [cv, setCv] = useState([]);
    const [toggle, setToggle] = useToggle();
    
    const [user] = useAuthState(auth);

    const pdfExportComponent = cv.map((i) => React.createRef(i));
    
    const handleExportWithComponent = (data) => {
        pdfExportComponent.current.save();
        console.log(data);
    };

    // const pdfExportComponent = cv.map((ref) => pdfExportRef);

    const exportPDF = (i) => {
        console.log(pdfExportComponent[i]);
        pdfExportComponent[i].current.save();
    };

    const handleEditResume = (id) => {
        updateDoc(doc(firestoreDB,`${user.email}`, id ), {address:16}).then(res => {
            console.log(res);
            
            window.location.reload(false);
        })
        .catch(error => console.log(error)); 
}

    const handleDeleteDoc = (id) => {
        
        deleteDoc(doc(firestoreDB,`${user.email}`, id )).then(response => {
            console.log("successfully deleted");
            
            window.location.reload(false);
        })
        .catch(error => console.log(error)); 
    }

    const getCv = async () => {

        const privateCollection = collection(firestoreDB, `${user.email}` );

        await getDocs(privateCollection).then(response => {
            
            const displayResumes = response.docs.map(doc => ({
                info: doc.data(),
                id: doc.id,
                key: doc.id
            })) 
            setCv(displayResumes);
            console.log(displayResumes[0].info.userName);
            console.log("successfully set all cv's");
           
            
        })
        .catch(error => console.log(error)); 
    }
    
        let arrRefs = [];
        arrRefs.length = cv.length;
        console.log(`arrRefs length is ${arrRefs.length}`);

    const renderFake = () => {

        return (

            <div className="resumesShowStyle"> 

                <ol className="olStyle"> 
                {/* el = cv[i] */}
                    {
                        cv.map((el, i) => 
                        
                            <li className="liStyle" key={el.id}>
                                <PDFExport key={el.id} ref={pdfExportComponent[i]}>
                                <p key={cv[i]}>{cv[i].info.fullName}</p>
                                    <p>{cv[i].info.gpa}</p>
                                    <p>{cv[i].info.userName} </p>
                                
                                </PDFExport>

                                <div className="threeButtonsStyle">
                                        
                                    <Button 
                                        key={el.id}
                                        color="error"
                                        variant="contained"
                                        sx={{m:1}}
                                        startIcon={<DownloadIcon/>}

                                        onClick={() => exportPDF(i)}>PDF 
                                    </Button>

                                    <ReactToPrint trigger={() => 
                                        <Button 
                                        sx={
                                            [{m:1, backgroundColor:"rgb(250, 204, 0)",
                                        },
                                        {'&:hover': {backgroundColor: "rgb(250, 184, 0)"}}
                                    ]}
                                            variant="contained" 
                                            color="inherit"
                                            startIcon={<PrintIcon/>}>PRINT</Button>} 
                                            content={() => pdfExportComponent.current}
                                        />
                                    
                                    <Button
                                        color="inherit"
                                        sx={{m:1}}
                                        variant="contained"
                                        startIcon={<EditIcon/>}
                                        onClick={ () => { handleEditResume(el.id); }}>edit
                                    </Button>

                                    <Button
                                        startIcon={<DeleteIcon/>}
                                        color="info"
                                        sx={{m:1, backgroundColor:"rgb(20,75,170)"}}
                                        variant="contained"
                                        onClick={ () => { handleDeleteDoc(el.id); }}>Delete
                                        
                                    </Button>

                                    

                                </div>

                            </li>        
                        ) 
                    }
                </ol>
    </div>
    )         
}
        
  

  return (

    <>
        
        <div className="allResumesContainer">

            <Navbar/>
            
            <div className="headersContainer">   
                {/* ✔️ */}
             
                <LightSpeed left delay={300}><h1> 📝 <b className="textStyle">EDIT & UPDATE </b>  </h1> </LightSpeed>
                <LightSpeed left delay={600}><h1> 🚮 <b className="textStyle">DELETE FOREVER </b>  </h1> </LightSpeed>
                <LightSpeed left delay={900}><h1> 📥 <b className="textStyle">DOWNLOAD AS PDF  </b>  </h1> </LightSpeed>
                <LightSpeed left delay={1200}><h1> 📃 <b className="textStyle">PRINT IMMEDIATELY </b>  </h1> </LightSpeed>
            </div>

                {toggle ?
            
                    <div className="hideButtonStyle">

                        <Fade delay={300}>  <Button sx={{m:3}} size="large" startIcon={<VisibilityOffIcon/>} variant="contained" color="secondary" onClick={setToggle}> Hide collection  </Button> </Fade>

                        {renderFake()}

                    </div>

                    : <Fade delay={300}>  <Button sx={{m:3}} startIcon={<VisibilityIcon/>} size="large" variant="contained" color="warning" onClick={ () => { setToggle(); getCv(); } }> Show collection  </Button> </Fade>
                    
   

                }

        </div>

    </>

  );

}

export default AllResumes;