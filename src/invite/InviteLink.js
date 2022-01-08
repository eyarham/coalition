import React, { useEffect, useState } from 'react';
import { getLink } from './api';

const InviteLink = ({coalitionId}) => {
  const [inviteLink, setInviteLink] = useState("http://localhost:3000/");
  useEffect(() => {
    const getInviteLink = async () => {
      setInviteLink(await getLink(coalitionId));
    }
    if (coalitionId)
      getInviteLink();
  }, [coalitionId])
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
