import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";

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
  return { getCurrentUser, getDocRef, getCollection };
}

export default api;