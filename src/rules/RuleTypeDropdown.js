import React from 'react';

const RuleTypeDropdown = ({ onTypeChange }) => {
  return (
    <select onChange={onTypeChange}>
      <option>text</option>
      <option>boolean</option>
      <option>number</option>
    </select>
  )
}

export default RuleTypeDropdown