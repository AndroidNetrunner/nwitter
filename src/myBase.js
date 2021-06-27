import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlK53dMmAhCjv2BaUXybaTfMRMYLCDPd0",
    authDomain: "nwitter-f5933.firebaseapp.com",
    projectId: "nwitter-f5933",
    storageBucket: "nwitter-f5933.appspot.com",
    messagingSenderId: "177922798569",
    appId: "1:177922798569:web:ec54373d35a05b58aa9178"
  };

firebase.initializeApp(firebaseConfig);

export const fbi = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();