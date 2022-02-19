import React from 'react'
import UserName from '../user/UserName';
import "./style.css";

const Message = ({ message }) => {
  if (!message) return <div>loading</div>
  const { text, postedBy } = message.data();
  return (
    <div className='message-box'>
      <div className='user-name'>
        <UserName userId={postedBy} />
        <hr />
      </div>
      <div className='message-text'>
        {text}
      </div>
    </div>
  )
}

export default Message