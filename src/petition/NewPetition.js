import React, { useState } from 'react';
import petitionTypes from './petitionTypes';
import { create2 } from './api';
import NewPetitionForm from './NewPetitionForm';

const NewPetition = ({ coalitionId }) => {
  const [message, setMessage] = useState("");
  const [petitionType, setPetitionType] = useState("0");
  const [petitionData, setPetitionData] = useState();

  const onPetitionSubmit = async e => {
    e.preventDefault();
    await create2(coalitionId, petitionType, petitionData);
    setMessage("Created Successfully");
  }
  const onPetitionTypeChange = e => {
    setPetitionType(e.target.value);
  }
  const setPetitionDataParent = (data) => {
    setPetitionData(data);
  }
  return (
    <form onSubmit={onPetitionSubmit}>
      <select onChange={onPetitionTypeChange}>
        {petitionTypes.map((t, i) => <option key={i} value={t.value}>{t.text}</option>)}
      </select>
      <NewPetitionForm petitionType={petitionType} setPetitionDataParent={setPetitionDataParent} />
      <div><input type="submit" value="submit petition"></input></div>
      <div>{message}</div>
    </form>
  )
}

export default NewPetition
