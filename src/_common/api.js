import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

const api = (collectionString) => {

  const getCurrentUser = () => {
    const auth = getAuth();
    return auth.currentUser;
  }
  const getDocRef = (id) => {
    const db = getFirestore();
    return doc(db, collectionString, id);
  }
  const getCollection = () => {
    const db = getFirestore();
    return collection(db, collectionString);
  }
  const getById = async id => {
    const docRef = getDocRef(id);
    return await getDoc(docRef);
  }

  const createDoc = async doc => {
    const docToAdd = {
      createdBy: getCurrentUser().uid,
      createdDate: new Date(),
      ...doc
    }
    return await addDoc(getCollection(), docToAdd);
  }

  const set = async (id, data) => {
    await setDoc(getDocRef(id), data);
    return await getById(id);
  }

  const deleteDocument = async id => {
    await deleteDoc(getDocRef(id));
  }


  const getByCoalitionId = async coalitionId => {
    const q = query(getCollection(), where("coalitionId", "==", coalitionId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  }

  return { getCurrentUser, createDoc, getDocRef, getCollection, getById, set, deleteDocument, getByCoalitionId };
}
export default api;

const getOriginUrl = () => {
  const baseUrl = window.location.origin;
  if (baseUrl === "https://eyarham.github.io") {
    return baseUrl + "/coalition";
  }
  return baseUrl;
}
export { getOriginUrl };