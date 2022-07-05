import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/header.css'
import { logout } from '../services/service'

export const Header = () => {
  const nav = useNavigate()
  function handleLogout (event:any) {
    event.preventDefault()
    logout()
    nav('/login')
    window.alert('Logout is successfull')
  }
  let className1

  const user = JSON.parse(localStorage.getItem('roles') || '{}')

  if (!(user.length > 0 && user.includes('ROLE_ADMIN'))) {
    className1 = 'hiddenForUsers'
  }

  return (<header className="header">
  <nav className="nav container">
 <div className="nav__centered">
 <Link to="/" >
   <img src="/logo.png" className= "nav__logo" alt="logo" /></Link></div>
  <div className="nav__menu">
      <ul className="nav__list">

        <li className={`nav__item ${className1}`}>
          <a href='/add'><img src="../add.png" className= "nav__icon" alt="add" /></a>
          <Link className="nav_item" to = "/add"></Link>
        </li>
        <li onClick= {handleLogout} className="nav__item">
          <img src="../logout.png" className= 'nav__icon' alt="search" />
          <Link className="nav_item" to = "/"></Link>
        </li>
      </ul>
    </div>
  </nav>
</header>
  )
}
