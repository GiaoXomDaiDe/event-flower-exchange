import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { LayoutContext } from '../../../contexts/layout.context.jsx'

export default function CollapseButton() {
  const { collapsed, setCollapsed } = useContext(LayoutContext)
  return (
    <div className='flex items-center justify-center p-4 m-auto'>
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='transition-all duration-500 ease-in-out'
        style={{
          fontSize: '18px',
          width: collapsed ? '48px' : '100%',
          height: '48px',
          backgroundColor: '#f06595',
          color: '#fff',
          borderRadius: collapsed ? '50%' : '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          border: 'none',

          transition: 'width 0.5s ease, background-color 0.5s ease, border-radius 0.5s ease'
        }}
      >
        {!collapsed && 'Đóng'}
      </Button>
    </div>
  )
}
