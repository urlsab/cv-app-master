import './Logout.css';

import React , {useState, useEffect} from 'react';

import { useNavigate } from "react-router-dom";

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";

import { Button } from "@mui/material";

import { query, collection, getDocs, where, getDoc, doc } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firestoreConfig/firestoreConfig";

import Fade from 'react-reveal/Fade';

import HomeIcon from '@mui/icons-material/Home';

import { useUserAuth } from "../../Context/UserAuthContext";



const Logout = () => {

  const [info, setInfo] = useState([]);

  const [cv, setCv] = useState([]);

  // const { logOut, userData } = useUserAuth();

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const navigateToHome = () => {

    // avoid user name index in local storage + memory waste
    localStorage.clear();

    navigate("/");
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


const renderFake = () => {
  return (  
    // cv.map((el, i) =>  ( <p key={cv[i]}>{user.email} </p> ) )  
    cv.map((el, i) =>  ( <p key={cv[i]}> {cv[i].info.userName} </p> ) )                                  
  )         
}



useEffect(() => {
  
  console.log(window.localStorage);
  //getCv();
}, [user, loading, error, info]);

  return (
    <div className="logoutContainer">

      
      
      <Fade bottom delay={300}> <h1> <b className='goodBeyStyle'> YOUR GREAT CV - OUR SUCCESS </b> </h1> </Fade>

      {/* maybe add dynamic name "goodbey {userName}" */}

      {/* {cv.map((el, i) => <b key={cv[i]} className='styleName'> {cv[i].info.userName} </b>)} */}
      
      <Fade bottom delay={1100}> <h1 > <b className='goodBeyStyle'>  SEE YOU SOON {localStorage.getItem(localStorage.key(0))}  </b> 🤙 </h1>  </Fade>
      {renderFake()} 
      
      <Fade delay={900}> <Button sx={{m:3}} startIcon={<HomeIcon/>} onClick={navigateToHome} color="primary" variant="contained"> home </Button> </Fade>
    </div>
  )
}

export default Logout;
