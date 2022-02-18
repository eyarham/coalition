import React, { createContext, useEffect, useState } from 'react';
import InviteLink from '../invite/InviteLink';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import { getByCoalitionIdSub } from '../rules/api';
import Rules from '../rules/Rules';
import Members from '../user/Members';
import api from '../_common/api';
import ExpandBox from '../_common/ExpandBox';
import { getIsOnlyUser } from '../_common/membershipApi';
import { getCoalitionLink } from './api';
import Charter from './Charter';
import Delete from './Delete';
import Leave from './Leave';

const CoalitionContext = createContext();
const Coalition = ({ selectedCoalition }) => {
  const [openCoalition, setOpenCoalition] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [isOnlyUser, setIsOnlyUser] = useState();
  const [rules, setRules] = useState();
  const setActiveCoalition = async (coalition) => {
    setOpenCoalition(coalition);
  }
  useEffect(() => {
    const setFromProps = async () => setActiveCoalition(selectedCoalition);
    setFromProps();
  }, [selectedCoalition]);
  useEffect(() => {
    const effect = async () => {
      const isOnlyUserResult = await getIsOnlyUser(selectedCoalition.id);
      setIsOnlyUser(isOnlyUserResult);
    }
    effect();
  }, [selectedCoalition]);
  useEffect(() => {
    const isShowUsers = () => {
      if (rules) {
        const value = rules.filter(r => r.data().name === "ShowUsers")[0].data().value;
        return value === "true";
      }
    }
    setShowUsers(isShowUsers);
  }, [rules])
  useEffect(() => {
    return getByCoalitionIdSub(selectedCoalition.id, rulesResult => setRules(rulesResult));
  }, [selectedCoalition.id])
  if (!openCoalition) return <div>Loading</div>;
  const isCreator = openCoalition && openCoalition.data().createdBy === api().getCurrentUser().uid;
  //TODO: create a useEffect hook that connects the coalition sub 
  //      and sets state
  return (
    <CoalitionContext.Provider value={{ coalition: openCoalition, isCreator, isOnlyUser, rules, showUsers }}>
      <div>
        <h2> {openCoalition.data().name}</h2>
        {isOnlyUser && <div>Only User Mode</div>}
        <a href={getCoalitionLink(openCoalition.id)}>Coalition Link</a>
        {showUsers &&
          <ExpandBox headerText="Members">
            <Members coalitionId={openCoalition.id} />
          </ExpandBox>
        }
        <ExpandBox headerText="Charter">
          <Charter openCoalition={openCoalition} />
        </ExpandBox>
        <ExpandBox headerText="Rules"><Rules /></ExpandBox>
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
    </CoalitionContext.Provider>
  )
}
export { CoalitionContext };

export default Coalition;
