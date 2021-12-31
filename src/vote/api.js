import { addDoc } from "firebase/firestore";
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

export { submitVote };
