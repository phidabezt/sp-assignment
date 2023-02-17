import React from 'react'
import MenuIcon from '../../assets/icons/menu.svg'
import NotificationIcon from '../../assets/icons/notification.svg'
import classes from './NavBar.module.scss'

export const NavBar = () => { 
  return (
    <nav className={classes.navbar}>
      <img src={MenuIcon} className={classes['navbar__icon']} alt="menu icon"/>
      <div className={classes['navbar__content']}>
        <p>MyENV</p>
        <p className={classes['navbar__dropdown']}>Current Location</p>
      </div>
      <img src={NotificationIcon} className={classes['navbar__icon']} alt="notification icon"/>
    </nav>
  )
}