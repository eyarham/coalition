import React, {useEffect} from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Logout = () => {
  const auth = getAuth();

  const signOutEvent = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
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