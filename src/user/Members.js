import React, { useEffect, useState } from 'react'
import { getByCoalitionId } from './api'

const Members = ({ coalitionId }) => {
  const [members, setMembers] = useState()
  useEffect(() => {
    const getData = async () => {
      const users = await getByCoalitionId(coalitionId);
      setMembers(users);
    }
    getData();
  }, [coalitionId])
  return (
    <div>
      {members && members.map((m, i) => {
        if(m)
        {
        const { displayName } = m.data();
        return (<div key={i}>{displayName || "no display name"}</div>);
        }
        else return <div key={i}>No info</div>
      })}
    </div>
  )
}

export default Members
