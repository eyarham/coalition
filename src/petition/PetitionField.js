import React from 'react'

const PetitionField = ({field,onChangeFieldValue}) => {
  return (
    <div>
       <input onChange={onChangeFieldValue} name={field.value} placeholder={field.text}></input>
    </div>
  )
}

export default PetitionField
