import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAZi3PkBpBPgZwckektUOrRewqiYX_vic",
  authDomain: "meeting-website-7c7e3.firebaseapp.com",
  projectId: "meeting-website-7c7e3",
  storageBucket: "meeting-website-7c7e3.appspot.com",
  messagingSenderId: "92561301343",
  appId: "1:92561301343:web:11ffd654fd74d9263f60ea",
  measurementId: "G-PL924913WS",
  databaseURL: "https://meeting-website-7c7e3-default-rtdb.firebaseio.com/"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Authentication
const database = getDatabase(app);
const auth = getAuth();


export { database, auth };
