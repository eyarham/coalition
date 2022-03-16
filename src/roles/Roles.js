import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionIdSub } from './api';
import NewRoleRow from './NewRoleRow';
import Role from './Role';

const Roles = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { isOnlyUser, coalition } = coalitionContext;
  const [roles, setRoles] = useState();
  useEffect(() => {
    return getByCoalitionIdSub(coalition.id, setRoles);
  }, [coalition.id])

  return (
    <div>
      <table>
        <thead><tr>
          <th>name</th>
          <th>member</th>
        </tr></thead>
        <tbody>
          {roles && roles.map((r, i) => <Role role={r} key={i} />)}
          {isOnlyUser && <NewRoleRow />}
        </tbody>
      </table>
    </div>
  )
}

export default Roles