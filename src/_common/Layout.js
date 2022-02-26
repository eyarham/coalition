import React from 'react';
import { Link, Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import HeaderLogo from './HeaderLogo';
import MainMenu from './MainMenu';

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderLogo />
      </header>
      <FirebaseApp>
        <AuthWrapper>
          <div>
<MainMenu/>
            <Outlet />
          </div>
        </AuthWrapper>
      </FirebaseApp>
    </div>
  )
}

export default Layout
