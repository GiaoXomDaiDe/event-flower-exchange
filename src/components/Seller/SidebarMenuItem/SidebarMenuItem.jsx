import { FormOutlined, HomeOutlined, MoneyCollectOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutContext } from '../../../contexts/layout.context.jsx'

export default function SidebarMenuItem() {
  const menuItems = [
    { key: 'seller-dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'order-management', label: 'Orders', icon: <ShoppingCartOutlined /> },
    { key: 'product-management', label: 'Product', icon: <MoneyCollectOutlined /> },
    { key: 'post-management', label: 'Posts', icon: <FormOutlined /> }
  ]

  const { collapsed } = useContext(LayoutContext)
  const location = useLocation()

  const pathParts = location.pathname.split('/')
  const currentKey = pathParts[pathParts.length - 1] || 'dashboard'

  return (
    <div className='py-5 space-y-3'>
      {menuItems.map((item) => (
        <Link
          key={item.key}
          to={`/seller/${item.key}`}
          className={classNames('relative p-3 flex items-center space-x-3 transition-all duration-500 ease-in-out', {
            'justify-center m-auto': collapsed,
            'justify-start mx-2': !collapsed,
            'hover:bg-gray-100': true,
            'bg-pink-100 font-bold': currentKey === item.key,
            'rounded-full': collapsed,
            'rounded-lg': !collapsed
          })}
          style={{
            width: collapsed ? '48px' : 'auto',
            height: '48px',
            borderRadius: collapsed ? '50%' : '8px',
            transition: 'all 0.5s ease'
          }}
        >
          {/* Icon */}
          <div
            className={classNames('text-lg transition-transform transform hover:scale-110', {
              'text-gray-600': currentKey !== item.key,
              'text-pink-600': currentKey === item.key
            })}
          >
            {item.icon}
          </div>

          {!collapsed && (
            <span
              className={classNames('text-base font-medium text-gray-700', {
                'text-gray-600': currentKey !== item.key,
                'text-pink-600': currentKey === item.key
              })}
            >
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
