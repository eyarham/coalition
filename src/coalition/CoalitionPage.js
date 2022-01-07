import React, { useState , useEffect} from 'react'
import Coalition from './Coalition'
import { useParams } from "react-router-dom";
import { getById } from './api';

const CoalitionPage = () => {
  let params = useParams();
  const [selectedCoalition, setSelectedCoalition] = useState()
  const [message, setMessage] = useState()
 
  useEffect(() => {
    const setFromParams = async () => {
      try{
      const coalition = await getById(params.coalitionId);     
      setSelectedCoalition(coalition);
      }
      catch(e){
        setMessage(e.message);
      }
    }
    setFromParams();
  }, [params.coalitionId])
  if(message) return <div>{message}</div>;
  if(!selectedCoalition) return <div>Loading...</div>;
  return (
    <Coalition selectedCoalition={selectedCoalition} />  
  )
}

export default CoalitionPage
