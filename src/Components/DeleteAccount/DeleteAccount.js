import React from 'react';

import './DeleteAccount.css';

import { useNavigate } from "react-router-dom";

import { collection, query, where } from "firebase/firestore";

import { firestoreDB, auth } from "../../firestoreConfig/firestoreConfig";

import { getAuth, deleteUser } from "firebase/auth";

import { useAuthState, DeleteUserHook, useDeleteUser } from "react-firebase-hooks/auth";
import Navbar from  "../Navbar/Navbar";

//import { firebase_tools } from "firebase-tools";

import { httpsCallable, getFunctions } from 'firebase/functions';

const DeleteAccount = () => {

const navigate = useNavigate();

// maybe comment this line below
const [user, loading] = useAuthState(auth);

const authGet = getAuth();
const userGet = authGet.currentUser;


  const deleteUserCollection = (db, collectionPath, batchSize) => {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
  
// (idd)
  // const deleteUserCollection = () => {
  //   deleteCollection(firestoreDB,`${user.email}`);
    
  // } 

  return (
    <div>
        
        <Navbar/>
        <div className='styleDeletePage'>
        
            <h3> by clicking this buttobon you will lose all of your data</h3>

            {/* <button onClick={()=> { deleteUserAccount(); ;  } }>Delete account</button> */}
            
            {/* (user.email) */}
 
            <button onClick={()=> { deleteUserCollection();  } }>Delete account</button>
        </div>
    </div>
    
  )
}

export default DeleteAccount;

// POSSIBLE SOLUTION: use email js when some user delete his accoint - i get email who did that and manually delete his collections

//WORKING !! DONT DELTET THAT ! delete AUTH user account
// const deleteUserAccount = () => {
//     deleteUser(userGet)
//     .then(() => {
//         console.log('Successfully deleted user account');
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log('Error deleting user account:', error);
//       });
//   } 
