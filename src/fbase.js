import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSZXIdtE852SBin-FapqSySbAT6NO0cD4",
  authDomain: "bob-app-f56da.firebaseapp.com",
  projectId: "bob-app-f56da",
  storageBucket: "bob-app-f56da.appspot.com",
  messagingSenderId: "919732829443",
  appId: "1:919732829443:web:13285eeab4898372edbd36",
  measurementId: "G-SJXQLNP95H"
};
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
