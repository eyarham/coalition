import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
// Allows for better testing experience
const firebase = {
  getAuth, collection, doc, getDoc, getFirestore, setDoc, deleteDoc
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

  const createDoc = async doc => {
    const docToAdd = {
      createdBy: getCurrentUser().uid,
      createdDate: new Date(),
      ...doc
    }
    return await addDoc(getCollection(), docToAdd);
  }

  const set = async (id, data) => {
    await firebase.setDoc(getDocRef(id), data);
    return await getById(id);
  }

  const deleteDocument = async id => {
    await firebase.deleteDoc(getDocRef(id));
  }

  const getByCoalitionId = async coalitionId => {
    const q = query(getCollection(), where("coalitionId", "==", coalitionId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  }

  const getByCoalitionIdSub = (coalitionId, callback)=>{
    const q = query(getCollection(), where("coalitionId", "==", coalitionId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }
  return { getCurrentUser, createDoc, getDocRef, getCollection, getById, set, deleteDocument, getByCoalitionId, getByCoalitionIdSub };
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

