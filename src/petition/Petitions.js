import React, { useEffect, useState } from 'react'
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
  return (
    <div>
      {petitions && <h2>Petitions</h2>}
      {petitions &&  (petitions.map(petition => {
        const data = petition.data();
        return (<div className='petition-block'>
          <div>Title: {data.title}</div>
          <div>Body: {data.body}</div>
        </div>)
      }))}
    </div>
  )
}

export default Petitions
