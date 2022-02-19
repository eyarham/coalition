import React, { useState } from 'react';
import CoalitionWithContext from './CoalitionWithContext';
import MyCoalitions from './MyCoalitions';
import NewCoalition from './NewCoalition';

const CoalitionPanel = () => {
  const [isDirty, setIsDirty] = useState(true);
  const [selectedCoalition, setSelectedCoalition] = useState();
  const [coalitionId, setCoalitionId] = useState();

  return (
    <div className='widget-panel'>
      <MyCoalitions isDirty={isDirty} setIsDirty={setIsDirty} setSelectedCoalition={setSelectedCoalition} setCoalitionId={setCoalitionId} />
      <NewCoalition setIsDirty={setIsDirty} />
      {selectedCoalition && <CoalitionWithContext selectedCoalition={selectedCoalition} coalitionId={coalitionId} />}
    </div>
  )
}

export default CoalitionPanel
