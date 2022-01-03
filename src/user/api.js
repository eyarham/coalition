import { addDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import api from "../_common/api"

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

  const q2 = query(getCollection(), where("userId", "==", user.uid));
  const membershipQuerySnapshot = await getDocs(q2);
  if(membershipQuerySnapshot.empty) return ;
  return membershipQuerySnapshot.docs[0];
}
export { create, get, set }