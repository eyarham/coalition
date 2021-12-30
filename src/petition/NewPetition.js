import React, { useState } from 'react'
import { create } from './api';

const NewPetition = ({ coalitionId }) => {
  const [title, setTitle] = useState("initialState");
  const [body, setBody] = useState("initialState");
  const [message, setMessage] = useState("");

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
  return (
    <form onSubmit={onPetitionSubmit}>
      <input onChange={onChangeTitle} placeholder='title'></input>
      <input onChange={onChangeBody} placeholder='body'></input>
      <div><input type="submit" value="submit petition"></input></div>
      <div>{message}</div>
    </form>
  )
}

export default NewPetition
