import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionIdSub } from './api';
import './petition.css';
import PetitionList from './PetitionList';

const Petitions = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [petitions, setPetitions] = useState()
  useEffect(() => {
    return getByCoalitionIdSub(coalition.id, p => {
      setPetitions(p);
    });
  }, [coalition.id])
  const openPetitions = () => {
    return petitions.filter(p => p.data().status === "new");
  }
  const passedPetitions = () => {
    return petitions.filter(p => p.data().status === "passed");
  }

  const completedPetitions = () => {
    return petitions.filter(p => p.data().status === "complete");
  }

  if (!petitions) return <div></div>;
  const readyPetitions = petitions.filter(p => p.data().status === "ready");
  return (
    <div>
      {openPetitions() && (openPetitions().length > 0) && <h2>Open Petitions</h2>}
      {<PetitionList petitions={openPetitions()} showVote={true} />}
      {passedPetitions() && (passedPetitions().length > 0) && <h2>Passed Petitions</h2>}
      {<PetitionList petitions={passedPetitions()} showVote={false} />}
      {readyPetitions && (readyPetitions.length > 0) && <h2>Ready Petitions</h2>}
      {<PetitionList petitions={readyPetitions} showVote={false} />}
      {completedPetitions() && (completedPetitions().length > 0) && <h2>Completed Petitions</h2>}
      {<PetitionList petitions={completedPetitions()} showVote={false} />}
    </div>
  )
}

export default Petitions