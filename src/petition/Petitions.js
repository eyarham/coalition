import React, { useEffect, useState } from 'react'
import Vote from '../vote/Vote'
import { getByCoalitionId } from './api'
import './petition.css'

const Petitions = ({ coalitionId }) => {
  const [petitions, setPetitions] = useState()
  useEffect(() => {
    const getFunc = async () => {
      const petitionsReturned = await getByCoalitionId(coalitionId);
      setPetitions(petitionsReturned);
    }
    getFunc()
  }, [coalitionId])

  const petitionsToShow = (petitions)=>{
    return petitions.filter(p=>p.data().status === "new");
  }

  return (
    <div>
      {petitions && <h2>Petitions</h2>}
      {petitions && (petitionsToShow(petitions).map((petition,i) => {
        const data = petition.data();        
        return (<div key={i} className='petition-block'>
          {data.petitionType === "0" && <div>Title: {data.title}</div>}
          {data.petitionType === "0" && <div>Body: {data.body}</div>}
          {data.petitionType === "1" && <div>Text: {data.charterText}</div>}
          <Vote petitionId={petition.id} ></Vote>
        </div>)
      }))}
    </div>
  )
}

export default Petitions
