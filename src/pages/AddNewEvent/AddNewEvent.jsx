// Import necessary libraries and components
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  message
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import eventApi from '../../apis/event.api.js'
import { getSellerProfileFromLS } from '../../utils/utils'

const { Content } = Layout
const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

export default function AddNewEvent() {
  const [form] = Form.useForm()
  const [categoryForm] = Form.useForm() // Form for the modal
  const navigate = useNavigate()
  const { eventId } = useParams()
  const isEditMode = !!eventId
  const queryClient = useQueryClient()
  const sellerProfile = getSellerProfileFromLS()
  const [statusValue, setStatusValue] = useState(1)

  // State for Add New Category Modal
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false)

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError
  } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: () => eventApi.getEventCategories()
  })

  // Fetch event data if in edit mode
  const {
    data: eventData,
    isLoading: isEventLoading,
    isError: isEventError
  } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventApi.getEventDetail(eventId),
    enabled: isEditMode
  })

  // Set form values when editing
  useEffect(() => {
    if (isEditMode && eventData) {
      const event = eventData.data
      form.setFieldsValue({
        EventName: event.eventName,
        EventDesc: event.eventDesc,
        DateRange: [moment(event.startTime), moment(event.endTime)],
        EcateId: event.ecateId || null
      })
      setStatusValue(event.status)
    }
  }, [isEditMode, eventData, form])

  // Mutation to create or update event
  const createOrUpdateEventMutation = useMutation({
    mutationFn: (data) => {
      if (isEditMode) {
        return eventApi.updateEvent(eventId, data)
      } else {
        return eventApi.createEvent(data)
      }
    },
    onSuccess: () => {
      message.success(`Event has been ${isEditMode ? 'updated' : 'created'} successfully!`)
      form.resetFields()
      queryClient.invalidateQueries(['events'])
      navigate('/seller/event-management')
    },
    onError: () => message.error(`Error ${isEditMode ? 'updating' : 'creating'} event!`)
  })

  // Mutation to add a new category with the new fields
  const addCategoryMutation = useMutation({
    mutationFn: (categoryData) => {
      return eventApi.createEventCategory(categoryData)
    },
    onSuccess: (response) => {
      message.success('Category added successfully')
      setIsAddCategoryModalVisible(false)
      categoryForm.resetFields()
      // Refetch categories
      queryClient.invalidateQueries(['eventCategories'])
      // Select the newly added category
      const newCategoryId = response.data.ecateId // Adjust based on your API response
      form.setFieldsValue({ EcateId: newCategoryId })
    },
    onError: (error) => {
      message.error('Failed to add category')
    }
  })

  const handleSubmit = (values) => {
    const { EventName, EventDesc, DateRange, EcateId } = values
    const [StartTime, EndTime] = DateRange
    const data = {
      EventName,
      EventDesc,
      StartTime: StartTime.format('YYYY-MM-DDTHH:mm:ss'),
      EndTime: EndTime.format('YYYY-MM-DDTHH:mm:ss'),
      CreateBy: sellerProfile.accountEmail,
      EcateId: EcateId || '',
      Status: statusValue
    }
    createOrUpdateEventMutation.mutate(data)
  }

  // Handle 'Publish Event' button click
  const handlePublishEvent = () => {
    setStatusValue(1) // Set status to 1 (Active)
    form.submit() // Submit the form
  }

  // Handle 'Save Draft' button click
  const handleSaveDraft = () => {
    setStatusValue(0) // Set status to 0 (Draft)
    form.submit() // Submit the form
  }

  // Handle adding new category
  const handleAddCategory = () => {
    categoryForm
      .validateFields()
      .then((values) => {
        // Send empty string if ParentCateId or Status is empty
        const categoryData = {
          EcateId: values.EcateId,
          Ename: values.Ename,
          Edesc: values.Edesc,
          ParentCateId: values.ParentCateId || '',
          Status: values.Status || ''
        }
        addCategoryMutation.mutate(categoryData)
      })
      .catch((errorInfo) => {
        // Handle form validation errors
      })
  }

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Row gutter={24}>
          {/* Left Side */}
          <Col xs={24} lg={16}>
            <Form form={form} requiredMark={false} layout='vertical' onFinish={handleSubmit}>
              {/* Event Information */}
              <Card
                title={<Title level={4}>{isEditMode ? 'Edit Event' : 'Create New Event'}</Title>}
                style={{ marginBottom: '24px' }}
              >
                {/* Event Name */}
                <Form.Item
                  hasFeedback
                  name='EventName'
                  label={<Text strong>Event Name</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    }
                  ]}
                >
                  <Input placeholder='Enter event name' maxLength={100} showCount />
                </Form.Item>

                {/* Event Description */}
                <Form.Item
                  hasFeedback
                  name='EventDesc'
                  label={<Text strong>Event Description</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    }
                  ]}
                >
                  <Input.TextArea
                    maxLength={2000}
                    rows={5}
                    placeholder='Enter event description'
                    showCount
                    style={{ padding: '10px' }}
                  />
                </Form.Item>

                {/* Event Date Range */}
                <Form.Item
                  name='DateRange'
                  label={<Text strong>Event Duration</Text>}
                  rules={[{ required: true, message: 'Please select event duration' }]}
                >
                  <RangePicker showTime />
                </Form.Item>

                {/* Event Category */}
                <Form.Item label={<Text strong>Event Category</Text>} name='EcateId'>
                  {isCategoriesLoading ? (
                    <Spin size='small' />
                  ) : (
                    <>
                      <Space>
                        <Select placeholder='Select category' allowClear style={{ minWidth: 200 }}>
                          {categoriesData?.data.map((category) => (
                            <Option key={category.ecateId} value={category.ecateId}>
                              {category.ecateName}
                            </Option>
                          ))}
                        </Select>
                        {/* Button to trigger Add New Category modal */}
                        <Button type='default' onClick={() => setIsAddCategoryModalVisible(true)}>
                          Add New Category
                        </Button>
                      </Space>
                    </>
                  )}
                </Form.Item>
              </Card>

              {/* Action Buttons */}
              <Form.Item>
                <Space>
                  {!isEditMode && (
                    <Button
                      type='default'
                      onClick={handleSaveDraft}
                      loading={createOrUpdateEventMutation.isLoading}
                      disabled={createOrUpdateEventMutation.isLoading}
                    >
                      Save Draft
                    </Button>
                  )}
                  <Button
                    type='primary'
                    onClick={handlePublishEvent}
                    loading={createOrUpdateEventMutation.isLoading}
                    disabled={createOrUpdateEventMutation.isLoading}
                  >
                    {isEditMode ? 'Update Event' : 'Publish Event'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        {/* Add New Category Modal */}
        <Modal
          title='Add New Category'
          open={isAddCategoryModalVisible}
          onOk={handleAddCategory}
          onCancel={() => setIsAddCategoryModalVisible(false)}
          confirmLoading={addCategoryMutation.isLoading}
        >
          <Form form={categoryForm} layout='vertical'>
            {/* EcateId */}
            <Form.Item
              label='Category ID'
              name='EcateId'
              rules={[{ required: true, message: 'Please enter category ID' }]}
            >
              <Input placeholder='Enter category ID' />
            </Form.Item>

            {/* Ename */}
            <Form.Item
              label='Category Name'
              name='Ename'
              rules={[{ required: true, message: 'Please enter category name' }]}
            >
              <Input placeholder='Enter category name' />
            </Form.Item>

            {/* Edesc */}
            <Form.Item
              label='Category Description'
              name='Edesc'
              rules={[{ required: true, message: 'Please enter category description' }]}
            >
              <Input.TextArea rows={3} placeholder='Enter category description' />
            </Form.Item>

            {/* ParentCateId */}
            <Form.Item label='Parent Category ID' name='ParentCateId'>
              <Input placeholder='Enter parent category ID (optional)' />
            </Form.Item>

            {/* Status */}
            <Form.Item label='Status' name='Status'>
              <Select placeholder='Select status (optional)'>
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}
