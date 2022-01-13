import React, { useEffect, useState } from 'react';
import InviteLink from '../invite/InviteLink';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import Rules from '../rules/Rules';
import Members from '../user/Members';
import api from '../_common/api';
import ExpandBox from '../_common/ExpandBox';
import { getCoalitionLink } from './api';
import Charter from './Charter';
import Delete from './Delete';
import Leave from './Leave';

const Coalition = ({ selectedCoalition }) => {
  const [openCoalition, setOpenCoalition] = useState(false);
  const setActiveCoalition = async (coalition) => {
    setOpenCoalition(coalition);
  }
  useEffect(() => {
    const setFromProps = async () => setActiveCoalition(selectedCoalition);
    setFromProps();
  }, [selectedCoalition])
  if (!openCoalition) return <div>Loading</div>;
  const isCreator = openCoalition && openCoalition.data().createdBy === api().getCurrentUser().uid;
  return (
    <div>
      <h2> {openCoalition.data().name}</h2>
      <a href={getCoalitionLink(openCoalition.id)}>Coalition Link</a>

      <ExpandBox headerText="Members">
        <Members coalitionId={openCoalition.id} />
      </ExpandBox>
      <ExpandBox headerText="Charter">
        <Charter openCoalition={openCoalition} />
      </ExpandBox>
      <ExpandBox headerText="Rules"><Rules coalitionId={openCoalition.id} /></ExpandBox>
      <ExpandBox headerText="Invite">
        <InviteLink coalitionId={openCoalition.id} />
      </ExpandBox>
      <ExpandBox headerText="New Petition">
        <NewPetition coalitionId={openCoalition.id} />
      </ExpandBox>
      <ExpandBox headerText="Petitions">
        <Petitions coalitionId={openCoalition.id} />
      </ExpandBox>
      <Leave openCoalition={openCoalition} />
      <div>
        {isCreator && <Delete openCoalition={openCoalition} />}
      </div>
    </div>
  )
}

export default Coalition
