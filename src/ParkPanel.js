import React, { useState } from 'react'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbf69wqSQcMxJ9shK8cqqIw2TeL4z8flg",
  authDomain: "fir-boilerplate-6fda0.firebaseapp.com",
  projectId: "fir-boilerplate-6fda0",
  storageBucket: "fir-boilerplate-6fda0.appspot.com",
  messagingSenderId: "111931837766",
  appId: "1:111931837766:web:d5cd2ca39dc35c99742947"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const ParkPanel = () => {
  const [parks, setParks] = useState([]);
  const [newParkName, setNewParkName] = useState('');

  const addPark = async (e) => {
    e.preventDefault();
    await writeParkData2(newParkName);
  }
  const newParkNameChange = (e) => {
    setNewParkName(e.target.value);
  }
  const getParkData = async () => {
    const querySnapshot = await getDocs(collection(db, "parks"));
    setParks(querySnapshot.docs);
    // querySnapshot.forEach((doc) => {
    //   setParks([...parks, doc.data()]);
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

  }

  const writeParkData2 = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "parks"), {
        name
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div>
      {parks && parks.map((park, i) => { return (<div key={i}>{park.data().name}</div>) })}
      new park
      <form onSubmit={addPark}>
        <input onChange={newParkNameChange} value={newParkName}></input>
        <input type="submit" />

      </form>
      <input type="button" value="getparkdata" onClick={getParkData} />
    </div>
  )
}

export default ParkPanel
