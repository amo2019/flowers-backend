import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from '../firebase/firebase.utils';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

export const getSnapshotFromUserAuth = async (userAuth, additionalData)=> {
  try {
    const userRef = await createUserProfileDocument(userAuth, additionalData);
    const userSnapshot = await userRef.get();
  } catch (error) {
    console.log("error:", error.message )  }
}

export const  loginWithEmail = (email, password) => { 
  let state = {}
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const userCred = userCredential.user;
      state = { ...state, user: email, error: false, uid: userCred.uid };
      // ...
    })
    .catch((error) => {
      state = { errorMs: error.message, error: true };
    })
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(state);
      }, 1400);
    }); 
  }
  export const signupWithEmail = async(email, password, displayName) => {
    let state = {}
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password, displayName)
      .then((userCredential) => {
        // Signed in 
        const userCred = userCredential.user;
      state = { ...state, user: email, error: false, uid: userCred.uid };
      })
      .catch((error) => {
        state = { errorMs: error.message, error: true };
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(state);
        }, 1400);
      }); 
  }
  export const logoutMeOut = async () => {
    let state = {}
    try {
      await auth.signOut();
      state = {...state, loggedout: true};
     } catch (error) {
      state = {...state,loggedout: false};
     }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(state);
      }, 500);
    }); 
  }