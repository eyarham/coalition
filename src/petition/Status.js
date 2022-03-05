import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByPetitionIdSub } from '../vote/api';
import { getVotesNeededSub } from './api';

const Status = ({ petitionId }) => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [votes, setVotes] = useState();
  const [votesNeeded, setVotesNeeded] = useState();

  useEffect(() => {
    return getByPetitionIdSub(petitionId, v => {
      setVotes(v);
    });
  }, [petitionId])
  useEffect(() => {
    return getVotesNeededSub(coalition.id, votesNeeded => {
      setVotesNeeded(votesNeeded)
    })
  }, [coalition.id])
  const yesVotes = votes && votes.filter(v => v.data().selection === "yes").length;
  const noVotes = votes && votes.filter(v => v.data().selection === "no").length;
  return (
    <div>
      {<div className='status-panel'>
        <span>Yes: {yesVotes}</span>
        <span>No: {noVotes}</span>
        <span>Need: {votesNeeded}</span>
      </div>
      }
    </div>
  )
}

export default Status