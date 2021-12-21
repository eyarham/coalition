import React from 'react'
import { useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function LoggedIn() {
  const [loggedInUser, setLoggedInUser] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      setLoggedInUser(user);
      // ...
    } else {
      // User is signed out
      // ...
      setLoggedInUser(null);
    }
  });
  const signOutEvent = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      {loggedInUser &&
        <div>{loggedInUser.email}</div>
      }
      <input type="button" onClick={signOutEvent} value="Sign Out"></input>
    </div>
  )
}

export default LoggedIn
