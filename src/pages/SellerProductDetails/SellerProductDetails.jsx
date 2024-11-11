import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
  Space,
  Spin, // Import Spinner từ Ant Design
  TreeSelect,
  Typography,
  Upload
} from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../../mock/productData'

const { Content } = Layout
const { Title } = Typography
const { Option } = Select
const { Dragger } = Upload

const fetchProductDetails = async (productId) => {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Mô phỏng API delay
  return productData.find((product) => product.CateId === productId) // Tìm sản phẩm theo productId
}

export default function SellerProductDetails() {
  const [form] = Form.useForm()
  const { productId } = useParams() // Lấy productId từ URL

  const { data: productDetails, isLoading } = useQuery(['product-details', productId], () =>
    fetchProductDetails(productId)
  )

  useEffect(() => {
    if (productDetails) {
      form.setFieldsValue({
        FlowerName: productDetails.FlowerName,
        Description: productDetails.Description,
        Size: productDetails.Size,
        Condition: productDetails.Condition,
        Price: productDetails.Price,
        OldPrice: productDetails.OldPrice,
        Quantity: productDetails.Quantity,
        CateId: productDetails.CateId,
        TagId: productDetails.TagId,
        productUrl: productDetails.productUrl
      })
    }
  }, [productDetails, form])

  const onCategoryChange = (value) => {
    form.setFieldsValue({ cateId: value })
  }

  const handleFinish = (values) => {
    console.log('Updated values: ', values)
    // Call update API hoặc xử lý cập nhật dữ liệu
  }

  return (
    <Layout>
      <Content>
        <Row gutter={24}>
          <Col span={16}>
            {isLoading ? (
              <Spin size='large' /> // Hiển thị spinner khi đang tải dữ liệu
            ) : (
              <Form form={form} layout='vertical' onFinish={handleFinish}>
                <Card title='General Information' style={{ marginBottom: '24px' }}>
                  <Form.Item
                    label='Flower Name'
                    name='FlowerName'
                    rules={[{ required: true, message: 'Please input the flower name!' }]}
                  >
                    <Input placeholder='Brand Name + Product Type + Key Features' maxLength={70} showCount />
                  </Form.Item>

                  <Form.Item
                    label='Description'
                    name='Description'
                    rules={[{ required: true, message: 'Please input the description!' }]}
                  >
                    <Input.TextArea
                      maxLength={3000}
                      rows={5}
                      placeholder='Add a short description about your product'
                    />
                  </Form.Item>

                  <Form.Item label='Size' name='Size' rules={[{ required: true, message: 'Please select a size!' }]}>
                    <Select placeholder='Select size'>
                      <Option value='small'>Small</Option>
                      <Option value='medium'>Medium</Option>
                      <Option value='large'>Large</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label='Condition'
                    name='Condition'
                    rules={[{ required: true, message: 'Please select a condition!' }]}
                  >
                    <Select placeholder='Select condition'>
                      <Option value='fresh'>Fresh Flower</Option>
                      <Option value='fake'>Fake Flower</Option>
                      <Option value='clearance'>Clearance Flower</Option>
                    </Select>
                  </Form.Item>
                </Card>

                <Card title='Pricing and Stock' style={{ marginBottom: '24px' }}>
                  <Form.Item
                    label='Base Price'
                    name='Price'
                    rules={[{ required: true, message: 'Please enter the price!' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label='Old Price'
                    name='OldPrice'
                    rules={[{ required: true, message: 'Please enter the old price!' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label='Stock'
                    name='Quantity'
                    rules={[{ required: true, message: 'Please enter the stock!' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Card>

                <Card title='Category' style={{ marginBottom: '24px' }}>
                  <Form.Item
                    label='Category'
                    name='CateId'
                    rules={[{ required: true, message: 'Please select a category!' }]}
                  >
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder='Select category'
                      allowClear
                      treeDefaultExpandAll
                      onChange={onCategoryChange}
                      treeData={[] /* Add tree data here */}
                    />
                  </Form.Item>

                  <Form.Item
                    label='Tag'
                    name='TagId'
                    rules={[{ required: true, message: 'Please select at least one tag!' }]}
                  >
                    <Select placeholder='Select tag' mode='multiple'>
                      <Option value='tag1'>Popular</Option>
                      <Option value='tag2'>Sale</Option>
                      <Option value='tag3'>New Arrival</Option>
                      <Option value='tag4'>Limited Edition</Option>
                    </Select>
                  </Form.Item>
                </Card>

                <Form.Item>
                  <Space>
                    <Button type='default'>Cancel</Button>
                    <Button type='primary' htmlType='submit'>
                      Update Product
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
