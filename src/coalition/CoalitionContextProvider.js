import React, { createContext, useContext, useEffect, useState } from 'react';
import { getIsOnlyUser, getUserIsMemberSub } from "../members/api";
import { getByCoalitionIdSub } from '../rules/api';
import { getCurrentUserId } from '../user/api';
import { UserContext } from '../user/UserContextProvider';
import { getByIdForUser } from './api';

const CoalitionContext = createContext();
const CoalitionContextProvider = ({ children, coalitionId }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [openCoalition, setOpenCoalition] = useState();
  const [isOnlyUser, setIsOnlyUser] = useState();
  const [rules, setRules] = useState();
  const [message, setMessage] = useState();
  const [isCreator, setIsCreatorState] = useState(false);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    return getUserIsMemberSub(user.id, coalitionId, setIsMember)
  }, [coalitionId, user.id])
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
    if (coalitionId)
      return getByCoalitionIdSub(coalitionId, rulesResult => setRules(rulesResult));
  }, [coalitionId])
  //const isCreator = openCoalition && openCoalition.data().createdBy === await getCurrentUserId();
  useEffect(() => {
    const effect = async () => {
      const isCreator = openCoalition && openCoalition.data().createdBy === await getCurrentUserId();

      setIsCreatorState(isCreator);
    }
    effect();
  }, [openCoalition])

  if (isOnlyUser === undefined
    || openCoalition === undefined
    || rules === undefined
  ) {
    return <div>loading...</div>
  }
  const providerValue = {
    coalition: openCoalition,
    isCreator, isOnlyUser, rules, isMember
  };
  return (
    <CoalitionContext.Provider value={providerValue}>
      {children}
      {message && <div>{message}</div>}
    </CoalitionContext.Provider>
  )
}
export { CoalitionContext };
export default CoalitionContextProvider;