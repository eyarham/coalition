import React, { useState , useEffect} from 'react'
import Coalition from './Coalition'
import { useParams } from "react-router-dom";
import { getById } from './api';

const CoalitionPage = () => {
  let params = useParams();
  const [selectedCoalition, setSelectedCoalition] = useState()
 
  useEffect(() => {
    const setFromParams = async () => {
      const getCoalition = async () => await getById(params.coalitionId);
      const coalition = getCoalition();
      setSelectedCoalition(coalition);
    }
    setFromParams();
  }, [params.coalitionId])
  return (
    <Coalition selectedCoalition={selectedCoalition} />  
  )
}

export default CoalitionPage
