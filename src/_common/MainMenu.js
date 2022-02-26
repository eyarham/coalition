import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getIsAdminUser } from '../admin/api'

const MainMenu = () => {
  const [isAdmin, setIsAdmin] = useState()
  useEffect(() => {
    const effect = async () => {
      const isAdminResponse = await getIsAdminUser();
      setIsAdmin(isAdminResponse);
    }
    effect();


  }, [])
  return (
    <div className='nav-bar'>
      <span ><NavLink to="/">home</NavLink></span>
      <span className="browse-link"><NavLink to="/browse">browse</NavLink></span>
      {isAdmin &&
        <span><NavLink to="/Admin" className={isActive => isActive ? "active" : "inactive"}>Admin</NavLink></span>
      }
      <span className="code-link"><a href="https://github.com/eyarham/coalition" target="_blank" rel="noopener noreferrer">code</a></span>
    </div>
  )
}

export default MainMenu