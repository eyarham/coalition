import React, { useState } from 'react'
import { create } from './api';

const NewMessage = ({ coalitionId }) => {
  const [text, setText] = useState('');
  const onTextChange = e => {
    setText(e.target.value);
  }
  const onSubmitMessage = async e => {
    e.preventDefault();
    await create(coalitionId, text);
    setText('');
  }
  return (
    <form onSubmit={onSubmitMessage}>
      <input placeholder='message' onChange={onTextChange} value={text}></input>
      <input type="submit"></input>
    </form>
  )
}

export default NewMessage;