import React, { useEffect, useState } from "react";
import "./ResumeFirestore.css";

import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

const ResumeFirestore = () => {

    const [cv, setCv] = useState([]);

    useEffect(() => {
        getCv();
    }, [])

    const getCv = () => {
        const resumesCollectionRef = collection(firestoreDB, 'resumes');
        getDocs(resumesCollectionRef).then(response => {
            const displayResumes = response.docs.map (doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setCv(displayResumes);
        })
        .catch(error => console.log(error));
    }
  
  return (
    <div>
       <p className="letters">Resume Firestore</p>
       <button onClick={() => getCv()}>refresh cv's</button>
       <ul>
         {cv.map(showCv => 
           <li key={showCv.id}>{showCv.data.name} ----- {showCv.id}</li> 
        )}

       </ul>
    </div>
  );
}

export default ResumeFirestore;