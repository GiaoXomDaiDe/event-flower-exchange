import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Cascader, Col, Input, Row, Space, Table, Tag, Typography } from 'antd'
const { Title, Text } = Typography
const { Search } = Input
const options = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Cancelled',
    label: 'Cancelled'
  }
]
const orderData = [
  {
    key: '1',
    orderID: '59217',
    status: 'New order',
    item: 1,
    customerName: 'Cody Fisher'
  },
  {
    key: '2',
    orderID: '59213',
    status: 'Production',
    item: 2,
    customerName: 'Kristin Watson'
  },
  {
    key: '3',
    orderID: '59219',
    status: 'Shipped',
    item: 12,
    customerName: 'Esther Howard'
  },
  {
    key: '4',
    orderID: '59220',
    status: 'Cancelled',
    item: 22,
    customerName: 'Jenny Wilson'
  },
  {
    key: '5',
    orderID: '59223',
    status: 'Rejected',
    item: 32,
    customerName: 'John Smith'
  },
  {
    key: '6',
    orderID: '592182',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson'
  },
  {
    key: '7',
    orderID: '592182',
    status: 'Draft',
    item: 41,
    customerName: 'Cameron Williamson'
  }
]

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

export default function OrderManagement() {
  const onChange = (value) => {
    console.log(value)
  }
  return (
    <Row>
      <Col
        span={20}
        className='bg-white p-6 rounded-md'
        style={{ padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Code thanh ngang các phương thức sort Status, Date, Search by name + Header */}
        <div className='flex justify-start items-end mb-8'>
          <Title level={1} style={{ font: 'Beausite Classic Trial', fontWeight: 'bolder', margin: '0' }}>
            Orders
          </Title>
          <Cascader
            allowClear
            options={options}
            onChange={onChange}
            placeholder='Sort by Status'
            className='ml-4 rounded-2xl'
          />
          <Cascader
            allowClear
            options={options}
            onChange={onChange}
            placeholder='Sort by Date'
            className='ml-4 rounded-2xl'
          />
          <Search
            placeholder='Search by name'
            onSearch={(value) => console.log(value)}
            className='ml-4 rounded-2xl'
            style={{ width: 200 }}
          />
        </div>

        <Table columns={columns} dataSource={orderData} pagination={{ position: ['bottomCenter'] }} rowKey='key' />
      </Col>
      <Col span={4}>
        <div>Hello</div>
      </Col>
    </Row>
  )
}
