import React, { useState } from 'react';
import petitionTypes from '../_common/petitionTypes';
import { create2 } from './api';

const NewPetition = ({ coalitionId }) => {
  const [message, setMessage] = useState("");
  const [petitionType, setPetitionType] = useState("0");
  const [petitionData, setPetitionData] = useState();

  const onChangeTitle = e => {
    setPetitionData({ ...petitionData, title: e.target.value });
  }
  const onChangeBody = e => {
    setPetitionData({ ...petitionData, body: e.target.value });
  }
  const onPetitionSubmit = async e => {
    e.preventDefault();
    await create2(coalitionId, petitionType, petitionData);
    setMessage("Created Successfully");
  }
  const onPetitionTypeChange = e => {
    setPetitionType(e.target.value);
  }
  const onChangeCharterText = e => {
    setPetitionData({ charterText: e.target.value });
  }
  return (
    <form onSubmit={onPetitionSubmit}>
      <select onChange={onPetitionTypeChange}>
        {petitionTypes.map((t, i) => <option key={i} value={t.value}>{t.text}</option>)}
      </select>
      {petitionType === "0" && (
        <div>
          <div>text petition</div>
          <div><input onChange={onChangeTitle} placeholder='title'></input></div>
          <div><input onChange={onChangeBody} placeholder='body'></input></div>
        </div>
      )}
      {petitionType === "1" && (
        <div>
          <div>update charter</div>
          <div><input onChange={onChangeCharterText} placeholder='charter text'></input></div>
        </div>
      )}
      <div><input type="submit" value="submit petition"></input></div>
      <div>{message}</div>
    </form>
  )
}

export default NewPetition
