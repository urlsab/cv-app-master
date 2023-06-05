import "./Dashboard.css";

import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { auth } from "../../firestoreConfig/firestoreConfig";

import useWindowSize from 'react-use/lib/useWindowSize';

import UseAnimations from "react-useanimations";
import visibility from 'react-useanimations/lib/visibility';

import { query, collection, getDocs, where, getDoc, doc } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

import Pulse from 'react-reveal/Pulse';
import RubberBand from 'react-reveal/RubberBand';
import Flip from 'react-reveal/Flip';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import Flash from 'react-reveal/Flash';

import { Button } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Conffeti from 'react-confetti';

const Dashboard = () => {

  const [cv, setCv] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const navigateToErrorNoAccount = () => {
    navigate("/errorNoAccount");
  }

  const navigateToCreateResume = () => {
    navigate("/postInputs")
  }

  const navigateToShowResumes = () => {
    navigate("/allResumes")
  }

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
        console.log("successfully set all docs");

      // setter
      localStorage.setItem("userName",displayResumes[0].info.userName);

      // getter
      localStorage.getItem(displayResumes[0].info.userName);

      console.log(localStorage);

      console.log("save user name on local storage successfully");
    })
    .catch(error => console.log(error)); 
}
 
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();

    getCv();

  }, [user, loading, error]);

  return (

    <>
      
      <div className="dasboardContainer">

      {/* width={widthSize} height={heightSize} */}

        <Conffeti className="conffetiStyle" />      

        <div className="wordsContainer">
        
        {/* {cv.map((el, i) => cv[0].info.userName !== '' ? <Flip bottom delay={1100}><h1 className="greetingStyle"> WELLCOME  <b className="styleName">{cv[0].info.userName} </b></h1></Flip>
        :navigateToErrorNoAccount()
        )} */}

          <Flip bottom delay={1100}><h1 className="greetingStyle"> WELLCOME  {cv.map((el, i) => <b key={i} className="styleName"> {cv[i].info.userName} </b>)} </h1></Flip>
          <Flip bottom delay={2000}><h1> <b className="greetingStyle"> TO THE CVA </b> 📱 </h1></Flip>
                 
        </div>

        <div className="optionsContainer">
         
          <Fade top delay={2700}> <h1> <Jump delay={4000} duration={2000} forever={true}>👇</Jump>  </h1> </Fade>
            <div className="buttonsContainer">
              <Fade  delay={3400}> <Button startIcon={<NoteAddIcon/>} onClick={navigateToCreateResume} size="medium" sx={{m:2, width:"140px", height:"60px"}} variant="contained" color="primary">CREATE CV</Button> </Fade> 
              <Fade  delay={3400}> <Button startIcon={<ManageAccountsIcon/>} onClick={navigateToShowResumes} size="medium" sx={{m:2, width:"140px", height:"60px"}} variant="contained" color="warning"> MY AREA</Button> </Fade>
            </div> 
        </div>
          
      </div>

    </>

  );

}

export default Dashboard;