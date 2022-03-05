import { addDoc, getDocs, query, where } from "firebase/firestore";
import { updateCharter } from '../coalition/api';
import { getMemberCount, getMemberCountSub } from "../members/api";
import { createWithType, getByName, getByNameSub, updateRule } from "../rules/api";
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
    const { ruleName, type, value } = petition.data();
    await createWithType(coalitionId, ruleName, type, value);
  }
  else if (petitionType === "3") {//Rule Change
    const { ruleName, value } = petition.data();
    await updateRule(coalitionId, ruleName, value);
  }
  await set(petitionId, { ...petition.data(), status: "complete" });
}

const updateStatus = async (petitionId, status) => {
  const petition = await getById(petitionId);
  await set(petitionId, { ...petition.data(), status });
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

const processPetition = async (petitionId) => {
  const petition = await getById(petitionId);
  const { status, coalitionId } = petition.data();
  var changedStatus = status;
  //new=>passed=>ready=>complete
  if (status === "new") {
    changedStatus = await assessPetitionVotes(coalitionId, petitionId);
  }
  if (changedStatus === "passed" || status === "passed") {
    changedStatus = await checkReady(petitionId);
  }
  if (changedStatus === "ready" || status === "ready") {
    await completePetition(petitionId);
    //get to "complete"
  }
}

const assessPetitionVotes = async (coalitionId, petitionId) => {
  //get to "passed"
  const votes = await getByPetitionId(petitionId);
  const yesVotes = votes.filter(v => v.data().selection === "yes")
  var votesNeeded = await getVotesNeeded(coalitionId);
  if (votesNeeded > 0 && yesVotes.length >= votesNeeded) {
    await updateStatus(petitionId, "passed");
    return "passed";
  }
  return "new";
}

const getVotesNeeded = async (coalitionId) => {
  const memberCount = await getMemberCount(coalitionId);
  const votesNeededRule = await getByName(coalitionId, "votesNeeded");
  if (votesNeededRule) {
    const { value } = votesNeededRule.data();
    return value
  }
  else {
    return memberCount;
  }
}

const getVotesNeededSub = async (coalitionId, callback) => {
  const unsub2 = getMemberCountSub(coalitionId, (memberCount) => {
    const unsub = getByNameSub(coalitionId, "votesNeeded", async votesNeededRule => {
      if (votesNeededRule) {
        const { value } = votesNeededRule.data();
        callback(value);
      }
      else {
        callback(memberCount);
      }
    }, err => {
      callback(memberCount);
    }

    );
    return unsub;
  });
  return unsub2;
}

const checkReady = async (petitionId) => {
  //check rules, completion date, etc
  await updateStatus(petitionId, "ready");
  return "ready";
}

const completePetition = async (petitionId) => {
  const petition = await getById(petitionId);
  const { petitionType, coalitionId, charterText } = petition.data();
  if (petitionType === "1") {//Update Charter
    await updateCharter(coalitionId, charterText);
  }
  else if (petitionType === "2") {//Rule Add
    const { ruleName, type, value } = petition.data();
    await createWithType(coalitionId, ruleName, type, value);
  }
  else if (petitionType === "3") {//Rule Change
    const { ruleName, value } = petition.data();
    await updateRule(coalitionId, ruleName, value);
  }
  await updateStatus(petitionId, "complete");
  return "complete";
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

export { getByCoalitionId, checkVotes, create2, updatePetition, getOutcome, getByCoalitionIdSub, getByIdSub, processPetition, getVotesNeeded, getVotesNeededSub };

