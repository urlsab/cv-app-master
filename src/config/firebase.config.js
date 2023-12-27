import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";


/**
    REACT_APP_API_KEY=AIzaSyCEryolwTvi751-v2evqPUquUvlcugNys8

    REACT_APP_AUTH_DOMAIN=resumes-builder.firebaseapp.com

    REACT_APP_DB_URL=https://resumes-builder-default-rtdb.firebaseio.com

    REACT_APP_PROJECT_ID=resumes-builder

    REACT_APP_STORAGE_BUCKET=resumes-builder.appspot.com

    REACT_APP_SENDER_ID=235192135514

    REACT_APP_API_ID=1:235192135514:web:87d29f46541b32550d0d63
   */

// const firebaseConfig = {
//   apiKey: "AIzaSyCEryolwTvi751-v2evqPUquUvlcugNys8",
//   authDomain: "resumes-builder.firebaseapp.com",
//   databaseURL: "https://resumes-builder-default-rtdb.firebaseio.com",
//   projectId: "resumes-builder",
//   storageBucket: "resumes-builder.appspot.com",
//   messagingSenderId: "235192135514",
//   appId: "1:235192135514:web:87d29f46541b32550d0d63"
// };

// config of resume-builder app on firbase console
const firebaseConfig = {  
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DB_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`,
  appId: `${process.env.REACT_APP_API_ID}`
};

export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);

// UPDATE METHOD FOR AVOID CONNECTION FIRESTORE PROBLEMS
export const firestoreDB = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

/* 

TO DEPLOY COMMAND:

  firebase login
  firebase init
  firebase deploy

*/