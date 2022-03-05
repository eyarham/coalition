import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getUserNameSub, getUserPronouns } from './api';
import "./user.css";

const UserName = ({ userId }) => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [name, setName] = useState();
  const [pronouns, setPronouns] = useState();
  useEffect(() => {
    const effect = async () => {
      if (userId) {
        const pronounResponse = await getUserPronouns(userId);
        setPronouns(pronounResponse);
      }
    }
    effect();
  }, [userId])
  useEffect(() => {
    const effect = async () => {
      if (userId) {
        return getUserNameSub(userId, coalition.id, user => {
          setName(user);
        });
      }
    }
    effect();
  }, [userId, coalition.id])

  return (
    <span>
      <span>{name}</span>

      <span className='member-pronouns'>({pronouns})</span>
    </span>
  )
}

export default UserName