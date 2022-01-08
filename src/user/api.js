import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";
import { getAllByCoalitionId } from "../_common/membershipApi";

const { getCurrentUser, getCollection, set } = api("users");

const create = async (userId) => {
  var newUserData = {
    userId: userId,
    displayName: '',
    createdBy: getCurrentUser().uid
  }
  const docRef = await addDoc(getCollection(), newUserData);
  return await getDoc(docRef);
}

const get = async () => {
  const user = getCurrentUser();
  return await getById(user.uid);
  // const q2 = query(getCollection(), where("userId", "==", user.uid));
  // const membershipQuerySnapshot = await getDocs(q2);
  // if(membershipQuerySnapshot.empty) return await getDoc(create(user.uid));
  // return membershipQuerySnapshot.docs[0];
}

const getById = async (id) => {
  const q2 = query(getCollection(), where("userId", "==", id));
  const membershipQuerySnapshot = await getDocs(q2);
  if (membershipQuerySnapshot.empty) return await getDoc(create(id));
  return membershipQuerySnapshot.docs[0];
}
const getByCoalitionId = async (coalitionId) => {
  const memberships = await getAllByCoalitionId(coalitionId);
  const memberUsers = await Promise.all(memberships.map(async (m, i) => {
    const user = await getById(m.data().memberId);
    return user;
  }));
  return memberUsers;
}

export { create, get, set, getByCoalitionId };
