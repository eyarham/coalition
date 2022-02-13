import React, { useEffect, useState } from 'react';
import { getByCoalitionId } from './api';
import "./user.css"
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
          const { displayName, pronouns } = m.data();
          return (
          <div key={i}>
           <span> {displayName || "no display name"}</span>
          <span className='member-pronouns'>({pronouns})</span>
          
          </div>);
        }
        else return <div key={i}>No info</div>
      })}
    </div>
  )
}

export default Members
