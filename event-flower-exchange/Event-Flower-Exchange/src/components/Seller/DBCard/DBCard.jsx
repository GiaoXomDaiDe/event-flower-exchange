import { Card } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

export default function DBCard({ children }) {
  return (
    <Card
      className='shadow-lg bg-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl'
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        marginBottom: '16px'
      }}
    >
      {children}
    </Card>
  )
}

DBCard.propTypes = {
  children: PropTypes.node
}
