import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

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