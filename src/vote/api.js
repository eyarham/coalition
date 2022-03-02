import { addDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import api from "../_common/api";

const { getCurrentUser, getCollection, set } = api("votes");

const submitVote = async (petitionId, selection) => {
  const existingVote = await getByPetitionIdForUser(petitionId);
  if (existingVote) {
    const voteToUpdate = {
      petitionId,
      userId: getCurrentUser().uid,
      selection
    }
    set(existingVote.id, voteToUpdate)
  }
  else {
    const newVote = {
      petitionId,
      userId: getCurrentUser().uid,
      selection
    }
    await addDoc(getCollection(), newVote);
  }
}

const getByPetitionIdForUser = async (petitionId) => {
  const q = query(getCollection(), where("petitionId", "==", petitionId), where("userId", "==", getCurrentUser().uid));
  const membershipQuerySnapshot = await getDocs(q);
  return membershipQuerySnapshot.docs[0];
}
const getByPetitionIdForUserSub = (petitionId, callback) => {
  const q = query(getCollection(), where("petitionId", "==", petitionId), where("userId", "==", getCurrentUser().uid));
  const unsub = onSnapshot(q, snap => {
    callback(snap.docs[0]);
  })
  return unsub;
}

const getByPetitionId = async (petitionId) => {
  const q = query(getCollection(), where("petitionId", "==", petitionId));
  const membershipQuerySnapshot = await getDocs(q);
  return membershipQuerySnapshot.docs;
}

const getByPetitionIdSub = async (petitionId, callback) => {

  const q = query(getCollection(), where("petitionId", "==", petitionId));
  return onSnapshot(q, snap => {
    callback(snap.docs);
  })

}



export { submitVote, getByPetitionId, getByPetitionIdForUser, getByPetitionIdForUserSub,getByPetitionIdSub };

