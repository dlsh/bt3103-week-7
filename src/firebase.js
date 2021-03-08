import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwf7sQdmCgFKZFoa6oGNDrgf7wLligRWM",
    authDomain: "bt3103-week-6-1c6d1.firebaseapp.com",
    projectId: "bt3103-week-6-1c6d1",
    storageBucket: "bt3103-week-6-1c6d1.appspot.com",
    messagingSenderId: "221044554742",
    appId: "1:221044554742:web:c4b3c652a8d2aa7ac725d7"
};


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;