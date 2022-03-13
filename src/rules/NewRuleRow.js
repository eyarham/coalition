import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { createWithType } from './api';
import RuleTypeDropdown from './RuleTypeDropdown';

const NewRuleRow = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("text");

  const onRuleAddClick = async e => {
    e.preventDefault();
    await createWithType(coalition.id, name, type, value);
    setName("");
    setValue("");
    setType("text");
  }
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onValueChange = e => {
    setValue(e.target.value);
  }
  const onValueChangeBoolean = e => {
    setValue(!value);
  }
  const onValueChangeNumber = e => {
    const targetValue = parseInt(e.target.value);
    setValue(targetValue);
  }
  const onTypeChange = e => {
    const newType = e.target.value;
    switch (newType) {
      case "boolean":
        setValue(false);
        break;
      case "text":
        setValue("");
        break;
      case "number":
        setValue(0);
        break;
      default:
        break;
    }
    setType(e.target.value);
  }
  return (<tr className='new-rule-row'>
    <td><input placeholder='name' onChange={onNameChange} value={name}></input></td>
    <td>
      <RuleTypeDropdown onTypeChange={onTypeChange} />
    </td>
    <td>
      {type === "text" && <input placeholder='value' onChange={onValueChange}></input>}
      {type === "boolean" && <input type="checkbox" onChange={onValueChangeBoolean}></input>}
      {type === "number" && <input type="number" placeholder='value' onChange={onValueChangeNumber}></input>}
    </td>

    <td className='new-rule-add'><input type="submit" onClick={onRuleAddClick} value="Add"></input></td>
  </tr>);
};

export default NewRuleRow;
