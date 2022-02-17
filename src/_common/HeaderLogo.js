import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../__resources/Coalition.png';
import './common.css';

const HeaderLogo = () => {
  return (
    <div className='header-logo'>
      <Link  to="/"><img src={mainLogo} alt="fireSpot"/></Link>
    </div>
  )
}

export default HeaderLogo