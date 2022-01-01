import React, { useState , useEffect} from 'react'
import Coalition from './Coalition'
import { useParams } from "react-router-dom";
import { getById } from './api';

const CoalitionPage = () => {
  let params = useParams();
  const [selectedCoalition, setSelectedCoalition] = useState()
 
  useEffect(() => {
    const setFromParams = async () => {
      const coalition = await getById(params.coalitionId);     
      setSelectedCoalition(coalition);
    }
    setFromParams();
  }, [params.coalitionId])
  if(!selectedCoalition) return <div>Loading...</div>;
  return (
    <Coalition selectedCoalition={selectedCoalition} />  
  )
}

export default CoalitionPage
