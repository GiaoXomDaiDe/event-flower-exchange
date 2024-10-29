import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Row,
  Select,
  Space,
  Timeline,
  TreeSelect,
  Typography,
  Upload
} from 'antd'
import React, { useEffect, useState } from 'react'
import { categories } from '../../mock/categoryData'

const { Content } = Layout
const { Title } = Typography
const { Option } = Select
const { Dragger } = Upload

const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return categories
}

export default function AddNewProduct() {
  const [form] = Form.useForm()
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  const [categoryValue, setCategoryValue] = useState(null)

  const { data: categoriesData, isLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories })

  const convertToTreeData = (categories) => {
    const treeData = []
    const categoryMap = {}

    categories.forEach((category) => {
      categoryMap[category.FcateName] = {
        title: category.FcateName,
        value: category.FcateName,
        children: []
      }
    })

    categories.forEach((category) => {
      if (category.FparentCateId) {
        categoryMap[category.FparentCateId].children.push(categoryMap[category.FcateName])
      } else {
        treeData.push(categoryMap[category.FcateName])
      }
    })

    return treeData
  }

  const treeData = categoriesData ? convertToTreeData(categoriesData) : []

  const onCategoryChange = (value) => {
    setCategoryValue(value)
  }

  const [fileList, setFileList] = useState([])

  const steps = [
    {
      title: 'Fill in product information',
      fields: ['flowerName', 'description', 'size', 'condition']
    },
    {
      title: 'Set pricing and stock',
      fields: ['basePrice', 'newPrice', 'stock']
    },
    {
      title: 'Upload images and video',
      fields: ['images', 'video']
    },
    {
      title: 'Select category and tags',
      fields: ['cateId', 'tagId']
    },
    {
      title: 'Review and submit',
      fields: []
    }
  ]

  const [stepStatuses, setStepStatuses] = useState(steps.map(() => 'wait'))

  const handleChange = ({ fileList }) => {
    setFileList(fileList)
  }

  const updateStepStatuses = () => {
    const newStatuses = steps.map((step) => {
      const { fields } = step
      if (fields.length === 0) {
        // No fields to validate in this step
        return 'process'
      }

      const errors = form.getFieldsError(fields)
      const hasError = errors.some((fieldError) => fieldError.errors.length > 0)
      const values = form.getFieldsValue(fields)
      const allFieldsFilled = fields.every((field) => values[field] !== undefined && values[field] !== '')

      if (allFieldsFilled && !hasError) {
        return 'finish'
      } else if (hasError) {
        return 'error'
      } else {
        return 'process'
      }
    })
    setStepStatuses(newStatuses)
  }

  useEffect(() => {
    updateStepStatuses()
  }, [])

  return (
    <Layout>
      <Content>
        <Row gutter={24}>
          {/* Left Side */}
          <Col span={16}>
            <Form
              form={form}
              layout='vertical'
              onFinish={(values) => console.log(values)}
              onFieldsChange={updateStepStatuses}
            >
              {/* General Information */}
              <Card title='General Information' style={{ marginBottom: '24px' }}>
                {/* Flower Name */}
                <Form.Item
                  hasFeedback
                  tooltip={{
                    title: 'Brand Name + Product Type + Key Features (Material, Color, Size, Model).',
                    icon: <InfoCircleOutlined />
                  }}
                  validateDebounce={500}
                  autoComplete='off'
                  required
                  label={
                    <Title style={{ marginBottom: '0px' }} level={5}>
                      Flower Name
                    </Title>
                  }
                  name='flowerName'
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && value.trim().length < 10 && value.trim().length > 0) {
                          return Promise.reject('Your product title is too short. Please input at least 10 characters.')
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input placeholder='Brand Name + Product Type + Key Features' maxLength={70} showCount />
                </Form.Item>

                {/* Description */}
                <Form.Item
                  hasFeedback
                  validateDebounce={500}
                  autoComplete='off'
                  required
                  label={
                    <Title style={{ marginBottom: '0px' }} level={5}>
                      Description
                    </Title>
                  }
                  name='description'
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && value.trim().length < 100 && value.trim().length > 0) {
                          return Promise.reject(
                            'Your product title is too short. Please input at least 100 characters.'
                          )
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input.TextArea
                    maxLength={3000}
                    rows={5}
                    placeholder='Add a short description about your product'
                    showCount
                    style={{ padding: '10px' }}
                  />
                </Form.Item>

                {/* Size */}
                <Form.Item
                  required
                  label='Size'
                  name='size'
                  rules={[{ required: true, message: 'Please select a size' }]}
                >
                  <Select placeholder='Select size'>
                    <Option value='small'>Small</Option>
                    <Option value='medium'>Medium</Option>
                    <Option value='large'>Large</Option>
                  </Select>
                </Form.Item>

                {/* Condition */}
                <Form.Item required label='Condition' name='condition'>
                  <Select placeholder='Select condition'>
                    <Option value='fresh'>Fresh Flower</Option>
                    <Option value='fake'>Fake Flower</Option>
                    <Option value='clearance'>Clearance Flower</Option>
                  </Select>
                </Form.Item>
              </Card>

              {/* Pricing and Stock */}
              <Card title='Pricing and Stock' style={{ marginBottom: '24px' }}>
                <Row gutter={24}>
                  <Col span={8}>
                    {/* Base Price */}
                    <Form.Item
                      label='Base Price'
                      name='basePrice'
                      required
                      rules={[
                        { required: true, message: 'Please enter the price' },
                        { type: 'number', message: 'Please enter a valid price' }
                      ]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    {/* New Price */}
                    <Form.Item
                      label='New Price'
                      name='newPrice'
                      required
                      rules={[
                        { required: true, message: 'Please enter the price' },
                        { type: 'number', message: 'Please enter a valid price' }
                      ]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    {/* Stock */}
                    <Form.Item
                      label='Stock'
                      name='stock'
                      required
                      rules={[{ required: true, message: 'Please enter the stock' }]}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {/* Upload Image and Video */}
              <Card title='Upload Images and Video' style={{ marginBottom: '24px' }}>
                {/* Images */}
                <Form.Item
                  label='Images'
                  name='images'
                  rules={[
                    {
                      required: true,
                      message: 'Please upload at least 1 image'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || value.fileList.length === 0) {
                          return Promise.reject(new Error('You need to upload at least 1 image'))
                        }
                        if (value.fileList.length > 5) {
                          return Promise.reject(new Error('You can only upload up to 5 images'))
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Upload
                    listType='picture-card'
                    beforeUpload={() => false}
                    multiple
                    maxCount={5}
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                {/* Video */}
                <Form.Item
                  label='Video'
                  name='video'
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && value.file) {
                          const isMP4 = value.file.type === 'video/mp4'
                          const isSizeValid = value.file.size / 1024 / 1024 < 30 // Size <= 30MB
                          const isResolutionValid = new Promise((resolve, reject) => {
                            const video = document.createElement('video')
                            video.src = URL.createObjectURL(value.file)
                            video.onloadedmetadata = () => {
                              const { videoWidth, videoHeight, duration } = video
                              if (videoWidth > 1280 || videoHeight > 1280) {
                                reject('Resolution should not exceed 1280x1280px')
                              } else if (duration < 10 || duration > 60) {
                                reject('Video duration must be between 10 and 60 seconds')
                              } else {
                                resolve()
                              }
                            }
                          })

                          if (!isMP4) {
                            return Promise.reject(new Error('Video format must be MP4'))
                          }
                          if (!isSizeValid) {
                            return Promise.reject(new Error('Video size must be less than 30MB'))
                          }
                          return isResolutionValid
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Dragger beforeUpload={() => false} maxCount={1}>
                    <p className='ant-upload-drag-icon'>
                      <UploadOutlined />
                    </p>
                    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                    <p className='ant-upload-hint'>
                      You can publish this listing while the video is being processed. Video will be shown in listing
                      once successfully processed.
                    </p>
                  </Dragger>
                </Form.Item>
              </Card>

              <Card title='Category' style={{ marginBottom: '24px' }}>
                {/* Category ID */}
                <Form.Item
                  label='Category'
                  name='cateId'
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <TreeSelect
                      value={categoryValue}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder='Select category'
                      allowClear
                      treeDefaultExpandAll
                      onChange={onCategoryChange}
                      treeData={treeData}
                    />
                  )}
                </Form.Item>

                {/* Tag ID */}
                <Form.Item
                  label='Tag'
                  name='tagId'
                  rules={[{ required: true, message: 'Please select at least one tag' }]}
                >
                  <Select placeholder='Select tag' mode='multiple'>
                    {/* Dữ liệu tag */}
                    <Option value='tag1'>Popular</Option>
                    <Option value='tag2'>Sale</Option>
                    <Option value='tag3'>New Arrival</Option>
                    <Option value='tag4'>Limited Edition</Option>
                  </Select>
                </Form.Item>
              </Card>

              {/* Save Draft and Add Product Buttons */}
              <Form.Item>
                <Space>
                  <Button type='default'>Save Draft</Button>
                  <Button type='primary' htmlType='submit'>
                    Add Product
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>

          {/* Right Side */}
          <Col span={8}>
            {/* Timeline */}
            <Card title='Steps'>
              <Timeline>
                {steps.map((step, index) => (
                  <Timeline.Item
                    key={index}
                    color={
                      stepStatuses[index] === 'finish' ? 'green' : stepStatuses[index] === 'error' ? 'red' : 'blue'
                    }
                    dot={
                      stepStatuses[index] === 'finish' ? (
                        <CheckCircleOutlined />
                      ) : stepStatuses[index] === 'error' ? (
                        <CloseCircleOutlined />
                      ) : (
                        <ClockCircleOutlined />
                      )
                    }
                  >
                    {step.title}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>

        {/* Category Selection Modal */}
        <Modal
          title='Select Category'
          open={isCategoryModalVisible}
          onOk={() => setIsCategoryModalVisible(false)}
          onCancel={() => setIsCategoryModalVisible(false)}
        >
          {/* Vertical Menu */}
          <Menu mode='vertical'>
            <Menu.Item key='1'>Category 1</Menu.Item>
            <Menu.Item key='2'>Category 2</Menu.Item>
            <Menu.Item key='3'>Category 3</Menu.Item>
            {/* Add more categories */}
          </Menu>
        </Modal>
      </Content>
    </Layout>
  )
}
