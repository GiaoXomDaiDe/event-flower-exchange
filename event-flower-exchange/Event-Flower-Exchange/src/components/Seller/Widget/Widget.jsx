import { SignalFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const { Title, Text } = Typography

export default function Widget({ icon, title, subtitle }) {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105'>
      <div className='flex items-center w-auto h-[100px]'>
        <div className='m-4 flex flex-row justify-center align-middle rounded-full bg-white w-12 h-12 shadow-lg'>
          <SignalFilled className='text-blue-500 text-2xl' />
        </div>

        <div className='ml-4'>
          <Text className='text-white text-lg font-medium'>{title}</Text>
          <Title level={3} style={{ margin: 0 }} className='text-white text-3xl font-extrabold leading-tight'>
            {subtitle}
          </Title>
        </div>
      </div>
    </div>
  )
}

Widget.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string
}
