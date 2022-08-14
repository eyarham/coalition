import React from 'react';
import { Route, Routes } from "react-router-dom";
import Admin from '../admin/Admin';
import Logout from '../auth/Logout';
import Browse from '../browse/Browse';
import CoalitionPage from '../coalition/CoalitionPage';
import CoalitionPanel from '../coalition/CoalitionPanel';
import Invite from '../invite/Invite';
import RulesPage from '../rules/RulesPage';
import Account from '../user/Account';
import Home from './Home';
import Layout from './Layout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coalition/:coalitionId" element={<CoalitionPage />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/dashboard" element={<CoalitionPanel />} />
        <Route path="/logout" element={<Logout />} />

      </Route>
    </Routes>
  )
}

export default Router
