import React, { useState } from 'react';
import { addSystemRule } from './api';

const AddRow = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [defaultValue, setDefaultValue] = useState();
  const [details, setDetails] = useState();
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onTypeChange = e => {
    setType(e.target.value);
  }
  const onDefaultValueChange = e => {
    setDefaultValue(e.target.value);
  }
  const onDetailsChange = e => {
    setDetails(e.target.value);
  }
  const onAddClick = async e => {
    e.preventDefault();
    const rule = {
      name,
      type,
      defaultValue,
      details
    }
    await addSystemRule(rule);
  }
  return (
    <tr>
      <td><input placeholder='name' onChange={onNameChange} /></td>
      <td><input placeholder='type' onChange={onTypeChange} /></td>
      <td><input placeholder='defaultValue' onChange={onDefaultValueChange} /></td>
      <td><input placeholder='details' onChange={onDetailsChange} /></td>
      <td><input type="button" value="Add" onClick={onAddClick} /></td>
    </tr>
  )
}

export default AddRow