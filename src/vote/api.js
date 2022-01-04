import { addDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";

const { getCurrentUser, getCollection } = api("votes");

const submitVote = async (petitionId, selection) => {
  //check for existing vote
  
  const existingVotes = await getByPetitionIdForUser(petitionId);
  if (existingVotes.length === 0) {
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
  return membershipQuerySnapshot.docs;
}

const getByPetitionId = async (petitionId) => {
  const q = query(getCollection(), where("petitionId", "==", petitionId));
  const membershipQuerySnapshot = await getDocs(q);
  return membershipQuerySnapshot.docs;
}

export { submitVote, getByPetitionId };

