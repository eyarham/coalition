import React from 'react'
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoggedIn from './LoggedIn';
import LoginPanel from './LogInPanel';

const auth = getAuth();

function AuthPanel() {
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
 
  return (
    <div>
      {loggedInUser &&
       <LoggedIn />
      }
      {(!loggedInUser)&& 
      <LoginPanel />
      }
     
    </div>
  )
}

export default AuthPanel
