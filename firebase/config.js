import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const autentification = getAuth(app);
