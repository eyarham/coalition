import { addDoc, getDocs, query, where } from "firebase/firestore";
import { getVotesNeeded, updateCharter } from '../coalition/api';
import { create, updateRule } from "../rules/api";
import { getByPetitionId } from "../vote/api";
import api from "../_common/api";

const { getCurrentUser, getById, getCollection, set, getByCoalitionIdSub, getByIdSub } = api("petitions");

const create2 = async (coalitionId, petitionType, data) => {
  const votesNeeded = await getVotesNeeded(coalitionId);
  const newPetition = {
    coalitionId,
    petitionType,
    userId: getCurrentUser().uid,
    votesNeeded,
    status: "new",
    ...data
  }
  await addDoc(getCollection(), newPetition);

}

const getByCoalitionId = async coalitionId => {
  const q2 = query(getCollection(), where("coalitionId", "==", coalitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  return membershipQuerySnapshot.docs;
}

const executePetition = async (petitionId) => {
  const petition = await getById(petitionId);
  const { petitionType, coalitionId, charterText } = petition.data();
  if (petitionType === "1") {//Update Charter
    await updateCharter(coalitionId, charterText);
  }
  else if (petitionType === "2") {//Rule Add
    const { ruleName, value } = petition.data();
    await create(coalitionId, ruleName, value);
  }
  else if (petitionType === "3") {//Rule Change
    const { ruleName, value } = petition.data();
    await updateRule(coalitionId, ruleName, value);
  }
  await set(petitionId, { ...petition.data(), status: "complete" });
}
const checkVotes = async (petitionId) => {
  const petition = await getById(petitionId);
  const votesNeeded = petition.data().votesNeeded;
  const votes = await getByPetitionId(petitionId);
  const yesVotes = votes.filter(v => v.data().selection === "yes")
  if (yesVotes.length >= votesNeeded) {
    await executePetition(petitionId);
  }
}

const getOutcome = async (petitionId) => {
  const petition = await getById(petitionId);
  const votesNeeded = petition.data().votesNeeded;
  const votes = await getByPetitionId(petitionId);
  const yesVotes = votes.filter(v => v.data().selection === "yes").length;
  const noVotes = votes.filter(v => v.data().selection === "no").length;

  return { votesNeeded, yesVotes, noVotes }

}

const updatePetition = async (petitionId) => {
  const petition = getById(petitionId);
  await set(petitionId, { ...petition });
}

export { getByCoalitionId, checkVotes, create2, updatePetition, getOutcome, getByCoalitionIdSub, getByIdSub };

