import React, { useContext } from 'react';
import { joinPublic } from './api';
import { CoalitionContext } from './CoalitionContextProvider';

const Join = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const onClickJoin = async (e) => {
    e.preventDefault();
    await joinPublic(coalition);
  }
  return (
    <div>
      <input type="button" value={"Join " + coalition.data().name} onClick={onClickJoin} />
    </div>
  )
}

export default Join