import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getIdNamePairSub } from './api';

const MemberDropdown = ({ onSelect }) => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [members, setMembers] = useState();
  useEffect(() => {
    return getIdNamePairSub(coalition.id, setMembers)
  }, [coalition.id])
  const onMemberChange = e => {
    onSelect(e.target.value);
  }
  return (
    <select onChange={onMemberChange}>
      <option value="" >(none)</option>
      {members && members.map((m, i) => {
        const { displayName, memberId } = m;
        return (<option key={i} value={memberId}>{displayName}</option>)
      })}
    </select>
  )
}

export default MemberDropdown