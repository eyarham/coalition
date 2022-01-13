import React, { useState } from 'react';
import './common.css';

const ExpandBox = ({ headerText, children }) => {
  const [isOpen, setIsOpen] = useState();
  const onHeaderClick = e => {
    setIsOpen(!isOpen);
  }
  return (<div className='expand-box'>
    <div className='expand-box-header' onClick={onHeaderClick}>{headerText}</div>
    {isOpen && <div className='expand-box-children'>{children}</div>}
  </div>);
}
export default ExpandBox
