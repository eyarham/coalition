import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getByIdForUser } from './api';
import CoalitionWithContext from './CoalitionWithContext';

const CoalitionPage = () => {
  let params = useParams();
  const [selectedCoalition, setSelectedCoalition] = useState();
  const [coalitionId, setCoalitionId] = useState();

  const [message, setMessage] = useState()
  useEffect(() => {
    const setFromParams = async () => {
      try {
        const coalition = await getByIdForUser(params.coalitionId);
        setSelectedCoalition(coalition);
        //validate coalitionId
        setCoalitionId(params.coalitionId);
      }
      catch (e) {
        setMessage(e.message);
      }
    }
    setFromParams();
  }, [params.coalitionId])
  if (message) return <div>{message}</div>;
  if (!selectedCoalition) return <div>Loading...</div>;
  return (
    <CoalitionWithContext selectedCoalition={selectedCoalition} coalitionId={coalitionId} />
  )
}

export default CoalitionPage
