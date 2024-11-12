import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import Column from 'antd/es/table/Column'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Flower() {
  const [categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm()
  //CRUD

  const fetchCategory = async () => {
    const response = await axios.get('https://66eb983c2b6cf2b89c5b007a.mockapi.io/Category')

    setCategories(response.data)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id, category) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpenModal(true)
                form.setFieldsValue(category)
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title='Delete category'
              description='Có không giữ mất đừng tìm à'
              onConfirm={() => handleDelete(id)}
            >
              <Button danger type='primary'>
                Delete
              </Button>
            </Popconfirm>
          </>
        )
      }
    }
  ]

  const handleSubmitForm = async (values) => {
    if (values.id) {
      //update
      await axios.put(
        //metod put yêu cầu có thêm id phía sau
        `https://66eb983c2b6cf2b89c5b007a.mockapi.io/Category/${values.id}`,
        values
      )
    } else {
      await axios.post('https://66eb983c2b6cf2b89c5b007a.mockapi.io/Category', values)
    }

    form.resetFields()
    setOpenModal(false)
    fetchCategory()
  }

  const handleDelete = async (id) => {
    await axios.delete(`https://66eb983c2b6cf2b89c5b007a.mockapi.io/Category/${id}`)
    fetchCategory()
  }

  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>Add new Category</Button>
      <Table columns={columns} dataSource={categories} />
      <Modal title='category' open={openModal} onCancel={() => setOpenModal(false)} onOk={() => form.submit()}>
        <Form
          labelCol={{
            span: 24
          }}
          form={form}
          onFinish={handleSubmitForm}
        >
          <Form.Item name='id'>
            <Input />
          </Form.Item>

          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Nhập vào cho tao'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: 'Nhập vào cho tao'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Flower
