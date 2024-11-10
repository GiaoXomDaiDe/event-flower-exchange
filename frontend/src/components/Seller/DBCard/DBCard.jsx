import { Card } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

export default function DBCard({ children }) {
  return (
    <Card
      // loading
      className=' shadow-sm mb-4 bg-white rounded-3xl transition-transform duration-400 ease-in-out transform hover:scale-105 hover:shadow-md'
    >
      {children}
    </Card>
  )
}

DBCard.propTypes = {
  children: PropTypes.node
}
