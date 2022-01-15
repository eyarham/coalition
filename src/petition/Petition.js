import React, { useEffect, useState } from 'react';
import { getByPetitionIdForUser } from '../vote/api';
import Vote from '../vote/Vote';
import { getOutcome } from './api';
import petitionTypes from './petitionTypes';

const Petition = ({ petition, showVote }) => {
  const [existingVote, setExistingVote] = useState()
  const [outcome, setOutcome] = useState()
  const [selectedPetitionType, setSelectedPetitionType] = useState();
  useEffect(() => {
    const getExistingVote = async () => {
      const result = await getByPetitionIdForUser(petition.id);
      setExistingVote(result);
    }
    getExistingVote();
  }, [petition.id]);
  useEffect(() => {
    const getPetitionOutcome = async () => {
      const response = await getOutcome(petition.id);
      setOutcome(response)
    }
    getPetitionOutcome();

  }, [petition.id])

  useEffect(() => {
    const result = petitionTypes.filter(t => t.value === parseInt(petition.data().petitionType))
    if (result.length === 1) {
      setSelectedPetitionType(result[0]);
    }
  }, [petition])
  const data = petition.data();
  return (<div className='petition-block'>
    Status: {data.status}
    {(<div>
      {selectedPetitionType && selectedPetitionType.fields.map((f, i) => {
        const dataValue = data[f.value];
        return (<div key={i}>{f.text}: {dataValue}</div>)
      })}
    </div>)}
    {showVote && <Vote petitionId={petition.id} ></Vote>}

    {existingVote && <div>Your vote: {existingVote.data().selection}</div>}
    {outcome && <div>Outcome: Yes: {outcome.yesVotes} No: {outcome.noVotes} Needed: {outcome.votesNeeded} Has Passed: {(outcome.yesVotes >= outcome.votesNeeded) ? "yes" : "no"}</div>}
  </div>)

}

export default Petition
