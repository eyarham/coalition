import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import api, { getOriginUrl } from "../_common/api";
import { add } from '../_common/membershipApi';

const { getCurrentUser, getDocRef, getCollection } = api("invites");
const sendInvite = (inviteEmail) => {

}

const create = async (coalitionId, memberId) => {
  var newInvite = {
    coalitionId,
    memberId
  };
  const docRef = await addDoc(getCollection(), newInvite);
  return docRef;
}

const getByCoalition = async (coalitionId) => {
  const q2 = query(getCollection(), where("memberId", "==", getCurrentUser().uid), where("coalitionId", "==", coalitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  if (membershipQuerySnapshot.empty) {
    const newDocRef = await create(coalitionId, getCurrentUser().uid);
    return newDocRef;
  }
  else {
    return membershipQuerySnapshot.docs[0];
  }
}

const get = async (inviteId) => {
  const docRef = getDocRef(inviteId);
  const invite = await getDoc(docRef);
  return invite;

}

const accept = async (inviteId) => {
  const invite = await get(inviteId);
  await add(invite.data().coalitionId, getCurrentUser().uid);
  //get invite
  //confirm coalition  
  //add user

}

const getLink = async (coalitionId) => {
  const baseUrl = getOriginUrl();
  const inviteUrl = "/#/invite";
  const invite = await getByCoalition(coalitionId);
  const inviteId = invite.id;
  const query = "?id=" + inviteId;
  const inviteLink = baseUrl + inviteUrl + query;
  return inviteLink;
}

export { sendInvite, get, create, accept, getByCoalition, getLink };

