import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getByInviteId, getCoalitionRedirect } from '../coalition/api';
import { getCoalitionIdsForCurrentUser } from "../members/api";
import { accept } from './api';

const Invite = () => {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const [coalition, setCoalition] = useState();
  const [coalitionData, setCoalitionData] = useState();
  const [inviteId, setInviteId] = useState();
  const [userIsMember, setUserIsMember] = useState(false);
  console.log(searchParams);

  useEffect(() => {
    const getData = async () => {
      let inviteId = searchParams.get("id");
      setInviteId(inviteId);
      var inviteCoalition = await getByInviteId(inviteId);
      //check membership
      var userCoalitionIds = await getCoalitionIdsForCurrentUser();
      if (userCoalitionIds.indexOf(inviteCoalition.id) > -1) {
        setUserIsMember(true)
      }
      setCoalition(inviteCoalition);
      setCoalitionData(inviteCoalition.data());
    }
    getData();
  }, [searchParams])
  const onAcceptClick = async e => {
    e.preventDefault();
    await accept(inviteId);
    navigate(getCoalitionRedirect(coalition.id));
  }

  if (!coalitionData) return <div>Loading...</div>
  if (userIsMember) return <div>You are a member of {coalitionData.name} </div>
  return (
    <div>
      <div>
        You've been invited to join {coalitionData.name}
      </div>
      <div>
        <h2>Charter:</h2>
        <p>{coalitionData.charter}</p>

      </div>
      <input type="button" onClick={onAcceptClick} value="Accept"></input>
    </div>
  )
}

export default Invite
