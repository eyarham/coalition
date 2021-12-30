import React, { useState } from 'react';
import Coalition from './Coalition';
import MyCoalitions from './MyCoalitions';
import NewCoalition from './NewCoalition';

const CoalitionPanel = () => {
  const [isDirty, setIsDirty] = useState(true);
  const [selectedCoalition, setSelectedCoalition] = useState();

  return (
    <div className='widget-panel'>
      <MyCoalitions isDirty={isDirty} setIsDirty={setIsDirty} setSelectedCoalition={setSelectedCoalition} />
      <NewCoalition setIsDirty={setIsDirty} />
      {selectedCoalition && <Coalition selectedCoalition={selectedCoalition} />}
    </div>
  )
}

export default CoalitionPanel
