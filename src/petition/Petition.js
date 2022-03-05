import React, { useEffect, useState } from 'react';
import Vote from '../vote/Vote';
import { processPetition } from './api';
import petitionTypes from './petitionTypes';
import Status from './Status';

const Petition = ({ petition, showVote }) => {
  const [selectedPetitionType, setSelectedPetitionType] = useState();

  useEffect(() => {
    const result = petitionTypes.filter(t => t.value === parseInt(petition.data().petitionType))
    if (result.length === 1) {
      setSelectedPetitionType(result[0]);
    }
  }, [petition])
  const data = petition.data();
  const onProcessClick = async e => {
    e.preventDefault();
    await processPetition(petition.id);
  }
  return (<div className='petition-block'>
    Status: {data.status}
    {(<div>
      {selectedPetitionType && selectedPetitionType.fields.map((f, i) => {
        const dataValue = data[f.value];
        return (<div key={i}>{f.text}: {dataValue}</div>)
      })}
    </div>)}
    {showVote && <Vote petitionId={petition.id} ></Vote>}
    <Status petitionId={petition.id} />
    <input type="button" value="process" onClick={onProcessClick} />
  </div>)

}

export default Petition
