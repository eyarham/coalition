import { getAuth, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";
import { getAllByCoalitionId } from "../_common/membershipApi";

const { getCurrentUser, getCollection, set } = api("users");

const create = async (userId) => {
  var newUserData = {
    userId: userId,
    displayName: '',
    createdBy: getCurrentUser().uid
  };
  const docRef = await addDoc(getCollection(), newUserData);
  return await getDoc(docRef);
}

const get = async () => {
  const user = getCurrentUser();
  return await getById(user.uid);
}

const getById = async (id) => {
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
  //Currently requires two loops but works???!
  if (pw != "") {
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

export { create, get, set, getByCoalitionId, updateUserEmail };

