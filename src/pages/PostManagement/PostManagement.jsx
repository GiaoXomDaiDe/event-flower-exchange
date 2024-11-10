import { CalendarFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space, Table, Typography } from 'antd'
import { useState } from 'react'
import { eventData } from '../../mock/eventData'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

export default function PostManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [cusNameFilter, setCusNameFilter] = useState('')
  const [selectedDates, setSelectedDates] = useState(null)

  const filteredData = eventData

  const showEventDetails = (event) => {
    setSelectedEvent(event)
    setIsModalVisible(true)
  }

  const handleSearchChange = (event) => {
    setCusNameFilter(event.target.value)
  }

  const handleEventDurationChange = (dates) => {
    const datesFormat = dates?.map((date) => date.format('YYYY-MM-DD'))
    setSelectedDates(datesFormat)
  }

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Duration',
      dataIndex: ['startTime', 'endTime'],
      key: 'Duration',
      render: (_, record) => <Text>{`${record.startTime} - ${record.endTime}`}</Text>,
      filterIcon: (filtered) => <CalendarFilled style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: () => (
        <Space className='p-4'>
          <RangePicker onChange={handleEventDurationChange} format='YYYY-MM-DD' />
        </Space>
      )
    },
    {
      title: 'Event Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text>{text}</Text>
    },

    {
      title: 'Details',
      key: 'details',
      render: (_, record) => (
        <Button type='link' onClick={() => showEventDetails(record)}>
          View Details
        </Button>
      )
    }
  ]

  const productColumns = [
    {
      title: 'Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text) => <img src={text} alt='' style={{ width: '50px', height: '50px' }} />
    },
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Text>{`$${text}`}</Text>
    }
  ]

  const handleCreateEvent = (values) => {
    console.log('Event Created:', values)
    setIsModalVisible(false)
  }

  return (
    <Row gutter={24}>
      <Col span={24}>
        <div
          className='event-list'
          style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className='flex justify-between mb-4'>
            <Input.Search
              placeholder='Search event'
              onChange={handleSearchChange}
              value={cusNameFilter}
              style={{ width: 200 }}
            />
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              Create New Event
            </Button>
          </div>
          <Table columns={columns} dataSource={filteredData} pagination={{ position: ['bottomCenter'] }} rowKey='id' />
        </div>
      </Col>

      {/* Modal for Event Details and Product List */}
      <Modal
        title={selectedEvent?.title || 'Event Details'}
        visible={selectedEvent !== null}
        onCancel={() => setSelectedEvent(null)}
        footer={null}
        width={800}
      >
        <h2>{selectedEvent?.title}</h2>
        <p>{selectedEvent?.description}</p>
        <Table columns={productColumns} dataSource={selectedEvent?.products} pagination={false} rowKey='productID' />
      </Modal>

      {/* Modal for Creating New Event */}
      <Modal title='Create New Event' visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form layout='vertical' onFinish={handleCreateEvent}>
          <Form.Item
            label='Event Name'
            name='eventName'
            rules={[{ required: true, message: 'Please input event name!' }]}
          >
            <Input placeholder='Event Name' />
          </Form.Item>

          <Form.Item
            label='Duration'
            name='eventDuration'
            rules={[{ required: true, message: 'Please select event duration!' }]}
          >
            <RangePicker format='YYYY-MM-DD' />
          </Form.Item>

          <Form.Item
            label='Description'
            name='eventDescription'
            rules={[{ required: true, message: 'Please add a description!' }]}
          >
            <Input.TextArea rows={4} placeholder='Event Description' />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type='default' onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Create Event
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  )
}
