import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEryolwTvi751-v2evqPUquUvlcugNys8",
  authDomain: "resumes-builder.firebaseapp.com",
  databaseURL: "https://resumes-builder-default-rtdb.firebaseio.com",
  projectId: "resumes-builder",
  storageBucket: "resumes-builder.appspot.com",
  messagingSenderId: "235192135514",
  appId: "1:235192135514:web:ea64088e39ac83740d0d63"
};
  
const app = initializeApp(firebaseConfig); 
export const firestoreDB = getFirestore(app);