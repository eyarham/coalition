import React, { useEffect, useState } from 'react';
import { getByCoalitionId } from './api';

const Rules = ({ coalitionId }) => {
  const [rules, setRules] = useState();
  useEffect(() => {
    const effect = async () => {
      const result = await getByCoalitionId(coalitionId)
      setRules(result);
    }
    effect();

  }, [coalitionId])

  return (
    <div>
      {rules && rules.map((r, i) => <div key={i}>rule: </div>)}
    </div>
  )
}

export default Rules
