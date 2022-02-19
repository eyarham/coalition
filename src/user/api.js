import { updateEmail } from "firebase/auth";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";
import { getAllByCoalitionId } from "../_common/membershipApi";

const { getCurrentUser, getCollection, set, getById } = api("users");

const create = async (authId) => {
  var newUserData = {
    userId: authId,
    authId: authId,
    displayName: '',
    createdBy: getCurrentUser().uid
  };
  const docRef = await addDoc(getCollection(), newUserData);
  return await getDoc(docRef);
}

const get = async () => {
  const user = getCurrentUser();
  return await getByAuthId(user.uid);
}

const getCurrentUserId = async () => {
  const authUser = getCurrentUser();
  const user = await getByAuthId(authUser.uid);
  return user.id;
}

const getByAuthId = async (id) => {
  const q2 = query(getCollection(), where("userId", "==", id));
  const membershipQuerySnapshot = await getDocs(q2);
  if (membershipQuerySnapshot.empty) return await getDoc(create(id));
  return membershipQuerySnapshot.docs[0];
}
const getByCoalitionId = async (coalitionId) => {
  const memberships = await getAllByCoalitionId(coalitionId);
  if (memberships && memberships.length > 0) {
    const memberUsers = await Promise.all(memberships.map(async (m, i) => {
      const user = await getById(m.data().memberId);
      return user;
    }));
    return memberUsers;
  }
}

const updateUserEmail = async (newEmail) => {
  const user = getCurrentUser();
  //TODO: create check for recent sign-in and prompt for credentials if needed
  // const credential = promptForCredentials();
  await updateEmail(user, newEmail);
}

const getUserName = async (userId) => {
  if (!userId) return;
  const user = await getById(userId);
  const userName = user.data().displayName
  return userName;
}

const getUserPronouns = async (userId) => {
  if (!userId) return;
  const user = await getById(userId);
  return user.data().pronouns;  
}

export { create, get, set, getByCoalitionId, updateUserEmail, getUserName, getCurrentUserId ,getUserPronouns};

