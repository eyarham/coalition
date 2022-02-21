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

const postedByCurrentUser = async (postedBy) => {
  const userId = await getCurrentUserId();
  return userId === postedBy;
}

export { create, getByCoalitionIdSub, postedByCurrentUser };

