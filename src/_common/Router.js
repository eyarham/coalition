import React from 'react';
import { Route, Routes } from "react-router-dom";
// import CoalitionPage from '../coalition/CoalitionPage';
import CoalitionPanel from '../coalition/CoalitionPanel';
import Invite from '../invite/Invite';
import Layout from './Layout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CoalitionPanel />} />
        <Route path="/invite" element={<Invite />} />
        {/* <Route path="/coalition/:coalitionId" element={<CoalitionPage />} /> */}
      </Route>
    </Routes>
  )
}

export default Router
