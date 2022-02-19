import React, { useContext } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';

const CoalitionName = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  return (
    <h2> {coalition.data().name}</h2>
  )
}

export default CoalitionName