import React, { useContext, useEffect, useState } from 'react'
import { CoalitionContext } from '../coalition/Coalition';

const Member = ({ member }) => {
  const coalitionContext = useContext(CoalitionContext);
  const [isVisible, setIsVisible] = useState(false);
  const { displayName, pronouns } = member;
  useEffect(()=>{
    if (coalitionContext && coalitionContext.rules) {
      const visibleRuleArray = coalitionContext.rules.filter(r =>
        r.data().name === "NamesVisible");
      const visibleRule = visibleRuleArray.length === 1 && visibleRuleArray[0];
      if (visibleRule && visibleRule.data().value === "true") {
        setIsVisible(true);
      }
      else
        setIsVisible(false);
    }

  },[coalitionContext]);
  
  if (!isVisible) {
   return <div>anonymous pangolin</div>
  }
  if (isVisible) {
    return (
      <div>
        <span> {displayName || "no display name"}</span>
        <span className='member-pronouns'>({pronouns})</span>
      </div>
    )
  }
}

export default Member