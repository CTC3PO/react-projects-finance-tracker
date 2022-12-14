import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXR1dY6uupbQxbJNq0VjbniZn2LKOTVX4",
  authDomain: "react-finance-tracker-5c423.firebaseapp.com",
  projectId: "react-finance-tracker-5c423",
  storageBucket: "react-finance-tracker-5c423.appspot.com",
  messagingSenderId: "92823184130",
  appId: "1:92823184130:web:d1f73eff4084353f27181b",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp to add to addDocument function in useFirestore
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
