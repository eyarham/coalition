import React from 'react';
import { Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import { getOriginUrl } from './api';

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <a href={getOriginUrl()}><h1>Coalition</h1></a>
        <span style={{ "float": "right" }}><a href="https://github.com/eyarham/coalition">code</a></span>
      </header>
        <FirebaseApp>
          <AuthWrapper>
            <Outlet />
          </AuthWrapper>
        </FirebaseApp>
    </div>
  )
}

export default Layout
