import { addDoc, deleteDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
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
  return await getAllByCoalitionIdInternal(coalitionId);
}

const getMemberCount = async (coalitionId) => {
  const allMembers = await getAllByCoalitionId(coalitionId);
  return allMembers.length;
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
const getUserIsMemberSub = async (userId, coalitionId, callback) => {
  const q2 = query(getCollection(), where("memberId", "==", userId), where("coalitionId", "==", coalitionId));
  const unsub = onSnapshot(q2, snap => {
    if (snap && snap.docs && snap.docs.length > 0) {
      callback(true);
    }
    else {
      callback(false);
    }
  })
  return unsub;
}

const getUserIsMember = async (coalitionId) => {
  const currentUserId = await getCurrentUserId();
  const q2 = query(getCollection(), where("memberId", "==", currentUserId), where("coalitionId", "==", coalitionId));
  const snap = await getDocs(q2);
  if (snap && snap.docs && snap.docs.length > 0) {
    return true
  }
  return false;
}

export { add, getCoalitionIdsForCurrentUser, remove, getAllByCoalitionId, getMemberCount, getByCoalitionId, getIsOnlyUser, getUserIsMember, getUserIsMemberSub };