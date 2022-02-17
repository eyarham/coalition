import React, { useEffect, useState } from 'react'
import { getPublic } from '../coalition/api';
import CoalitionEntry from './CoalitionEntry';
import './browse.css';

const Browse = () => {
  const [coalitions, setCoalitions] = useState();
  useEffect(() => {
    var effect = async () => {
      const coalitions = await getPublic();
      setCoalitions(coalitions);
    }
    effect();
  }, [])
  return (
    <div>
      <h1>Browse</h1>
      <p>
        Here, you can browse all the public coalitions.
      </p>
      <p>
        Click the Coalition Link to navigate to the selected coalition.
      </p>
      {
        coalitions && coalitions.map((c, i) => <CoalitionEntry key={i} coalition={c} />)
      }
    </div>
  )
}

export default Browse