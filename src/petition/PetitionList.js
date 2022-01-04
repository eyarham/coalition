import React from 'react'
import Vote from '../vote/Vote';

const PetitionList = ({petitions, showVote}) => {
  return (
    <div>
      {petitions && (petitions.map((petition,i) => {
        const data = petition.data();        
        return (<div key={i} className='petition-block'>
          {data.petitionType === "0" && <div>Title: {data.title}</div>}
          {data.petitionType === "0" && <div>Body: {data.body}</div>}
          {data.petitionType === "1" && <div>Text: {data.charterText}</div>}
          {showVote && <Vote petitionId={petition.id} ></Vote>}
        </div>)
      }))}
    </div>
  )
}

export default PetitionList
