import React from 'react';
import { deleteDocument } from './api';

const RulesAdminRow = ({ rule, isAdmin }) => {
  const { name, type, defaultValue, details } = rule.data();
  const onClickDelete = async e=>{
    e.preventDefault();
    await deleteDocument(rule.id)
  }
  return (<tr >
    <td>{name}</td>
    <td>{type}</td>
    <td>{defaultValue}</td>
    <td>{details}</td>
    {isAdmin && <td><input type="button" value="delete" onClick={onClickDelete}></input></td>}
  </tr>);
}

export default RulesAdminRow