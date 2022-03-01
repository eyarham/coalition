import React, { useEffect, useState } from 'react';
import AddRow from './AddRow';
import { getDocsSub } from './api';
import RulesAdminRow from './RulesAdminRow';

const RulesAdmin = ({ isAdmin }) => {
  const [rules, setRules] = useState();

  useEffect(() => {
    return getDocsSub(snap => {
      setRules(snap.docs);
    }
    );
  }, [])
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>default value</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {rules &&
            rules.map((r, i) =>
              <RulesAdminRow key={i} rule={r} isAdmin={isAdmin} />
            )}
          {isAdmin && <AddRow />}

        </tbody>
      </table>
    </div>
  )
}

export default RulesAdmin