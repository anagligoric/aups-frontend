import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/header.css'
import { logout } from '../services/AuthService'
import { ConfirmationDialogComponent } from '../dialogs/ConfirmationDialog'

export const Header = () => {
  const nav = useNavigate()
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)

  function handleLogout (event:any) {
    event.preventDefault()
    setOpenConfirmationDialog(true)
  }

  function onConfirm () {
    logout()
    nav('/login')
  }

  return (<header className="header">
  <nav className="nav container">
 <div className="nav__centered">
 <Link to="/" >
   <img src="/settings.png" className= "nav__logo" alt="logo" /></Link></div>
  <div className="nav__menu">
      <ul className="nav__list">
        <li onClick= {handleLogout} className="nav__item">
          <img src="../logout.png" className= 'nav__icon' alt="search" />
          <Link className="nav_item" to = "/"></Link>
        </li>
      </ul>
    </div>
  </nav>
  <ConfirmationDialogComponent isDialogOpen={openConfirmationDialog} onConfirm={onConfirm} onCancel={() => setOpenConfirmationDialog(false)}text={'Are you sure you want to logout?'} />
</header>

  )
}
