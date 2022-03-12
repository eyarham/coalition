import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { deleteDocument, getByCoalitionIdSub } from './api';
import NewRule from './NewRule';
import NewRuleRow from './NewRuleRow';
import RuleEditCell from './RuleEditCell';
import './rules.css';

const Rules = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { isOnlyUser, coalition } = coalitionContext;

  const [rules, setRules] = useState();
  useEffect(() => {
    return getByCoalitionIdSub(coalition.id, docs => setRules(docs));
  }, [coalition.id]);
  if (!rules || rules.length === 0) {
    return (
      <div>
        <div>No rules yet...</div>
        <div>   {isOnlyUser && <NewRule coalitionId={coalition.id} />}</div>
      </div>);
  }
  const onDeleteClick = async ruleId => {
    await deleteDocument(ruleId)
  }
  return (
    <div>
      <table className='rule-table'>
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>value</th>
          </tr></thead>
        <tbody>
          {rules && rules.map((r, i) =>
            <tr key={i}>
              <td className='rule-name-col'> {r.data().name}</td>
              <td className='rule-name-col'> {r.data().type}</td>
              <RuleEditCell r={r} />
              {isOnlyUser && 
              <td><input type="button" value="delete" onClick={() => onDeleteClick(r.id)}></input></td>
              }
            </tr>)}
          {isOnlyUser && <NewRuleRow />}
        </tbody>
      </table>
    </div>
  )
}

export default Rules
