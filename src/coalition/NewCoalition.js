import React, { useState } from 'react';
import { write } from './api';

const NewCoalition = ({ setIsDirty }) => {
  const [newCoalitionName, setNewCoalitionName] = useState();
  const addCoalition = async (e) => {
    e.preventDefault();
    await write(newCoalitionName);
    setIsDirty(true);
  }
  const newCoalitionNameChange = (e) => {
    setNewCoalitionName(e.target.value);
  }
  return (
    <div>
      Add New Coalition
      <form onSubmit={addCoalition}>
        <input onChange={newCoalitionNameChange} value={newCoalitionName}></input>
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewCoalition
