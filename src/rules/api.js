import api from "../_common/api";

const { getByCoalitionId, createDoc } = api("rules");

const create = async (ruleName, ruleValue) => {
  const newRule = {
    name: ruleName,
    value: ruleValue
  }
  await createDoc(newRule)
}

export { getByCoalitionId, create };