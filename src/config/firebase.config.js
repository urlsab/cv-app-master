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
npm start
[change code]
[exit npm start = ctrl + c, the press 'y' ]
npm run build
[change code]
[verify index.html of build dir is ok - add ' ' to index.html of build dir inside the url of fonts..]
firebase deploy
[check url if code changed]

*/

// private key = mv74m7v7qKr6yziTkE7ejZlqvu2LgSXPv9qwH4KNVFY
// key pair = BH8DAxQPIrWxQ-6qYEqr__uQACY3hE0YpdD7oPFuawBYebqDDsCaE51wvunfhYCCPauHlq0x5_77DwlRiLCTSGA
// Firebase service account = firebase-adminsdk-7tb3y@resumes-builder.iam.gserviceaccount.com

// import { privateKey} from '../../resumes-builder-firebase-adminsdk-7tb3y-937a339249.json';

// import { initializeApp } from 'firebase-admin/app';

// const myRefreshToken = '...'; // Get refresh token from OAuth2 flow

// initializeApp({
//   credential: refreshToken(myRefreshToken),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });

// import { admin } from 'firebase-admin';

// const serviceAccount = 'firebase-adminsdk-7tb3y@resumes-builder.iam.gserviceaccount.com';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://console.firebase.google.com/project/resumes-builder/firestore/databases/-default-/data"
// });

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

//https://console.firebase.google.com/project/resumes-builder/database/resumes-builder-default-rtdb/data

// {
//   "type": "service_account",
//   "project_id": "resumes-builder",
//   "private_key_id": "937a3392497291637b8adebf4b7e9034bf0265b7",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyfyeS2nRbjOM4\n/S9A6rUl12qA9arF/rXtBy4OpFYeG1rp/Vt/Q/40CVAmkE+/ySvFCGLD5cHX05t1\nrre4x+V42hyfbkv7h/GZ8bUpTSeB2IfeJ/7Aub1ei7cViDGZrZdQ1AuR0gIB0raV\nYoHD1F4aK8//wvGv4WWDRNgHfgcmxdWnDqeiJY5L52sUNUyS0ibcdJln/D4dUg8n\n0IaZIdsMsg3qLofc1P91osD4LSkmRJgZjopnaddeu13DU20nzmG9vkFeoA1CJqGV\nly3z4t5C07MvS9jJ6WPJqvXQI/95GOdq8VCGs9C1znT10pGYbP5rtJkgn0BIG/K+\nQ/wZhWT1AgMBAAECggEAGhD0k/7/4AC2i/N5S5ca5hBLttJpYmmcYqVaRfwcsV/Y\nSnRbwL2KqUm04TTQ2JaFpEvhtG7gfGaj/K8LmFnkul3LsUKXqP9EunDwPjxMqSsY\nSEp56uYU7/IiRewyJhmSD9UvbVeIQIDndfBBN/pS1aqRQO3UgpU9UEqk648tdy1M\nqSuePX5DzUjgBNc+VRiPRcb6FBe++fsTAKPOiu9xBpyRTc3WyKAGUEiAYm5xJ4Am\npWL7Q7jzNRofqqeRQeW0Y6eXIFd910g235tM1DmHrj8NOjFNtCFZum5zGC8iD7mV\nxUJqzk6hM7UECMbetzEFMZFg+fFNPSkdV5bb/m8PrwKBgQD4/fSbQwtew+P0icPI\nunxQZmXWCfrO6x/KbNPmN4FJTTkGGB9ICFO4dgIVkkr0OIRewXlMRNSVMghLTQ+L\n4eIB3aXsrCjliHhN5M16TeuGw88NLmBXchbe2vvhhWczRjY1xMkjRGnuHBIRnNH4\nrb/5WbD4nLlXZJXhCwVT7Zjx7wKBgQC3hUOhv18OXIPgUDsaazB/9a7mKmX7Qqwc\nKPhJzVvTZs+otHwg1EGJU9aGHKLxgn4+dyloRcCG0v0DHTLUdhzIRD5LGJpTNi6c\nPQA0S9pgEz2jOoJpZ5NzAMnCtE8lwfzvSFf5qvH890VV9yTou9GkXvEkcgW8a3ch\nPF4Oz//rWwKBgF8K0SvS06xAqerWC127kWg/LfAdrxb8uQ3TrK7b0QXh7DpfStF8\nHDj1EqaZSPMf/6cLwvlR7LNmfbQAnkaO2m5L5OIKdTHofcN96tEcnSK763TklvHK\nIuC+Rhc3jMUNr/OmQgCsRKMXI+6FJcD+0aCkk+DSMg0h3/Qe+NGoiBERAoGAaLfu\nQ5mDkBpSVejyEL0hS6LRThzbXGhK9TabluFLiHGeBNIYElOLoeTpAFXO1Kh1iQdN\n5WYH2ecC4IgEvR84hT4LnaZISTsdlaFpQG4YCcJw5Xc5exPTG0hT2Hoyv4TV42QQ\nbzKQKpyeP9NqiDLECVrzlqxJgZ6At8JOmX0utwkCgYBaYnktm7SY94FwM4y/r6xw\nWq9iKMOYsJ42c6BRmzGyEsi+J/lNPkbLW7LdBt5X7yWivEvfPT5h4LLsNE31taxi\neO+RZkEQylrUjasS8TOqzWvH3bCQfCvM3UV8s3lHsX2u+7BbCGnI0qRmynz8AY+e\npcLc69D4HB1SkuXCBzDptQ==\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-7tb3y@resumes-builder.iam.gserviceaccount.com",
//   "client_id": "105714164173931221622",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7tb3y%40resumes-builder.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }