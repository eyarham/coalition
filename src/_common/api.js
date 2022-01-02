import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc , deleteDoc} from "firebase/firestore";

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

  const set = async (id, data) => {
    await setDoc(getDocRef(id), data);
    return await getById(id);
  }

  const deleteDocument = async id =>{
    await deleteDoc(getDocRef(id));
  }

  return { getCurrentUser, getDocRef, getCollection, getById, set, deleteDocument };
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