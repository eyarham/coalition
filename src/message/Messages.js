import React, { useContext, useEffect, useState } from 'react';
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getByCoalitionIdSub } from './api';
import Message from './Message';
import NewMessage from './NewMessage';


const Messages = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition, isMember } = coalitionContext;
  const [messages, setMessages] = useState();
  const [showNewMessage, setShowNewMessage] = useState();
  useEffect(() => {
    setShowNewMessage(isMember);
  }, [isMember])
  useEffect(() =>
    getByCoalitionIdSub(coalition.id,
      coalitionMessages => {
        const sortedMessages = coalitionMessages.sort((a, b) => b.data().createdDate - a.data().createdDate);
        setMessages(sortedMessages);
      }
    ), [coalition.id]);

  return (
    <div>
      {messages && messages.map((m, i) => {
        return (<Message key={i} message={m} />);
      })}
      {showNewMessage && <NewMessage coalitionId={coalition.id} />}
    </div>
  )
}

export default Messages