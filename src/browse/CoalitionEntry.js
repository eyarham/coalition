import React from 'react'
import { getCoalitionLink } from '../coalition/api';

const CoalitionEntry = ({ coalition }) => {
  const { name } = coalition.data();
  return (
    <div className='coalition-row'>
      <span>{name}</span>
      <span><a href={getCoalitionLink(coalition.id)}>Coalition Link</a></span>
    </div>
  )
}

export default CoalitionEntry