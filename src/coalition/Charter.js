
import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/Coalition';
import { updateCharter } from './api';

const Charter = () => {
  const coalitionContext = useContext(CoalitionContext);
  //const [text, setText] = useState();
  const { isOnlyUser, coalition } = coalitionContext;
  const [charterText, setCharterText] = useState(coalition.data().charter);
  const [message, setMessage] = useState("");
  // const charterText = coalition.data().charter;
  const onCharterSubmit = async e => {
    e.preventDefault();

    await updateCharter(coalition.id, charterText);
    setMessage("Updated");
  }
  const onTextChange = e => {
    setCharterText(e.target.value);
    setMessage("");
  }
  return (
    <div>
      <div>Charter:</div>
      {!isOnlyUser &&
        <textarea disabled={!isOnlyUser} value={charterText}></textarea>
      }
      {
        isOnlyUser &&
        <form onSubmit={onCharterSubmit}>
          <textarea onChange={onTextChange} value={charterText}></textarea>
          <br></br>
          <input type="submit"></input>
          {message}
        </form>
      }
    </div>
  )
}

export default Charter
