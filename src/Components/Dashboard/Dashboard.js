import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { firestoreDB } from "../../config/firebase.config";
import { auth } from "../../config/firebase.config";
import { query, collection, getDocs, where } from "firebase/firestore";
import Flip from 'react-reveal/Flip';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import { Button } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Conffeti from 'react-confetti';

const Dashboard = () => {

  const [cv, setCv] = useState([]);

  //removed - error
  const [user, loading] = useAuthState(auth);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  // const navigateToErrorNoAccount = () => {
  //   navigate("/errorNoAccount");
  // }

  const navigateToCreateResume = () => {
    navigate("/postInputs");
  }

  // const navigateToShowResumes = () => {
  //   navigate("/allResumes")
  // }

  const fetchUserName = async () => {
    try {
      const q = query(collection(firestoreDB, `${user.email}`), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0];
      setName(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  async function getCv() {
    try {
      const privateCollection = collection(firestoreDB, `${user.email}` );
  
      const response  = await getDocs(privateCollection);
          
          const displayResumes = response.docs.map(doc => ({
              info: doc.data(),
              id: doc.id,
              key: doc.id
          })) 
          setCv(displayResumes);
          console.log(displayResumes[0].info.userName);
          console.log(cv);
          console.log("successfully set all cv's");
          
      }
      catch(error) {console.log(error)}; 
  }
 
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
    getCv();
    console.log(name);
  }
  // removed
  //,[user, loading, error]
);

  return (

    <>
      
      <div className="dasboardContainer">

        <Conffeti className="conffetiStyle" />      

        <div className="wordsContainer">

        {/* {cv.map((el, i) => <b key={i} className="styleName"> {cv[i].info.userName} </b>)} */}
          <Flip bottom delay={1100}><h1 style={{marginTop:'80px'}} className="greetingStyle"> WELCOME TO THE </h1></Flip>
          <Flip bottom delay={2000}><h1> <b className="greetingStyle">  RESUMES BUILDER </b> 📱 </h1></Flip>
                 
        </div>

        <div className="optionsContainer">
         
          <Fade top delay={2700}> <h1> <Jump delay={4000} duration={2000} forever={true}>👇</Jump>  </h1> </Fade>
            <div className="buttonsContainer">
              <Fade  delay={3400}> <Button style={{marginBottom:'150px'}} startIcon={<NoteAddIcon/>} onClick={navigateToCreateResume} size="medium" sx={{m:2, width:"140px", height:"60px"}} variant="contained" color="primary">CREATE CV</Button> </Fade> 
              {/* <Fade  delay={3400}> <Button startIcon={<ManageAccountsIcon/>} onClick={navigateToShowResumes} size="medium" sx={{m:2, width:"140px", height:"60px"}} variant="contained" color="warning"> MY AREA</Button> </Fade> */}
            </div> 
        </div>
          
      </div>

    </>

  );

}

export default Dashboard;