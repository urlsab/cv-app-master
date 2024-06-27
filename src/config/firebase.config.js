import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

// const firebaseConfig = {  
//   apiKey: `${process.env.REACT_APP_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
//   databaseURL: `${process.env.REACT_APP_DB_URL}`,
//   projectId: `${process.env.REACT_APP_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_API_ID}`
// };

const firebaseConfig = {
  apiKey: "AIzaSyCEryolwTvi751-v2evqPUquUvlcugNys8",
  authDomain: "resumes-builder.firebaseapp.com",
  databaseURL: "https://resumes-builder-default-rtdb.firebaseio.com",
  projectId: "resumes-builder",
  storageBucket: "resumes-builder.appspot.com",
  messagingSenderId: "235192135514",
  appId: "1:235192135514:web:87d29f46541b32550d0d63"
};

export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const firestoreDB = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

/* 

TO DEPLOY, COMMAND:
npm start
[change code]
[exit npm start = ctrl + c, the press 'y' ]
npm run build
[change code]
[verify index.html of build dir is ok - add ' ' to index.html of build dir inside the url of fonts..]
firebase deploy
[check url if code changed]
push in github desktop
check github repository.

*/