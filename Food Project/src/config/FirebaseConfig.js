// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM96jH7At093qE4V8t_kCxA9BA4HdVw9w",
  authDomain: "the-vanilla-vault.firebaseapp.com",
  projectId: "the-vanilla-vault",
  storageBucket: "the-vanilla-vault.appspot.com",
  messagingSenderId: "214661945093",
  appId: "1:214661945093:web:950074c7a1321a569fc96c",
  measurementId: "G-2RDCL21RS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//TODO: Now Write you own code
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fireStore = getFirestore(app);
