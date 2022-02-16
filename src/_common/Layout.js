import React from 'react';
import { Link, Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import HeaderLogo from './HeaderLogo';

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderLogo />
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
