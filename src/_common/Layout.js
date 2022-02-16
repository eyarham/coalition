import React from 'react';
import { Link, Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import { getOriginUrl } from './api';

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <a href={getOriginUrl()}><h1>Coalition</h1></a>
        <hr></hr>
        <span className="browse-link"><Link to="/browse">browse coalitions</Link></span>
        <span className="code-link"><a href="https://github.com/eyarham/coalition">code</a></span>
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
