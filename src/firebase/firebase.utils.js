import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBRHjAFFw67ajIO1rnIlcBJaJIwoKZRv_8",
    authDomain: "onlinestore-db.firebaseapp.com",
    databaseURL: "https://onlinestore-db.firebaseio.com",
    projectId: "onlinestore-db",
    storageBucket: "",
    messagingSenderId: "845529263059",
    appId: "1:845529263059:web:1475cd9831367f33481d26"
  };

firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
