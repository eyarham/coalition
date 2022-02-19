import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { checkRule } from "../rules/api";
import { getCurrentUserId } from "../user/api";
import api from "./api";
const { getDocRef, getCollection } = api("memberships");
const add = async (coalitionId, memberId) => {

  var newMembership = {
    coalitionId,
    memberId
  }
  await addDoc(getCollection(), newMembership);
}

const getCoalitionIdsForCurrentUser = async () => {
  const currentUserId = await getCurrentUserId();
  const q2 = query(getCollection(), where("memberId", "==", currentUserId));
  const membershipQuerySnapshot = await getDocs(q2);
  var coalitionIds = [];
  membershipQuerySnapshot.forEach((doc) => {
    coalitionIds.push(doc.data().coalitionId);
  });
  return coalitionIds;
}

const getByCoalitionId = async (coalitionId) => {
  const q2 = query(getCollection(), where("memberId", "==", await getCurrentUserId()), where("coalitionId", "==", coalitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  return membershipQuerySnapshot.docs[0];
}

const getAllByCoalitionIdInternal = async (coalitionId) => {
  const q2 = query(getCollection(), where("coalitionId", "==", coalitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  return membershipQuerySnapshot.docs;
}
const getAllByCoalitionId = async (coalitionId) => {
  if (await checkRule(coalitionId, "ShowUsers", "true") === true) {
    return await getAllByCoalitionIdInternal(coalitionId);
  }
}

const getMemberCount = async (coalitionId) => {
  if (await checkRule(coalitionId, "ShowUsers", "true")) {
    const allMembers = await getAllByCoalitionId(coalitionId);
    return allMembers.length;
  }
  return -1;
}

const getIsOnlyUser = async (coalitionId) => {
  const members = await getAllByCoalitionIdInternal(coalitionId);
  if (members.length === 1 && members[0].data() && members[0].data().memberId === await getCurrentUserId()) {
    return true;
  }
  return false;
}

const remove = async (coalitionId) => {
  const membership = await getByCoalitionId(coalitionId);
  var memberCount = await getMemberCount(membership.data().coalitionId)
  if (memberCount > 1) {
    await deleteDoc(getDocRef(membership.id));
  }
  else {
    throw new Error("Can not delete last member.");
  }
}

export { add, getCoalitionIdsForCurrentUser, remove, getAllByCoalitionId, getMemberCount, getByCoalitionId, getIsOnlyUser };

