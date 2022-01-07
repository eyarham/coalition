import React, { useEffect, useState } from 'react';
import { getLink } from '../invite/api';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import api from '../_common/api';
import { getMemberCount } from '../_common/membershipApi';
import { getCoalitionLink } from './api';
import Charter from './Charter';
import Delete from './Delete';
import Leave from './Leave';

const Coalition = ({ selectedCoalition }) => {
  const [openCoalition, setOpenCoalition] = useState(false);
  const [memberCount, setMemberCount] = useState();
  const [inviteLink, setInviteLink] = useState("http://localhost:3000/");
  const setActiveCoalition = async (coalition) => {
    setOpenCoalition(coalition);
    const memberCountFunc = async () => await getMemberCount(coalition.id);
    const count = await memberCountFunc()
    setMemberCount(count);
  }
  useEffect(() => {
    const setFromProps = async () => setActiveCoalition(selectedCoalition);
    setFromProps();
  }, [selectedCoalition])
  useEffect(() => {
    const getInviteLink = async () => {
      setInviteLink(await getLink(openCoalition.id));
    }
    if (openCoalition && openCoalition.id)
      getInviteLink();
  }, [openCoalition])
  if (!openCoalition) return <div>Loading</div>;
  const isCreator = openCoalition && openCoalition.data().createdBy === api().getCurrentUser().uid;
  return (
    <div>
      Selected Coalition
      <hr />
      <div>Name: {openCoalition.data().name}</div>
      <a href={getCoalitionLink(openCoalition.id)}>Coalition Link</a>
      <div>Members: {memberCount}</div>
      <Charter openCoalition={openCoalition} />
      <input type="button" value="Copy Invite Link" onClick={() => { navigator.clipboard.writeText(inviteLink) }}></input>
      <div>Invite Link:</div>
      <div>
        <textarea disabled value={inviteLink} className='inviteLinkBox'></textarea>
      </div>
      <NewPetition coalitionId={openCoalition.id} />
      <Petitions coalitionId={openCoalition.id} />
      <Leave openCoalition={openCoalition} />
      <div>
        {isCreator && <Delete openCoalition={openCoalition} />}
      </div>
    </div>
  )
}

export default Coalition
