import React, { useState } from 'react';
import { create2 } from './api';

const NewPetition = ({ coalitionId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [petitionType, setPetitionType] = useState("0");
  const [charterText, setCharterText] = useState();

  const onChangeTitle = e => {
    setTitle(e.target.value);
  }
  const onChangeBody = e => {
    setBody(e.target.value);
  }
  const onPetitionSubmit = async e => {
    e.preventDefault();
    if (petitionType === "0") {
      await create2(coalitionId, petitionType, { title, body })
    }
    else if (petitionType === "1") {
      await create2(coalitionId, petitionType, { charterText })
    }

    setMessage("Created Successfully");
  }
  const onPetitionTypeChange = e => {
    setPetitionType(e.target.value);
  }
  const onChangeCharterText = e => {
    setCharterText(e.target.value);
  }
  return (
    <form onSubmit={onPetitionSubmit}>
      <select onChange={onPetitionTypeChange}>
        <option value={0}>Text Petition</option>
        <option value={1}>Update Charter</option>
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
