import React, { useEffect, useState } from "react";
import "./AllResumes.css";

import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

const ResumeFirestore = () => {

    const [cv, setCv] = useState([]);

    const getCv = () => {
        const resumesCollectionRef = collection(firestoreDB, 'resumes');
        getDocs(resumesCollectionRef).then(response => {
            const displayResumes = response.docs.map (doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setCv(displayResumes);
        })
        .catch(error => console.log(error));
    }

  //   useEffect(() => {
  //     getCv();
  // }, [])
  
  return (
    <div>
       <p className="letters">All Resumes users made</p>
       <button onClick={() => getCv()}>Show All Resumes</button>
       <ol>
         {cv.map(showCv => 
           <li key={showCv.id}> {showCv.data.name} ----- {showCv.id}</li> 
        )}

       </ol>
    </div>
  );
}

export default ResumeFirestore;