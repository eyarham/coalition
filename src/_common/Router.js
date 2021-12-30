import React from 'react';
import { Route, Routes } from "react-router-dom";
import Coalition from '../coalition/Coalition';
import CoalitionPanel from '../coalition/CoalitionPanel';
import Invite from '../invite/Invite';
import Layout from './Layout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CoalitionPanel />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/coalition" element={<Coalition />} />
      <Route path=":coalitionId" element={<Coalition />} />
      </Route>
    </Routes>
  )
}

export default Router
