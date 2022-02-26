import { getAuth, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { checkRule, checkRuleSub } from "../rules/api";
import api from "../_common/api";
import { getAllByCoalitionId } from "../_common/membershipApi";

const { getCurrentUser, getCollection, set, getById, getByIdSub } = api("users");

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

const getLoggedInUser = async () => {
  const authUser = getCurrentUser();
  const user = await getByAuthId(authUser.uid);
  return user;
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

const updateUserEmail = async (newEmail, pw) => {
  const user = getCurrentUser();
  if (pw !== "") {
    await signInWithEmailAndPassword(getAuth(), user.email, pw);
  }
  try {
    await updateEmail(user, newEmail);
    return { valid: true };
  } catch (e) {
    switch (e.code) {
      case 'auth/invalid-email':
        return {
          valid: false, message: "Please enter a valid email address."
        }
      case 'auth/email-already-in-use':
        return {
          valid: false, message: "This email is already in use. \nIf you did not create an account with this email, please contact the site administrator."
        }
      case 'auth/requires-recent-login':
        return {
          valid: null
        }
      default:
        return {
          success: false, message: e.code
        }
    }
  }
}

const getUserName = async (userId, coalitionId) => {
  if (!userId) return;
  const showUsersRule = await checkRule(coalitionId, "ShowUserNames", "true");
  if (showUsersRule) {
    const user = await getById(userId);
    const userName = user.data().displayName
    return userName;
  }
  return "Anonymous";
}
const getUserNameSub = async (userId, coalitionId, callback) => {
  if (!userId) return;
  return checkRuleSub(coalitionId, "ShowUserNames", true, async (showUsersRule) => {
    if (showUsersRule) {
      return getByIdSub(userId, (user) => {
        const userName = user.data() && user.data().displayName
        callback(userName);
      })
    }
    callback("Anonymous");
  });
}

const getUserPronouns = async (userId) => {
  if (!userId) return;
  const user = await getById(userId);
  return user.data() && user.data().pronouns;
}

export { create, get, set, getByCoalitionId, updateUserEmail, getUserName, getCurrentUserId, getUserPronouns, getUserNameSub, getLoggedInUser };
