import { initializeApp } from "firebase/app";
import React from 'react';
import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const FirebaseApp = ({ children }) => {


  return (
    <div>
      {app && children}
    </div>
  )
}

export default FirebaseApp
