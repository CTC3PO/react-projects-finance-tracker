import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export { projectFirestore, projectAuth };
