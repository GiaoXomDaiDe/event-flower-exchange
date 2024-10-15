import { PlusOutlined } from '@ant-design/icons'
import { Button, Table, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const { Text } = Typography

const OrderTable = ({ orders }) => {
  return (
    <div style={{ padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <Button type='primary' icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
        Create Order
      </Button>
      <Table columns={columns} dataSource={orders} pagination={{ position: ['bottomCenter'] }} rowKey='key' />
    </div>
  )
}

OrderTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderID: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      item: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired
    })
  ).isRequired
}

export default OrderTable
