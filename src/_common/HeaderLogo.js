import React from 'react'
import mainLogo from '../__resources/Coalition.png'
import { getOriginUrl } from './api';
import './common.css';

const HeaderLogo = () => {
  return (
    <div className='header-logo'>
    <a href={getOriginUrl()}>
      <img src={mainLogo} alt="fireSpot"/></a>
    </div>
  )
}

export default HeaderLogo