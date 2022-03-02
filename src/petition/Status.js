import React, { useEffect, useState } from 'react';
import { getByPetitionIdSub } from '../vote/api';
import { getByIdSub } from './api';

const Status = ({ petitionId }) => {
  const [votes, setVotes] = useState();
  const [votesNeeded, setVotesNeeded] = useState();
  useEffect(() => {
    return getByPetitionIdSub(petitionId, v => {
      setVotes(v);
    });
  }, [petitionId])
  useEffect(() => {
    getByIdSub(petitionId, p => {
      const { votesNeeded } = p.data();
      setVotesNeeded(votesNeeded);
    })
  }, [petitionId])
  const yesVotes = votes && votes.filter(v => v.data().selection === "yes").length;
  const noVotes = votes && votes.filter(v => v.data().selection === "no").length;

  return (
    <div>
      {<div>Outcome:
        Yes: {yesVotes}
        No: {noVotes}
        Needed: {votesNeeded}
        Has Passed: {(yesVotes >= votesNeeded) ? "yes" : "no"}</div>
      }
    </div>
  )
}

export default Status