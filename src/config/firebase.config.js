import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

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
export const firestoreDB = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

/* 

TO DEPLOY, COMMAND:

after any deploy to github desktop - do this (otherwise the api will be undefined  d567[]]lon;)

npm start
change code inisde vs code
deploy to github by desktop
watch on github if deployment is ok, if not - fix bugs
npm run build
firebase deploy --only hosting (env should work)
firebase deploy (should work even when this project not open on this pc vs code)
check the url on pc and mobile if working, if not fix bugs

*/