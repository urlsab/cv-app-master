import React, { useState } from "react";
import "./AllResumes.css";

import { getDocs } from "firebase/firestore";
import { cvCollection } from "../../firestoreConfig/firestoreConfig";
// import AddResume from "../AddResume/AddResume";

const ResumeFirestore = () => {

    const [cv, setCv] = useState([]);

    // fix: show whole resume object
    const getCv = () => {
        getDocs(cvCollection).then(response => {
            const displayResumes = response.docs.map(doc => ({
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
         // fix: show whole resume object : 1. like <resumetable> 
           <li key={showCv.id}> 
              <div>
                {showCv.data.firstName} 
                {showCv.data.lastName}
                {showCv.data.gender}
                {showCv.data.age}
              </div>
           </li> 
        )}
       </ol>
    </div>
  );
}

export default ResumeFirestore;