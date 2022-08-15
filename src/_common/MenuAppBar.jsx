import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Divider from '@mui/material/Divider';
//const pages = ['My Coalitions', 'Search', 'Admin', 'Help'];
const pageLinks = [
  { text: 'Search', value: 'browse' },
  { text: 'Admin', value: 'admin' },
  { text: 'Help', value: 'rules' },
  { text: 'Dashboard', value: 'dashboard' },
  { text: 'Code', value: 'https://github.com/eyarham/coalition', isExternal: true }];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settingLinks = [
  { text: 'Account', value: 'account' },
  { text: 'Admin', value: 'admin' },
  { text: 'Logout', value: 'logout' }];


const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [userInitial, setUserInitial] = React.useState(null);

  const [loggedInUser, setLoggedInUser] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      setLoggedInUser(user);
      setUserInitial(user.email.charAt(0))
      // ...
    } else {
      // User is signed out
      // ...
      setLoggedInUser(null);
    }
  });
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };


  // const handleNavSelect = (e) => {
  //   var destination = e.target.value;
  //   navigate('/' + destination);
  // }
  const navigateToSelected = (destination, isExternal) => {
    if (isExternal) { window.open(destination, '_blank') }
    else {
      navigate('/' + destination);
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onHomeClick = e => {
    navigate('/');
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/"
            onClick={onHomeClick}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coalition
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pageLinks.map((page) => (
                <MenuItem key={page.value} onClick={() => navigateToSelected(page.value, page.isExternal)}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            COALITION
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pageLinks.map((page) => (
              <Button
                key={page.value}
                onClick={() => navigateToSelected(page.value, page.isExternal)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{userInitial}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loggedInUser &&
                <MenuItem>{loggedInUser.email}</MenuItem>
              }
              <Divider />
              {settingLinks.map((setting) => (
                <MenuItem key={setting.value} onClick={() => navigateToSelected(setting.value, setting.isExternal)}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
