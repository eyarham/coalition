import React, { createContext, useEffect, useState } from 'react';
import { getByCoalitionIdSub } from '../rules/api';
import api from '../_common/api';
import { getIsOnlyUser } from '../_common/membershipApi';
import { getByIdForUser } from './api';

const CoalitionContext = createContext();
const CoalitionContextProvider = ({ children, coalitionId }) => {
  const [openCoalition, setOpenCoalition] = useState();
  const [isOnlyUser, setIsOnlyUser] = useState();
  const [showUsers, setShowUsers] = useState(false);
  const [rules, setRules] = useState();
  const [message, setMessage] = useState()
  useEffect(() => {
    const setFromParams = async () => {
      try {
        const coalition = await getByIdForUser(coalitionId);
        setOpenCoalition(coalition);
      }
      catch (e) {
        setMessage(e.message);
      }
    }
    setFromParams();
  }, [coalitionId])
  useEffect(() => {
    const effect = async () => {
      const isOnlyUserResult = await getIsOnlyUser(coalitionId);
      setIsOnlyUser(isOnlyUserResult);
    }
    effect();
  }, [coalitionId]);
  useEffect(() => {
    const isShowUsers = () => {
      if (rules && rules.length > 0) {
        const value = rules.filter(r => r.data().name === "ShowUsers")[0].data().value;
        return value === "true";
      }
    }
    setShowUsers(isShowUsers);
  }, [rules])
  useEffect(() => {
    if (coalitionId)
      return getByCoalitionIdSub(coalitionId, rulesResult => setRules(rulesResult));
  }, [coalitionId])
  const isCreator = openCoalition && openCoalition.data().createdBy === api().getCurrentUser().uid;


  if (isOnlyUser === undefined
    || openCoalition === undefined
    || rules === undefined
  ) {
    return <div>loading...</div>
  }
  return (
    <CoalitionContext.Provider value={{ coalition: openCoalition, isCreator, isOnlyUser, rules, showUsers }}>
      {children}
      <div>{message}</div>
    </CoalitionContext.Provider>
  )
}
export { CoalitionContext };
export default CoalitionContextProvider;