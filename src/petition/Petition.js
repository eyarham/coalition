import React, { useEffect, useState } from 'react'
import { getByPetitionIdForUser } from '../vote/api';
import Vote from '../vote/Vote';

const Petition = ({ petition, showVote }) => {
  const [existingVote, setExistingVote] = useState()
  useEffect(() => {
    const getExistingVote = async () => {
      const result = await getByPetitionIdForUser(petition.id);
      setExistingVote(result);
    }
    getExistingVote();
  }, [petition.id])
  const data = petition.data();
  return (<div className='petition-block'>
    Status: {data.status}
    {data.petitionType === "0" && <div>Title: {data.title}</div>}
    {data.petitionType === "0" && <div>Body: {data.body}</div>}
    {data.petitionType === "1" && <div>Text: {data.charterText}</div>}
    {showVote && <Vote petitionId={petition.id} ></Vote>}
    
    {existingVote && <div>Your vote: {existingVote.data().selection}</div>}
  </div>)

}

export default Petition
