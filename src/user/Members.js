import React, { useEffect, useState } from 'react';
import { getByCoalitionId } from './api';
import Member from './Member';
import "./user.css";
const Members = ({ coalitionId }) => {
  const [members, setMembers] = useState();
  useEffect(() => {
    const getData = async () => {
      const users = await getByCoalitionId(coalitionId);
      setMembers(users);
    }
    getData();
  }, [coalitionId])
  return (
    <div>
      <div>Member number: {members && members.length}</div>
      {members && members.map((m, i) => {
        if (m) {
          return (
            <div key={i}>
              <Member member={m.data()} />
            </div>);
        }
        else return <div key={i}>No info</div>
      })}
    </div>
  )
}

export default Members
