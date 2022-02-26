import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionId } from './api';
import "./user.css";
import UserName from './UserName';

const Members = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [members, setMembers] = useState();
  useEffect(() => {
    const getData = async () => {
      const users = await getByCoalitionId(coalition.id);
      setMembers(users);
    }
    getData();
  }, [coalition.id]);
  return (
    <div>
      <div>Member number: {members && members.length}</div>
      {members && members.map((m, i) => {
        if (m) {
          return (
            <div key={i}>
              <UserName userId={m.id} />
            </div>);
        }
        else return <div key={i}>No info</div>
      })}
    </div>
  )
}

export default Members
