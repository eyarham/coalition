import React, { useEffect, useState } from 'react';
import { processPetition } from '../petition/api';
import { getByPetitionIdForUserSub, submitVote } from './api';
import "./vote.css";

const Vote = ({ petitionId }) => {
  const [selectedVote, setSelectedVote] = useState();
  useEffect(() => {
    getByPetitionIdForUserSub(petitionId, v => {
      if (v) {
        const { selection } = v.data();
        setSelectedVote(selection);
      }
    })
  }, [petitionId])

  const onVoteYes = async e => {
    e.preventDefault();
    await submitVote(petitionId, "yes");
    await processPetition(petitionId);
  }
  const onVoteNo = async e => {
    e.preventDefault();
    await submitVote(petitionId, "no");
    await processPetition(petitionId);
  }
  return (
    <div className='vote-box'>
      <input type="button" value="yes" onClick={onVoteYes} disabled={selectedVote === "yes"}></input>
      <input type="button" value="no" onClick={onVoteNo} disabled={selectedVote === "no"}></input>
    </div>
  )
}

export default Vote
