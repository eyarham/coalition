import React from 'react';
import RulesAdmin from '../admin/rules/RulesAdmin';
import './rules.css';

const RulesPage = () => {
  return (
    <div className='rules-page'>
      <h3>System Rules Help</h3>
      <p>The below rules can be used to achieve the specified function in a coalition.</p>
      <RulesAdmin />
    </div>
  )
}

export default RulesPage