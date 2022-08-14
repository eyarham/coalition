import React from 'react';
import { Outlet } from "react-router-dom";
import AuthWrapper from '../auth/AuthWrapper';
import FirebaseApp from '../firebase/FirebaseApp';
import UserContextProvider from '../user/UserContextProvider';
import HeaderLogo from './HeaderLogo';
import MainMenu from './MainMenu';
import CssBaseline from '@mui/material/CssBaseline';
import MenuAppBar from './MenuAppBar';

const Layout = () => {
  return (
    <div className="App">
      <FirebaseApp>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthWrapper>
          <UserContextProvider>
            <div>
              <MenuAppBar />
              {/* <MainMenu /> */}
              <Outlet />
            </div>
          </UserContextProvider>
        </AuthWrapper>
      </FirebaseApp>
    </div>
  )
}

export default Layout
