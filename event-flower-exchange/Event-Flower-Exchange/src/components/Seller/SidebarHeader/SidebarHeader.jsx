import { Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'
import classNames from 'classnames'
import React, { useContext } from 'react'
import Rose from '../../../assets/images/rose.png'
import { LayoutContext } from '../../../contexts/layout.context.jsx'

export default function SidebarHeader() {
  const { collapsed } = useContext(LayoutContext)
  return (
    <Header
      className={classNames('bg-white text-center flex items-center justify-center transition-all duration-500', {
        'p-2': collapsed,
        'p-3': !collapsed
      })}
      style={{ height: '80px' }}
    >
      <div className='flex items-center justify-center'>
        {collapsed ? (
          <div className='transition-all duration-500 ease-in-out opacity-100'>
            <img src={Rose} alt='Rose Icon' className='w-10 h-10 object-contain' />
          </div>
        ) : (
          <Typography
            className='font-seventies p-2 text-7xl bg-text-gradient bg-clip-text text-transparent transition-all duration-500 ease-in-out'
            style={{ transform: collapsed ? 'scale(0)' : 'scale(1)', opacity: collapsed ? 0 : 1 }}
          >
            Espoir
          </Typography>
        )}
      </div>
    </Header>
  )
}
