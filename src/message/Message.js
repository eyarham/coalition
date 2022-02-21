import React, { useEffect, useState } from 'react';
import UserName from '../user/UserName';
import { postedByCurrentUser } from './api';
import "./style.css";

const Message = ({ message }) => {
  const [isPostedByCurrent, setIsPostedByCurrent] = useState(false);
  const [createdDateString, setCreatedDateString] = useState(false);
  useEffect(() => {
    const effect = async () => {
      if (!message) return;
      const { postedBy } = message.data();
      const postedByCurrent = await postedByCurrentUser(postedBy);
      setIsPostedByCurrent(postedByCurrent);
    }
    effect();

  }, [message])
  useEffect(() => {
    const { createdDate } = message.data();
    const dateString = createdDate.toDate().toLocaleDateString();
    const timeString = createdDate.toDate().toLocaleTimeString();
    setCreatedDateString(`${dateString} ${timeString}`);
  }, [message])
  if (!message) return <div>loading</div>
  const { text, postedBy } = message.data();

  const onReplyButtonClick = e => {

  }
  const onDeleteClick = e => {

  }
  return (
    <div className='message-box'>
      <div className='user-name'>
        <span> <UserName userId={postedBy} /></span>
        <span>
          {isPostedByCurrent && <input type="button" value="X" className='delete-icon' onClick={onDeleteClick}></input>}
        </span>
        <hr />
      </div>
      <div className='message-text'>
        {text}
      </div>
      <div className='message-footer'>
        <span className='message-date'>{createdDateString}</span>
        <span><input type="button" value="reply" onClick={onReplyButtonClick} className='reply-button'></input></span>

      </div>
    </div>
  )
}

export default Message