import React from 'react';
import { Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import UserContextProvider from '../user/UserContextProvider';
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
          <UserContextProvider>
            <div>
              <MainMenu />
              <Outlet />
            </div>
          </UserContextProvider>
        </AuthWrapper>
      </FirebaseApp>
    </div>
  )
}

export default Layout
