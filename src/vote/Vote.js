import React from 'react';
import { checkVotes } from '../petition/api';
import { submitVote } from './api';

const Vote = ({ petitionId }) => {
  const onVoteYes = async e => {
    e.preventDefault();
    await submitVote(petitionId, "yes");
    await checkVotes(petitionId);
  }
  const onVoteNo = async e => {
    e.preventDefault();
    await submitVote(petitionId, "no");
    await checkVotes(petitionId);
  }
  return (
    <div>
      <input type="button" value="yes" onClick={onVoteYes}></input>
      <input type="button" value="no" onClick={onVoteNo}></input>
    </div>
  )
}

export default Vote
