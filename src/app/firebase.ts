// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz6qDaDqU04_3vPfvCiCh-JlAuVEbrSNE",
  authDomain: "astute-city-429917-n8.firebaseapp.com",
  projectId: "astute-city-429917-n8",
  storageBucket: "astute-city-429917-n8.appspot.com",
  messagingSenderId: "706317129958",
  appId: "1:706317129958:web:f639631fe336ae88240327",
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  postalCode,
  address,
  church
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const prayers = [];
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        postalCode,
        address,
        church,
        prayers,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
export { app, auth };
