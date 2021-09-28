import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHDKHGeuPrkBN-q4LrPkeIz9_q18jdzvE",
    authDomain: "whatsapp2-2f592.firebaseapp.com",
    projectId: "whatsapp2-2f592",
    storageBucket: "whatsapp2-2f592.appspot.com",
    messagingSenderId: "676642082486",
    appId: "1:676642082486:web:e37264838a0b620f2fe017"
  };

const app = !firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app();  


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
