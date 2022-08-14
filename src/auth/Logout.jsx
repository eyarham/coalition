import React, {useEffect} from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Link, useNavigate } from 'react-router-dom';
const Logout = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const signOutEvent = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(signOutEvent, [auth]);
  return (
    <div>Logout</div>
  )
}

export default Logout