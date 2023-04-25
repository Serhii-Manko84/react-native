import * as firebase from "firebase";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcsk7rkZtEsgoCLef0L_f2kVnJK4dRoEc",
  authDomain: "mynewproject-ae3fe.firebaseapp.com",
  projectId: "mynewproject-ae3fe",
  storageBucket: "mynewproject-ae3fe.appspot.com",
  messagingSenderId: "317104811329",
  appId: "1:317104811329:web:0b2f807c1558c79b9945c0",
  measurementId: "G-04E1KYLQF8",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
