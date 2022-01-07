import React from 'react'

const Charter = ({openCoalition}) => {
  const charterText = openCoalition.data().charterText;
  return (
    <div>      
      <div>Charter:</div>
        <textarea disabled value={charterText}></textarea>
    </div>
  )
}

export default Charter
