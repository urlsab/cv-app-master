// import React from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// collection, query, getDocs, where, addDoc

// import { useAuthState,UpdatePasswordHook,useUpdatePassword,useUpdateProfile } from "react-firebase-hooks/auth";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // hide srtings with .env
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DB_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`,
  appId: `${process.env.REACT_APP_API_ID}`
};
  
const app = initializeApp(firebaseConfig); 
export const firestoreDB = getFirestore(app);
export const auth = getAuth(app);
export default app;

// const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(firestoreDB, "resumes"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(firestoreDB, "resumes"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };