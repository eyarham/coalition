import React, { useState, useEffect } from 'react'
import { getByPetitionIdForUser } from '../vote/api';

const Signature = ({petitionId}) => {
  const [hasSigned, setHasSigned] = useState();
  useEffect(() => {
    const effect = async () => {
      const existingVote = await getByPetitionIdForUser(petitionId);
      if (existingVote) {
        setSelectedVote(existingVote.data());
      }
    }
    effect();
  }, [petitionId])
  const onSign = e=>{

  }
  return (
    <div>
         <input type="button" value="Sign" onClick={onSign} ></input>
    </div>
  )
}

export default Signature
