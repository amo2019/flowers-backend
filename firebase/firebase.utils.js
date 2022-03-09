import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
 
  authDomain: process.env.NEXT_PUBLIC_DOMAIN,

  databaseURL: process.env.NEXT_PUBLIC_BASE_URL,

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,

  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

  messagingSenderId: "74912904856",

  appId: "1:74912904856:web:02cf81b3b171637a1e42ed",

  measurementId: "G-0LZGDVNZJC"

};

initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = getAuth();
//export const firestore = firebase.firestore();

//export const googleProvider = new firebase.auth.GoogleAuthProvider();
//googleProvider.setCustomParameters({ prompt: 'select_account' });
//export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
