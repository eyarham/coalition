import React, { useEffect, useState } from 'react';
import { get } from './api';

const MyCoalitions = ({ isDirty, setIsDirty, setSelectedCoalition }) => {
  const [coalitions, setCoalitions] = useState();
  const getCoalitionData = async () => {
    const coalitions = await get();
    setCoalitions(coalitions);
  }
  // Merge of componentDidMount and componentDidUpdate
  useEffect(() => {

    isDirty && getCoalitionData();
    isDirty && setIsDirty(false);
    console.log("This is mounted or updated.");
  }, [isDirty, setIsDirty]);

  return (
    <div>
      My coalitions
      {coalitions && coalitions.map((coalition, i) => {
        const onSelectCoalition = (e) => {
          setSelectedCoalition(coalition);
        }
        return (
          <div key={i}>
            {coalition.data().name}
            <input type="button" value="open" onClick={onSelectCoalition}></input>
          </div>)
      })}
    </div>
  )
}

export default MyCoalitions
