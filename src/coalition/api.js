import { addDoc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import api, { getOriginUrl } from "../_common/api";
import { add, getCoalitionIdsForCurrentUser, getMemberCount } from "../_common/membershipApi";


const { getCurrentUser, getDocRef, getCollection } = api("coalitions");

const write = async (name) => {
  try {
    var newCoalition = {
      name
    }
    const docRef = await addDoc(getCollection(), newCoalition);
    console.log("Document written with ID: ", docRef.id);
    await add(docRef.id, getCurrentUser().uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const setCoalition = async (id, data) => {
  await setDoc(getDocRef(id), data);
  return await getById(id);
}
const get = async () => {
  const coalitionIds = await getCoalitionIdsForCurrentUser();
  return tenAtATime(coalitionIds, async (subCoalitionIds) => {
    if (subCoalitionIds.length === 0) return [];
    const q3 = query(getCollection(), where("__name__", "in", subCoalitionIds));
    const snapshot3 = await getDocs(q3);
    return snapshot3.docs;
  })

}
var iterator = function (a, n) {
  var current = 0,
    l = a.length;
  return function () {
    if (current === -1) return [];
    var end = current + n;
    var part = a.slice(current, end);
    current = end < l ? end : -1;
    return part;
  };
};
const tenAtATime = async (coalitionIds, getFunction) => {
  var resultArray = [];
  var next = iterator(coalitionIds, 10);
  for (var i = 0; i < 10; i++) {
    var subArray = next();
    var results = await getFunction(subArray);
    resultArray.push(...results);
  }
  return resultArray;
}

const getAll = async () => {
  const querySnapshot = await getDocs(getCollection());
  return querySnapshot.docs;
}

const getById = async (id) => {
  const docRef = getDocRef(id);
  const coalition = await getDoc(docRef);
  return coalition;
}


const getCoalitionLink = (coalitionId) => {
  const coalitionUrl = "/#/coalition/";
  const link = getOriginUrl() + coalitionUrl + coalitionId;
  return link;
}
const getCoalitionRedirect = (coalitionId) => {
  const coalitionUrl = "/coalition/";
  const link = coalitionUrl + coalitionId;
  return link;
}
const votesNeededRule = x => {
  if (x < 4) {
    return x
  }
  else {
    return x / 2;
  }
}
const getVotesNeeded = async (coalitionId) => {
  //const coalition = await getById(coalitionId);
  const memberCount = await getMemberCount(coalitionId);
  const votesNeeded = votesNeededRule(memberCount);
  return votesNeeded;
}

export { write, get, getAll, getById, setCoalition, getCoalitionLink, getCoalitionRedirect, getVotesNeeded };

