import React, { useContext, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import MemberDropdown from '../members/MemberDropdown';
import { create } from './api';

const NewRoleRow = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [name, setName] = useState();
  const [memberId, setMemberId] = useState();

  const onNameChange = e => {
    setName(e.target.value);
  }
  const onClickAdd = async e => {
    e.preventDefault();
    await create(coalition.id, name, memberId || null);
  }
  const onMemberSelect = id => {
    setMemberId(id);
  }
  return (
    <tr>
      <td>
        <input placeholder='name' onChange={onNameChange}></input>
      </td>
      <td>
        <MemberDropdown onSelect={onMemberSelect} />
      </td>
      <td>
        <input type="button" placeholder='member' value="Add" onClick={onClickAdd}></input>
      </td>
    </tr>
  )
}

export default NewRoleRow