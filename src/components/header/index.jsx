import { Badge, Button, Dropdown, Input } from 'antd'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext.jsx'
import { SellerContext } from '../../contexts/seller.context.jsx'
import { clearLS } from '../../utils/utils.js'
import RegisterToSeller from '../Seller/RegisterToSeller/RegisterToSeller.jsx'
import logo from './../../assets/Espoir.png'
import './index.scss'

const { Search } = Input

function Header() {
  const navigate = useNavigate()
  const { cartItems, getCart } = useCart()
  const { isAuthenticated } = useContext(SellerContext)

  const cartLength = cartItems?.flatMap((item) => {
    return item.orderDetails
  })

  const dropdownItems = [
    {
      key: '1',
      label: <Link to='/profile'>My Profile</Link>
    },
    {
      key: '2',
      label: <Link to='/seller'>Become seller</Link>
    },
    {
      key: '3',
      label: (
        <Link
          onClick={() => {
            localStorage.removeItem('token')
          }}
          to='/login'
        >
          Logout
        </Link>
      )
    }
  ]

  useEffect(() => {
    getCart()
  }, [])

  // const token = JSON.parse(localStorage.getItem('access_token'))

  const onSearch = (value) => {
    navigate('/search', { state: { search: value } })
  }

  return (
    <div className='header'>
      <div className='header_col'>
        <Link to='/search'>Flowers</Link>
        <Link to='/'>Our Story</Link>
      </div>
      <div className='header_logo'>
        <a href='/'>
          <img src={logo} alt='Espoir Logo' />
        </a>
      </div>
      <div className='header_col'>
        {/* <HeadlessTippy
          trigger='click'
          interactive
          placement='bottom'
          appendTo={document.body}
          getReferenceClientRect={() => document.querySelector('.bi-search').getBoundingClientRect()}
          render={(attrs) => (
            <div className='box' tabIndex='-1' {...attrs}>
              <Wrapper>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: '#FD6882',
                        hoverBorderColor: '#FD6882'
                      },
                      Button: {
                        defaultActiveBorderColor: 'red',
                        defaultHoverColor: 'red',
                        defaultHoverBorderColor: '#FD6882',
                        defaultHoverBg: '#fff'
                      }
                    }
                  }}
                >
                  <Search placeholder='Search here...' allowClear size='large' onSearch={onSearch} />
                </ConfigProvider>
              </Wrapper>
            </div>
          )}
        >
          <i className='bi bi-search'></i>
        </HeadlessTippy> */}

        <button className='cart_button' disabled={!isAuthenticated} onClick={() => navigate('/cart')}>
          <Badge count={cartLength?.length}>
            <i className='bi bi-cart3'></i>
          </Badge>
        </button>

        {isAuthenticated ? (
          <>
            <RegisterToSeller />
            <Dropdown menu={{ items: dropdownItems }} placement='bottomRight' arrow>
              <Button>Welcome back!</Button>
            </Dropdown>
            <button
              onClick={() => {
                clearLS()
                window.location.reload()
              }}
              className='login_button'
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to='/login'>
            <button className='login_button'>Login</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
