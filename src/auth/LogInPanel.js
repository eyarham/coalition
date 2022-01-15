import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { create } from "../user/api";

function LoginPanel() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted( true);               // note mutable flag
    // someAsyncOperation().then(data => {
    //   if (isMounted) setState(data);    // add conditional check
    // })
    return () => { setIsMounted(false) }; // cleanup toggles value, if unmounted
  }, []);  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      if (isMounted)  setLoggedInUser(user);
      // ...
    } else {
      // User is signed out
      // ...
      if (isMounted)  setLoggedInUser(null);
    }
  });
  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
        await create(userCredential.user.uid)
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setLoginErrorMessage(errorMessage);
        // ..
      });

  }
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setLoginErrorMessage(errorMessage);
      });

  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  }
  const changePassword = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div>
      {loggedInUser &&
        <div>{loggedInUser.email}</div>
      }
      {(!loggedInUser) && "no user"}
      <form>
        <input placeholder="email" onChange={changeEmail}></input>
        <input type="password" placeholder="password" autoComplete="on" onChange={changePassword}></input>
        <input type="button" onClick={signIn} value="Sign In"></input>
        <input type="button" onClick={createAccount} value="Create New User"></input>
      </form>
      <div>{loginErrorMessage}</div>
    </div>
  )
}

export default LoginPanel
