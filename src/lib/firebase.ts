// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "learnswift-nwi2h",
  "appId": "1:642250964887:web:528e88ecedf9ecfe6eced2",
  "storageBucket": "learnswift-nwi2h.firebasestorage.app",
  "apiKey": "AIzaSyAOxYGFLjg8r-gYHAA65VcdyW7pMGgJGsU",
  "authDomain": "learnswift-nwi2h.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "642250964887"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
