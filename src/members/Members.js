import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import UserName from '../user/UserName';
import { getByCoalitionIdSub } from './api';

const Members = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [members, setMembers] = useState();

  useEffect(() => {
    return getByCoalitionIdSub(coalition.id, setMembers)
  }, [coalition.id])
  return (
    <div>
      <div>Member number: {members && members.length}</div>
      {members && members.map((m, i) => {
        if (m) {
          const { memberId } = m.data();
          return (
            <div key={i}>
              <UserName userId={memberId} />
            </div>);
        }
        else return <div key={i}>No info</div>
      })}
    </div>
  )
}

export default Members
