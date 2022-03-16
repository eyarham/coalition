import React from 'react';
import UserName from '../user/UserName';
import { deleteDocument } from './api';

const Role = ({ role }) => {
  const { name, memberId } = role.data();
  const onClickDelete = async e => {
    e.preventDefault();
    await deleteDocument(role.id);
  }
  return (
    <tr>
      <td>{name}</td>
      {memberId && <td><UserName userId={memberId} /></td>}
      {!memberId && <td>{<i>(empty)</i>}</td>}
      <input type="button" value="delete" onClick={onClickDelete}></input>
    </tr>
  )
}

export default Role