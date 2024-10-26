import React from 'react'
import './index.scss'
import { Col, Form, Input, Row } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

function Checkout() {
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <div className='checkout_back'>
          <i class='fa fa-arrow-left'></i>
          <h1>Check Out</h1>
        </div>

        <div className='basic_info'>
          <Form
            labelCol={{
              span: 24
            }}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item>
                  <Input placeholder='First Name' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item>
                  <Input placeholder='Last Name' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item>
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item name='' label='Address'>
              <Input placeholder='Your Address' />
            </Form.Item>
          </Form> 
        </div>
      </div>
      <div className='checkout__right'></div>
    </div>
  )
}

export default Checkout
