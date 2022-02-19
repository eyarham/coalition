import React, { useContext } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getCoalitionLink } from './api';

const CoalitionLink = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  return (
    <a href={getCoalitionLink(coalition.id)}>Coalition Link</a>
  )
}

export default CoalitionLink