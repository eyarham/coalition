import React, { useState } from 'react';
import RuleTypeDropdown from '../rules/RuleTypeDropdown';

const PetitionField = ({ field, updateFormValue, fieldType = "text" }) => {
  const [booleanValue, setBooleanValue] = useState(false);
  const onTypeChange = e => {
    updateFormValue({ type: e.target.value });
  }
  const onInputChange = e => {
    updateForm(e.target.name, e.target.value);
  }
  const onInputChangeBool = e => {
    var newValue = !booleanValue;
    setBooleanValue(newValue);
    updateForm(e.target.name,newValue);
  }
  const updateForm = (name, value) => {
    const newJsonValue = `{"${name}": "${value}"}`
    const json = JSON.parse(newJsonValue);
    updateFormValue(json);
  }
  if (field.value === "type") {
    return (<div>
      <RuleTypeDropdown onTypeChange={onTypeChange} />
    </div>)
  }
  if (fieldType === "boolean" && field.value === "value")
    return (
      <div>
        <input type="checkbox" onChange={onInputChangeBool} name={field.value} placeholder={field.text}></input>
      </div>
    )
  if (fieldType === "number" && field.value === "value")
    return (
      <div>
        <input type="number" onChange={onInputChange} name={field.value} placeholder={field.text}></input>
      </div>
    )
  return (
    <div>
      <input onChange={onInputChange} name={field.value} placeholder={field.text}></input>
    </div>
  )
}

export default PetitionField
