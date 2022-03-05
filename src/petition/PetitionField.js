import React from 'react';
import RuleTypeDropdown from '../rules/RuleTypeDropdown';

const PetitionField = ({ field, updateFormValue, fieldType = "text" }) => {
  const onTypeChange = e => {
    updateFormValue({ type: e.target.value });
  }
  const onInputChange = e => {
    const newJsonValue = `{"${e.target.name}": "${e.target.value}"}`
    const json = JSON.parse(newJsonValue);
    updateFormValue(json);
  }
  if (field.value === "type") {
    return (<div>
      <RuleTypeDropdown onTypeChange={onTypeChange} />
    </div>)
  }
  return (
    <div>
      <input onChange={onInputChange} name={field.value} placeholder={field.text}></input>
    </div>
  )
}

export default PetitionField
