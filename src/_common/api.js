import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc , deleteDoc } from "firebase/firestore";

// Allows for better testing experience
const firebase = {
  getAuth, collection, doc, getDoc, getFirestore, setDoc , deleteDoc
}

const api = (collectionString) => {

  const getCurrentUser = () => {
    const auth = firebase.getAuth();
    return auth.currentUser;
  }
  const getDocRef = (id) => {
    const db = firebase.getFirestore();
    return firebase.doc(db, collectionString, id);
  }
  const getCollection = () => {
    const db = firebase.getFirestore();
    return firebase.collection(db, collectionString);
  }
  const getById = async id => {
    const docRef = getDocRef(id);
    return await firebase.getDoc(docRef);
  }

  const set = async (id, data) => {
    await firebase.setDoc(getDocRef(id), data);
    return await getById(id);
  }

  const deleteDocument = async id =>{
    await firebase.deleteDoc(getDocRef(id));
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
export { getOriginUrl, firebase };
