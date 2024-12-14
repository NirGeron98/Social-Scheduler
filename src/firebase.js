// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAZi3PkBpBPgZwckektUOrRewqiYX_vic",
  authDomain: "meeting-website-7c7e3.firebaseapp.com",
  databaseURL: "https://meeting-website-7c7e3-default-rtdb.firebaseio.com",
  projectId: "meeting-website-7c7e3",
  storageBucket: "meeting-website-7c7e3.firebasestorage.app",
  messagingSenderId: "92561301343",
  appId: "1:92561301343:web:11ffd654fd74d9263f60ea",
  measurementId: "G-PL924913WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { database };
