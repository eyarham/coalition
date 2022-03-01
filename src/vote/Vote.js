import React, { useEffect, useState } from 'react';
import { checkVotes } from '../petition/api';
import { getByPetitionIdForUser, submitVote } from './api';

const Vote = ({ petitionId }) => {
  const [selectedVote, setSelectedVote] = useState();
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
  useEffect(() => {
    const effect = async () => {
      const existingVote = await getByPetitionIdForUser(petitionId);
      if (existingVote) setSelectedVote(existingVote.data());
    }
    effect();
  }, [petitionId])
  return (
    <div>
      <input type="button" value="yes" onClick={onVoteYes}></input>
      <input type="button" value="no" onClick={onVoteNo}></input>
      Selection: {selectedVote && selectedVote.selection}
    </div>
  )
}

export default Vote
