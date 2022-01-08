import React, { useEffect, useState } from 'react';
import InviteLink from '../invite/InviteLink';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import Rules from '../rules/Rules';
import Members from '../user/Members';
import api from '../_common/api';
import { getMemberCount } from '../_common/membershipApi';
import { getCoalitionLink } from './api';
import Charter from './Charter';
import Delete from './Delete';
import Leave from './Leave';

const Coalition = ({ selectedCoalition }) => {
  const [openCoalition, setOpenCoalition] = useState(false);
  const [memberCount, setMemberCount] = useState();
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
  if (!openCoalition) return <div>Loading</div>;
  const isCreator = openCoalition && openCoalition.data().createdBy === api().getCurrentUser().uid;
  return (
    <div>
      Selected Coalition
      <hr />
      <div>Name: {openCoalition.data().name}</div>
      <a href={getCoalitionLink(openCoalition.id)}>Coalition Link</a>
      <div>Members: {memberCount}</div>
      <Members coalitionId={openCoalition.id} />
      <Charter openCoalition={openCoalition} />
      <Rules coalitionId={openCoalition.id} />
      <InviteLink coalitionId={openCoalition.id} />
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
