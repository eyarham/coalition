import React, { useState } from 'react';
import { write } from './api';

const NewCoalition = ({ setIsDirty }) => {
  const [newCoalitionName, setNewCoalitionName] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const [showUserNames, setShowUserNames] = useState(false);
  const addCoalition = async (e) => {
    e.preventDefault();
    await write(newCoalitionName, isPublic, showUserNames);
    setIsDirty(true);
  }
  const newCoalitionNameChange = (e) => {
    setNewCoalitionName(e.target.value);
  }
  const onPublicChange = e=>{
    setIsPublic(!isPublic);
  }
  const onShowUsernameChange = e=>{
    setShowUserNames(!showUserNames);
  }
  return (
    <div>
      Add New Coalition
      <form onSubmit={addCoalition}>
        <div>
          <label>name</label> <input onChange={newCoalitionNameChange} value={newCoalitionName}></input>
        </div>
        <div>
          <label>public?</label> <input type="checkbox" value={isPublic} onChange={onPublicChange}></input>
        </div>
        <div>
          <label>show usernames?</label> <input type="checkbox"  onChange={onShowUsernameChange} checked={showUserNames}></input>
        </div>
        <div>
          <input type="submit" />
          </div>
      </form>
    </div>
  )
}

export default NewCoalition
