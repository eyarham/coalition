import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from 'react';
import AuthPanel from './AuthPanel';

const AuthWrapper = (props) => {
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
      <div>
        <AuthPanel />
      </div>
      <div>
        {loggedInUser && props.children}
      </div>
    </div>
  )
}

export default AuthWrapper
