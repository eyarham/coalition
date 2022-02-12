import React, { useState } from 'react';
import { create } from './api';

const NewRule = ({ coalitionId }) => {
  const [ruleName, setRuleName] = useState();
  const [ruleValue, setRuleValue] = useState();
  const [message, setMessage] = useState();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    await create(coalitionId, ruleName, ruleValue);
    setMessage("complete");
  }
  const nameChange = e => {
    setRuleName(e.target.value);
  }
  const valueChange = e => {
    setRuleValue(e.target.value);
  }
  return <div>
    <form onSubmit={onFormSubmit}>
      New Rule
      <hr />
      <input placeholder='Rule Name' onChange={nameChange}></input>
      <input placeholder='Rule Value' onChange={valueChange}></input>
      <input type="submit" />
      {message}
    </form>

  </div>;
};

export default NewRule;
