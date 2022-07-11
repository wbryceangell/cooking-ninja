import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB73ECjdAar9OYb20ZEIL2sSG9in9OQVFc",
  authDomain: "cooking-ninja-site-685b4.firebaseapp.com",
  projectId: "cooking-ninja-site-685b4",
  storageBucket: "cooking-ninja-site-685b4.appspot.com",
  messagingSenderId: "347884880208",
  appId: "1:347884880208:web:57fcf0120dcecacab8ac55",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
