import api from "../../_common/api";

const { createDoc, deleteDocument, getDocsSub } = api("systemRules");
const addSystemRule = async (rule) => {
  const newRule = { ...rule };
  await createDoc(newRule);
}
export { addSystemRule, deleteDocument, getDocsSub };

