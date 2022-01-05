import React, { useEffect, useState } from 'react'
import { getByPetitionIdForUser } from '../vote/api';
import Vote from '../vote/Vote';
import { getOutcome } from './api';

const Petition = ({ petition, showVote }) => {
  const [existingVote, setExistingVote] = useState()
  const [outcome, setOutcome] = useState()
  useEffect(() => {
    const getExistingVote = async () => {
      const result = await getByPetitionIdForUser(petition.id);
      setExistingVote(result);
    }
    getExistingVote();
  }, [petition.id]);
  useEffect(() => {
    const getPetitionOutcome = async () =>{
      const response =await  getOutcome(petition.id);
      setOutcome(response)
    
    }
    getPetitionOutcome();
    
  }, [petition.id])
  const data = petition.data();
  return (<div className='petition-block'>
    Status: {data.status}
    {data.petitionType === "0" && <div>Title: {data.title}</div>}
    {data.petitionType === "0" && <div>Body: {data.body}</div>}
    {data.petitionType === "1" && <div>Text: {data.charterText}</div>}
    {showVote && <Vote petitionId={petition.id} ></Vote>}
    
    {existingVote && <div>Your vote: {existingVote.data().selection}</div>}
    {outcome && <div>Outcome: Yes: {outcome.yesVotes} No: {outcome.noVotes} Needed: {outcome.votesNeeded} Has Passed: {(outcome.yesVotes >= outcome.votesNeeded)?"yes":"no"}</div>}
  </div>)

}

export default Petition
