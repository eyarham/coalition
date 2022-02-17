import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/Coalition';
import { updateRule } from './api';

const RuleEditCell = ({ r }) => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const { value, name } = r.data();
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [cellValue, setCellValue] = useState(value);
  const onCellClick = e => {
    setIsInEditMode(true);
  }
  const onCellValueChange = e => {
    setCellValue(e.target.value);
  }
  const onFormSubmit = async e => {
    e.preventDefault();
    await updateRule(coalition.id, name, cellValue);
    setMessage("Save Successful");
    setIsInEditMode(false);
  }
  const cancelEdit = e => {
    setCellValue(value);
    setIsInEditMode(false);
  }
  const onCellBlur = e => {
    if (value === cellValue) {
      setIsInEditMode(false);
    }
  }
  return (
    <td className='rule-value-col' onClick={onCellClick} onBlur={onCellBlur} >
      {!isInEditMode && (r.data().value)}
      {isInEditMode &&
        <form onSubmit={onFormSubmit}>
          <input value={cellValue} onChange={onCellValueChange}></input>
          <input type="submit" value="update"></input>
          <input type="button" onClick={cancelEdit} value="cancel" ></input>
        </form>
      }
      <span className='rule-edit-message'>{message}</span>
    </td>
  )
}

export default RuleEditCell