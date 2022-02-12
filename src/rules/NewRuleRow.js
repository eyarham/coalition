import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/Coalition';
import { create } from './api';

const NewRuleRow = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const onRuleAddClick = async e => {
    e.preventDefault();
    await create(coalition.id, name, value);
    setName("");
    setValue("");
  }
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onValueChange = e => {
    setValue(e.target.value);
  }
  return (<tr className='new-rule-row'>
    <td><input placeholder='name' onChange={onNameChange} value={name}></input></td>
    <td><input placeholder='value' onChange={onValueChange} value={value}></input></td>
    <td className='new-rule-add'><input type="submit" onClick={onRuleAddClick} value="Add"></input></td>
  </tr>);
};

export default NewRuleRow;
