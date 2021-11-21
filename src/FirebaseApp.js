import React from 'react'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbf69wqSQcMxJ9shK8cqqIw2TeL4z8flg",
  authDomain: "fir-boilerplate-6fda0.firebaseapp.com",
  projectId: "fir-boilerplate-6fda0",
  storageBucket: "fir-boilerplate-6fda0.appspot.com",
  messagingSenderId: "111931837766",
  appId: "1:111931837766:web:d5cd2ca39dc35c99742947"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
const FirebaseApp = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default FirebaseApp
