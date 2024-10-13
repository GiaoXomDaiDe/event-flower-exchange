import { Button, DatePicker, Form, Input, Modal, Table } from 'antd'
import { useState } from 'react'

const Post = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const dataSource = [
    {
      key: '1',
      event: 'Đám cưới Minh & Hồng',
      flowers: 'Hoa Hồng, Hoa Lan',
      date: '2024-10-10'
    },
    {
      key: '2',
      event: 'Sự kiện Công ty ABC',
      flowers: 'Hoa Cẩm Tú Cầu, Hoa Cúc',
      date: '2024-10-12'
    }
  ]

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'event',
      key: 'event'
    },
    {
      title: 'Hoa bán',
      dataIndex: 'flowers',
      key: 'flowers'
    },
    {
      title: 'Ngày diễn ra',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <>
          <Button type='link'>Sửa</Button>
          <Button type='link' danger>
            Xóa
          </Button>
        </>
      )
    }
  ]

  const showAddPostModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Sự kiện mới:', values)
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Quản Lý Bài Đăng</h2>
      <Button type='primary' onClick={showAddPostModal}>
        Thêm Sự Kiện Mới
      </Button>
      <Table className='mt-4' dataSource={dataSource} columns={columns} />

      <Modal title='Thêm Sự Kiện Mới' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout='vertical'>
          <Form.Item
            label='Tên sự kiện'
            name='event'
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Hoa bán'
            name='flowers'
            rules={[{ required: true, message: 'Vui lòng nhập danh sách hoa!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Ngày diễn ra' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Post
