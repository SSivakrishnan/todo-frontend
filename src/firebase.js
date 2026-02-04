// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqsceHzLa28jFZXc0bRxGOPDvfwVynGk0",
  authDomain: "todo-gpt-4c673.firebaseapp.com",
  projectId: "todo-gpt-4c673",
  storageBucket: "todo-gpt-4c673.firebasestorage.app",
  messagingSenderId: "144762815012",
  appId: "1:144762815012:web:cdda7a6caa3fb936b2ceb1",
  measurementId: "G-X95MHG62ZF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);