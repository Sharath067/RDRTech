// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPI_Kc5Hw26bXYp1fKLBNUyPfPe4ivjTM",
  authDomain: "rdrtech-project.firebaseapp.com",
  projectId: "rdrtech-project",
  storageBucket: "rdrtech-project.appspot.com",
  messagingSenderId: "244634140968",
  appId: "1:244634140968:web:634adcb8a8f93757f4d01d",
  measurementId: "G-JZYLLM6HL4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {app, auth};