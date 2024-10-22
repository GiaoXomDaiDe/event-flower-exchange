import { CalendarFilled } from '@ant-design/icons'
import { Button, Col, DatePicker, Input, Modal, Row, Space, Table, Typography } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

export default function PostManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [cusNameFilter, setCusNameFilter] = useState('')
  const [selectedDates, setSelectedDates] = useState(null)

  const events = [
    {
      id: 1,
      name: 'Wedding Event',
      category: 'Wedding',
      description: 'A beautiful wedding with various flowers.',
      address: '123 Wedding Street',
      startDate: '2024-10-01',
      endDate: '2024-10-02',
      products: [
        { productID: 'P001', productName: 'Rose', price: 100, productImage: 'https://via.placeholder.com/150' },
        { productID: 'P002', productName: 'Tulip', price: 80, productImage: 'https://via.placeholder.com/150' }
      ]
    },
    {
      id: 2,
      name: 'Conference Event',
      category: 'Conference',
      description: 'Conference with fresh flowers arrangement.',
      address: '456 Conference Hall',
      startDate: '2024-11-15',
      endDate: '2024-11-16',
      products: [
        { productID: 'P003', productName: 'Lily', price: 120, productImage: 'https://via.placeholder.com/150' },
        { productID: 'P004', productName: 'Sunflower', price: 90, productImage: 'https://via.placeholder.com/150' }
      ]
    }
  ]

  const filteredData = events

  const showEventDetails = (event) => {
    setSelectedEvent(event)
    setIsModalVisible(true)
  }

  const handleSearchChange = (event) => {
    setCusNameFilter(event.target.value)
  }

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Thời gian',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => <Text>{`${record.startDate} - ${record.endDate}`}</Text>,
      filterIcon: (filtered) => <CalendarFilled style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: () => (
        <Space className='p-4'>
          <RangePicker />
        </Space>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Chi tiết',
      key: 'details',
      render: (_, record) => (
        <Button type='link' onClick={() => showEventDetails(record)}>
          Xem chi tiết
        </Button>
      )
    }
  ]

  const productColumns = [
    {
      title: 'Ảnh',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text) => <img src={text} alt='' style={{ width: '50px', height: '50px' }} />
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productID',
      key: 'productID',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Text>{`$${text}`}</Text>
    }
  ]

  return (
    <Row gutter={24}>
      {/* Danh sách sự kiện */}
      <Col span={16}>
        <div
          className='event-list'
          style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className='flex justify-end mb-4'>
            <Input.Search
              placeholder='Tìm kiếm sự kiện'
              onChange={handleSearchChange}
              value={cusNameFilter}
              style={{ width: 200 }}
            />
          </div>

          <Table columns={columns} dataSource={filteredData} pagination={{ position: ['bottomCenter'] }} rowKey='id' />
        </div>
      </Col>

      {/* Tạo sự kiện mới */}
      <Col span={8}>
        <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginBottom: '16px' }}>
          Tạo sự kiện mới
        </Button>

        {/* Modal chi tiết sự kiện và sản phẩm */}
        <Modal
          title={selectedEvent?.name}
          visible={selectedEvent !== null}
          onCancel={() => setSelectedEvent(null)}
          footer={null}
        >
          <h2>{selectedEvent?.name}</h2>
          <p>{selectedEvent?.description}</p>
          <Table columns={productColumns} dataSource={selectedEvent?.products} pagination={false} rowKey='productID' />
        </Modal>
      </Col>
    </Row>
  )
}
