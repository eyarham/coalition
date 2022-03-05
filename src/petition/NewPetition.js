import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { create2 } from './api';
import NewPetitionForm from './NewPetitionForm';
import petitionTypes from './petitionTypes';

const NewPetition = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [message, setMessage] = useState("");
  const [petitionType, setPetitionType] = useState("0");
  const [petitionData, setPetitionData] = useState();

  const onPetitionSubmit = async e => {
    e.preventDefault();
    await create2(coalition.id, petitionType, petitionData);
    setMessage("Created Successfully");
  }
  const onPetitionTypeChange = e => {
    const newPetitionType = e.target.value;
    setPetitionType(newPetitionType);
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
