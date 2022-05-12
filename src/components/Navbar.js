import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='list-menu-navbar'>
            <Link to="/">home</Link>
            <Link to="/coin-list">Coin list</Link>
        </div>
    </nav>
  )
}
