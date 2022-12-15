import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { firestoreDB } from "../../firestoreConfig/firestoreConfig";
import { auth } from "../../firestoreConfig/firestoreConfig";

import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, error]);

  return (
    <div className="dashboard">
      <Navbar/>
       <div className="dashboard__container">
        Logged in as
         {/* <div>{name}</div> */}
         <div>{user?.email}</div>
         <h1> wellcome </h1>
         <h2> now you can create, download and see your resumes</h2>
         <h3> and all for free</h3>
       </div>
     </div>
  );

}

export default Dashboard;