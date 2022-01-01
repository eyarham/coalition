import React, { useState } from 'react'
import { create } from './api';

const NewPetition = ({ coalitionId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [petitionType, setPetitionType] = useState("");
  const [charterText, setCharterText] = useState()

  const onChangeTitle = e => {
    setTitle(e.target.value);
  }
  const onChangeBody = e => {
    setBody(e.target.value);
  }
  const onPetitionSubmit = async e => {
    e.preventDefault();
    await create(coalitionId, title, body);
    setMessage("Created Successfully");
  }
  const onPetitionTypeChange = e => {
    setPetitionType(e.target.value);

  }
  const onChangeCharterText = e=>{
    setCharterText(e.target.value);
  }
  return (
    <form onSubmit={onPetitionSubmit}>
      <select onChange={onPetitionTypeChange}>
        <option value={0}>Open Petition</option>
        <option value={1}>Update Charter</option>
      </select>
      {petitionType === "0" && (
        <div>
          <input onChange={onChangeTitle} placeholder='title'></input>
          <input onChange={onChangeBody} placeholder='body'></input>
        </div>
      )}
      {petitionType ==="1" && (
        <div>
          <input onChange={onChangeCharterText} placeholder='charter text'></input>          
        </div>
      )}
      <div><input type="submit" value="submit petition"></input></div>
      <div>{message}</div>
    </form>
  )
}

export default NewPetition
