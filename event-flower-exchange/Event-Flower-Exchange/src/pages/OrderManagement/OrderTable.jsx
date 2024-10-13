import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const { Text } = Typography

const OrderTable = ({ orders }) => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderID',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        const statusColor = {
          'New order': 'blue',
          Production: 'geekblue',
          Shipped: 'green',
          Cancelled: 'red',
          Rejected: 'volcano',
          Draft: 'gray'
        }[status]
        return (
          <Tag color={statusColor} style={{ fontWeight: 'bold' }}>
            {status}
          </Tag>
        )
      }
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      render: (number) => <Text>{number}</Text>
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => console.log(`Editing ${record.orderID}`)}
          />
          <Button type='danger' shape='circle' icon={<DeleteOutlined />} onClick={() => console.log('Deleting')} />
        </Space>
      )
    }
  ]

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
