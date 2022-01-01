import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { getById as getCoalition } from '../coalition/api';
import { getCoalitionIdsForCurrentUser } from '../_common/membershipApi';
import { accept, get } from './api';

const Invite = () => {
  let [searchParams] = useSearchParams();
  const [coalition, setCoalition] = useState();
  const [inviteId, setInviteId] = useState();
  const [userIsMember, setUserIsMember] = useState(false);
  console.log(searchParams);

  useEffect(() => {
    const getData = async () => {
      let inviteId = searchParams.get("id");
      setInviteId(inviteId);
      var invite = await get(inviteId);
      var coalition = await getCoalition(invite.data().coalitionId);
      //check membership
      var userCoalitionIds = await getCoalitionIdsForCurrentUser();
      if (userCoalitionIds.indexOf(coalition.id) > -1) {
        setUserIsMember(true)
      }
      setCoalition(coalition.data());
    }
    getData();
  }, [searchParams])
  const onAcceptClick = async e => {
    e.preventDefault();
    await accept(inviteId)
  }

  if (!coalition) return <div>Loading...</div>
  if (userIsMember) return <div>You are a member of {coalition.name} </div>
  return (
    <div>
      <div>
        You've been invited to join {coalition.name}
      </div>
      <div>
        <h2>Charter:</h2>
        <p>{coalition.charter}</p>
        
      </div>
      <input type="button" onClick={onAcceptClick} value="Accept"></input>
    </div>
  )
}

export default Invite
