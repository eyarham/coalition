import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getLink } from './api';

const InviteLink = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [inviteLink, setInviteLink] = useState("http://localhost:3000/");
  useEffect(() => {
    const getInviteLink = async () => {
      setInviteLink(await getLink(coalition.id));
    }
    if (coalition.id)
      getInviteLink();
  }, [coalition.id])
  return (
    <div>
      <div>Invite Link:</div>
      <input type="button" value="Copy Invite Link" onClick={() => { navigator.clipboard.writeText(inviteLink) }}></input>
      <div>
        <textarea disabled value={inviteLink} className='inviteLinkBox'></textarea>
      </div>
    </div>
  )
}

export default InviteLink
