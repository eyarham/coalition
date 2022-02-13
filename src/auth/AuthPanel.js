import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from 'react';
import LoggedIn from './LoggedIn';
import LoginPanel from './LogInPanel';

function AuthPanel() {
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

  return (
    <div>
      {loggedInUser &&
        <LoggedIn />
      }
      {(!loggedInUser) &&
        <LoginPanel />
      }
    </div>
  )
}

export default AuthPanel
