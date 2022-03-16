
import api from "../_common/api";

const { createDoc, getByCoalitionIdSub, deleteDocument } = api("roles");
const create = async (coalitionId, name, memberId) => {
  const newDoc = {
    coalitionId,
    name,
    memberId
  }
  await createDoc(newDoc)
}
export { getByCoalitionIdSub, create, deleteDocument };
