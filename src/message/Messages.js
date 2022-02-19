import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionIdSub } from './api';
import Message from './Message';
import NewMessage from './NewMessage';


const Messages = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [messages, setMessages] = useState();
  useEffect(() =>
    getByCoalitionIdSub(coalition.id, setMessages),
    [coalition.id]);
  return (
    <div>
      {messages && messages.map((m, i) => {
        return (<Message key={i} message={m} />);
      })}
      <NewMessage coalitionId={coalition.id} />
    </div>
  )
}

export default Messages