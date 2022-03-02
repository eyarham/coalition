import React, { useEffect, useState } from 'react';
import { checkVotes } from '../petition/api';
import { getByPetitionIdForUserSub, submitVote } from './api';

const Vote = ({ petitionId }) => {
  const [selectedVote, setSelectedVote] = useState();
  useEffect(() => {
    getByPetitionIdForUserSub(petitionId, v => {
      if (v) {
        setSelectedVote(v.data());
      }
    })
  }, [petitionId])

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
      Selection: {selectedVote && selectedVote.selection}
    </div>
  )
}

export default Vote
