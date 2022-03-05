import React from 'react';
import InviteLink from '../invite/InviteLink';
import Members from '../members/Members';
import Messages from '../message/Messages';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import Rules from '../rules/Rules';
import UserMode from '../user/UserMode';
import ExpandBox from '../_common/ExpandBox';
import Charter from './Charter';
import CoalitionContextProvider from './CoalitionContextProvider';
import CoalitionLink from './CoalitionLink';
import CoalitionName from './CoalitionName';
import Delete from './Delete';
import Leave from './Leave';

const CoalitionWithContext = ({ coalitionId }) => {
  if (!coalitionId) return (<div></div>);
  return (
    <CoalitionContextProvider coalitionId={coalitionId}>
      <div>
        <CoalitionName />
        <UserMode />
        <CoalitionLink />
        <ExpandBox headerText="Members"><Members /></ExpandBox>
        <ExpandBox headerText="Charter"><Charter /></ExpandBox>
        <ExpandBox headerText="Messages"><Messages /></ExpandBox>
        <ExpandBox headerText="Rules"><Rules /></ExpandBox>
        <ExpandBox headerText="Invite"><InviteLink /></ExpandBox>
        <ExpandBox headerText="New Petition"><NewPetition /></ExpandBox>
        <ExpandBox headerText="Petitions"><Petitions /></ExpandBox>
        <Leave />
        <Delete />
      </div>
    </CoalitionContextProvider>
  )
}

export default CoalitionWithContext;
