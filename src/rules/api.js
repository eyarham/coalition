import api from "../_common/api";

const { getByCoalitionId, getByCoalitionIdQuery, createDoc, set, getByCoalitionIdSub } = api("rules");

const getByName = async (coalitionId, name) => {
  const allByCoalition = await getByCoalitionId(coalitionId);
  const selectedCoalition = allByCoalition.filter(c => c.data().name === name);
  if (selectedCoalition.length === 1)
    return selectedCoalition[0];
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

export { getByCoalitionId, create, updateRule, getByCoalitionIdQuery, getByCoalitionIdSub };