// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXquaw6KuK6JkTlLxMn9Ze3-gWJX5a414",
  authDomain: "orare-app1.firebaseapp.com",
  databaseURL: "https://orare-app1-default-rtdb.firebaseio.com",
  projectId: "orare-app1",
  storageBucket: "orare-app1.appspot.com",
  messagingSenderId: "446889604106",
  appId: "1:446889604106:web:f99f37bf34673012795bf3",
  measurementId: "G-1WMTN781H2"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth()

export { app, auth}