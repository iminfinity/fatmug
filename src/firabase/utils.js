import firebase from "firebase";

// this should be private
var config = {
  apiKey: "AIzaSyDGIS5JhkjV6yuzTypnbfIAlv-74ngpLZM",
  authDomain: "fatmug-6e4dc.firebaseapp.com",
  projectId: "fatmug-6e4dc",
  storageBucket: "fatmug-6e4dc.appspot.com",
  messagingSenderId: "820979430392",
  appId: "1:820979430392:web:8bbcc0192cf0f8eaf8dc0d",
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const signin = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

export const signup = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const storage = firebase.storage();
