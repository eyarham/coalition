import api from "../_common/api";

const { getByCoalitionId, getByCoalitionIdQuery, createDoc, set, getByCoalitionIdSub } = api("rules");

const getByName = async (coalitionId, name) => {
  const allByCoalition = await getByCoalitionId(coalitionId);
  const filteredRules = allByCoalition.filter(c => c.data().name === name);
  if (filteredRules.length === 1)
    return filteredRules[0];
}

const getByNameSub = async (coalitionId, name, callback) => {
  return getByCoalitionIdSub(coalitionId, async (allByCoalition) => {
    const filteredRules = allByCoalition.filter(c => c.data().name === name);
    if (filteredRules.length === 1)
      callback(filteredRules[0]);
  });
}

const create = async (coalitionId, name, value) => {
  const newRule = {
    coalitionId,
    name,
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

const checkRuleSub = async (coalitionId, name, value, callback) => {
  return getByNameSub(coalitionId, name, (ruleToCheck)=>{
    if (ruleToCheck) {
      callback(ruleToCheck.data().value === value);
    }
  });
}

export { getByCoalitionId, create, updateRule, getByCoalitionIdQuery, getByCoalitionIdSub, checkRule, getByNameSub, checkRuleSub };