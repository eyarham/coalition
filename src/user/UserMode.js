import React, { useContext } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';

const UserMode = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { isOnlyUser } = coalitionContext;
  return (
    <div>
      {isOnlyUser && <div>Only User Mode</div>}
    </div>
  )
}

export default UserMode