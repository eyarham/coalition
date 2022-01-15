import React, { useEffect, useState } from 'react'
import { getByCoalitionId } from './api'
import './petition.css'
import PetitionList from './PetitionList'

const Petitions = ({ coalitionId }) => {
  const [petitions, setPetitions] = useState()
  useEffect(() => {
    const getFunc = async () => {
      const petitionsReturned = await getByCoalitionId(coalitionId);
      setPetitions(petitionsReturned);
    }
    getFunc()
  }, [coalitionId])

  const openPetitions = () => {
    return petitions.filter(p => p.data().status === "new");
  }
  const passedPetitions = () => {
    return petitions.filter(p => p.data().status === "complete");
  }
  if(!petitions) return <div></div>;
  return (
    <div>
      {openPetitions() && (openPetitions().length > 0) && <h2>Open Petitions</h2>}
      { <PetitionList petitions={openPetitions()} showVote={true} />}
      { passedPetitions() && (passedPetitions().length > 0) && <h2>Passed Petitions</h2>}
      { <PetitionList petitions={passedPetitions()} showVote={false} />}
    </div>
  )
}

export default Petitions