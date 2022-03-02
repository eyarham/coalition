import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { getByAuthIdSub } from './api';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const auth = getAuth();
  const [message, setMessage] = useState();
  const [user, setUser] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  
  useEffect(() => {
    if(loggedInUser && loggedInUser.uid)

    return getByAuthIdSub(loggedInUser.uid, (u) => {
      setUser(u);
    },error=>{
      setMessage(error.message);
    });

  }, [loggedInUser]);
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      setLoggedInUser(u);
      // ...
    } else {
      // User is signed out
      // ...
      setLoggedInUser(null);
    }
  });
  if (user === undefined || user === null
  ) {
    return <div>loading...</div>
  }
  return (
    <UserContext.Provider value={{user}}>
      {children}
      {message && <div>{message}</div>}
    </UserContext.Provider>
  )
}

export { UserContext };
export default UserContextProvider