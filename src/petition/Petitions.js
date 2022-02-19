import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionId } from './api';
import './petition.css';
import PetitionList from './PetitionList';

const Petitions = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [petitions, setPetitions] = useState()
  useEffect(() => {
    const getFunc = async () => {
      const petitionsReturned = await getByCoalitionId(coalition.id);
      setPetitions(petitionsReturned);
    }
    getFunc()
  }, [coalition.id])

  const openPetitions = () => {
    return petitions.filter(p => p.data().status === "new");
  }
  const passedPetitions = () => {
    return petitions.filter(p => p.data().status === "complete");
  }
  if (!petitions) return <div></div>;
  return (
    <div>
      {openPetitions() && (openPetitions().length > 0) && <h2>Open Petitions</h2>}
      {<PetitionList petitions={openPetitions()} showVote={true} />}
      {passedPetitions() && (passedPetitions().length > 0) && <h2>Passed Petitions</h2>}
      {<PetitionList petitions={passedPetitions()} showVote={false} />}
    </div>
  )
}

export default Petitions