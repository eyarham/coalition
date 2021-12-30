import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import api from "../_common/api";
import { add } from '../_common/membershipApi';

const { getCurrentUser, getDocRef, getCollection } = api("petitions");

const create = async (coalitionId, title, body) => {
  const newPetition = {
    coalitionId,
    userId: getCurrentUser().uid,
    title,
    body
  }
  const docRef = await addDoc(getCollection(), newPetition);

}

const getByCoalitionId =async coalitionId =>{
  const q2 = query(getCollection(),  where("coalitionId", "==", coalitionId));
  const membershipQuerySnapshot = await getDocs(q2);
  return membershipQuerySnapshot.docs;
}

export { create, getByCoalitionId }