import React from 'react';
import { submitVote } from './api';

const Vote = ({ petitionId }) => {
  const onVoteYes = async e => {
    e.preventDefault();
    await submitVote(petitionId, "yes")
  }
  const onVoteNo = async e => {
    e.preventDefault();
    await submitVote(petitionId, "yes")
  }
  return (
    <div>
      <input type="button" value="yes" onClick={onVoteYes}></input>
      <input type="button" value="no" onClick={onVoteNo}></input>
    </div>
  )
}

export default Vote