import React, { useEffect, useState } from 'react';
import { getUserName, getUserPronouns } from './api';

const UserName = ({ userId }) => {
  const [name, setName] = useState();
  const [pronouns, setPronouns] = useState();
  useEffect(() => {
    const effect = async () => {
      if (userId) {
        const user = await getUserName(userId);
        setName(user);
        const pronounResponse = await getUserPronouns(userId);
        setPronouns(pronounResponse);
      }
    }
    effect();
  }, [userId])

  return (
    <span>
      <span>{name}</span>

      <span className='member-pronouns'>({pronouns})</span>
    </span>
  )
}

export default UserName