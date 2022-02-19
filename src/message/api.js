import { getCurrentUserId } from "../user/api";
import api from "../_common/api";

const { createDoc, getByCoalitionIdSub } = api("messages");

const create = async (coalitionId, text) => {
  const newRule = {
    coalitionId,
    text,
    postedBy: await getCurrentUserId()
  };
  await createDoc(newRule);
}


export { create, getByCoalitionIdSub };

