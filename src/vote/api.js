import { addDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";

const { getCurrentUser, getCollection } = api("votes");

const submitVote = async (petitionId, selection) => {
  const newVote = {
    petitionId,
    userId: getCurrentUser().uid,
    selection
  }
  await addDoc(getCollection(), newVote);
}

const getByPetitionId = async (petitionId) => {
  const q2 = query(getCollection(), where("petitionId", "==", petitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  return membershipQuerySnapshot.docs;
}

export { submitVote, getByPetitionId };

