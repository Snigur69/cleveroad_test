import firebase from "firebase/app";

export const firebaseInit = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyACQkrPlLtfohxFVaA8CPImd5ekAJ509v0",
        authDomain: "cleveroad-b12f6.firebaseapp.com",
        projectId: "cleveroad-b12f6",
        storageBucket: "cleveroad-b12f6.appspot.com",
        messagingSenderId: "428157429331",
        appId: "1:428157429331:web:a469616b12f43a6f58c8a6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log('firebase initialized!')
}