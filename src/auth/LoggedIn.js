import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function LoggedIn() {
  const auth = getAuth();
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
      <Link to="/Account" >Account</Link>
      <input type="button" onClick={signOutEvent} value="Sign Out"></input>
    </div>
  )
}

export default LoggedIn
