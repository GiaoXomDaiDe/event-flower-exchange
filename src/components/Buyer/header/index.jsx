import { Badge } from 'antd'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/Espoir.png'
import './index.scss'

function Header() {
  const cart = useSelector((store) => store.cart)

  return (
    <div className='header'>
      <div className='header_col'>
        <Link to='/'>Menu</Link>
        <Link to='/'>Flowers</Link>
        <Link to='/'>Our Story</Link>
      </div>
      <div className='header_logo'>
        {/* <h1>Espoir</h1> */}
        <img src={logo} alt='' />
      </div>
      <div className='header_col'>
        <i className='bi bi-search'></i>
        <i className='bi bi-chat'></i>
        <i className='bi bi-bell'></i>
        <Link to='/cart'>
          <Badge count={cart?.length}>
            <i className='bi bi-cart3'></i>
          </Badge>
        </Link>
        <Link to={'/login'}>
          <button className='header_col'>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
