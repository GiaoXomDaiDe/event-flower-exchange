import { FormOutlined, HomeOutlined, MoneyCollectOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContext } from '../../../contexts/layout.context.jsx'

export default function SidebarMenuItem() {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'order-management', label: 'Orders', icon: <ShoppingCartOutlined /> },
    { key: 'shop-management', label: 'Shop', icon: <ShopOutlined /> },
    { key: 'finance', label: 'Finance', icon: <MoneyCollectOutlined /> },
    { key: 'post-management', label: 'Posts', icon: <FormOutlined /> }
  ]

  const { collapsed, selectedKey, setSelectedKey } = useContext(LayoutContext)
  return (
    <div className='py-5 space-y-3'>
      {menuItems.map((item) => (
        <Link
          key={item.key}
          to={`/seller/${item.key}`}
          onClick={() => setSelectedKey(item.key)}
          className={classNames('relative p-3 flex items-center space-x-3 transition-all duration-500 ease-in-out', {
            'justify-center m-auto': collapsed, // Icon căn giữa khi collapse
            'justify-start mx-2': !collapsed, // Icon căn trái khi không collapse
            'hover:bg-gray-100': true, // Hover background màu xám nhạt
            'bg-pink-100 font-bold': selectedKey === item.key, // Nền hồng khi selected và không collapse
            'rounded-full': collapsed, // Tròn khi collapse
            'rounded-lg': !collapsed // Hình dạng khi mở rộng
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
              'text-gray-600': !collapsed || selectedKey !== item.key,
              'text-pink-600': selectedKey === item.key
            })}
          >
            {item.icon}
          </div>

          {!collapsed && (
            <span
              className={classNames('text-base font-medium text-gray-700', {
                'text-gray-600': !collapsed || selectedKey !== item.key,
                'text-pink-600': selectedKey === item.key
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
