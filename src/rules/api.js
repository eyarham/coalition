import api from "../_common/api";

const { getByCoalitionId, getByCoalitionIdQuery, createDoc, set, getByCoalitionIdSub, deleteDocument } = api("rules");

const getByName = async (coalitionId, name) => {
  const allByCoalition = await getByCoalitionId(coalitionId);
  const filteredRules = allByCoalition.filter(c => c.data().name === name);
  if (filteredRules.length > 0)
    return filteredRules[0];
}

const getByNameSub = async (coalitionId, name, callback, error) => {
  return getByCoalitionIdSub(coalitionId, async (allByCoalition) => {
    const filteredRules = allByCoalition.filter(c => c.data().name === name);
    if (filteredRules.length > 0) {
      callback(filteredRules[0]);
    }
    else {
      error(new Error("no such rule"));
    }
  }, err =>
    error(err));
}

const create = async (coalitionId, name, value) => {
  const newRule = {
    coalitionId,
    name,
    value
  }
  await createDoc(newRule)
}


const createWithType = async (coalitionId, name, type, value) => {
  const newRule = {
    coalitionId,
    name,
    type,
    value
  }
  await createDoc(newRule)
}

const updateRule = async (coalitionId, name, value) => {
  //get rule
  const ruleToUpdate = await getByName(coalitionId, name);
  //update values
  const newData = { ...ruleToUpdate.data(), value };
  //save rule
  await set(ruleToUpdate.id, newData);
}

const checkRule = async (coalitionId, name, value) => {
  const ruleToCheck = await getByName(coalitionId, name);
  if (ruleToCheck) {
    return ruleToCheck.data().value === value;
  }
}

const checkRuleSub = async (coalitionId, name, value, callback, error) => {
  return getByNameSub(coalitionId, name, (ruleToCheck) => {
    if (ruleToCheck) {
      callback(ruleToCheck.data().value === value);
    }
  }, err => {
   error && error(err);
  });
}

const initializeRules = async (coalitionId, isPublic, showUserNames) => {
  await create(coalitionId, "Public", isPublic);
  await create(coalitionId, "ShowUserNames", showUserNames);
}

export { getByCoalitionId, updateRule, getByCoalitionIdQuery, getByCoalitionIdSub, checkRule, getByName, getByNameSub, checkRuleSub, initializeRules, deleteDocument, createWithType };

