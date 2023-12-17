import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDec9tWOKGKUvv9yfWtni5QlaLvedOPg3o",
    authDomain: "react-freelance.firebaseapp.com",
    projectId: "react-freelance",
    storageBucket: "react-freelance.appspot.com",
    messagingSenderId: "136683895881",
    appId: "1:136683895881:web:3e10a0cae0ea9bf810d398",
    measurementId: "G-T32Q49LW13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
