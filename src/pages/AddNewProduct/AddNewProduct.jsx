// Import necessary libraries and components
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Timeline,
  TreeSelect,
  Typography,
  Upload,
  message
} from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import categoryApi from '../../apis/category.api'
import productApi from '../../apis/product.api'
import sellerApi from '../../apis/seller.api'

const { Content } = Layout
const { Title, Text } = Typography
const { Option } = Select

export default function AddNewProduct() {
  const [form] = Form.useForm()
  console.log(form)
  const [formCategory] = Form.useForm()
  const navigate = useNavigate()
  //Chuyển sang edit
  const { productId } = useParams()
  const isEditMode = !!productId
  const queryClient = useQueryClient()

  // Define the steps for the timeline
  const steps = [
    {
      title: 'Enter product information',
      fields: ['FlowerName', 'Description', 'Size', 'Condition', 'DateExpiration']
    },
    {
      title: 'Set pricing and stock',
      fields: ['OldPrice', 'Price', 'Quantity']
    },
    {
      title: 'Upload images',
      fields: ['AttachmentFiles']
    },
    {
      title: 'Select category and tags',
      fields: ['CateId', 'TagIds']
    },
    {
      title: 'Review and submit',
      fields: []
    }
  ]
  // State for step statuses in the timeline
  const [stepStatuses, setStepStatuses] = useState(steps.map(() => 'wait'))

  // Update step statuses based on form validation
  const updateStepStatuses = () => {
    const newStatuses = steps.map((step) => {
      const { fields } = step
      if (fields.length === 0) {
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

  // Manage the visibility of the category modal
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Fetch categories using react-query
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => sellerApi.getSellerFlowerCategories()
  })

  // Transform category data into tree format for TreeSelect
  const transformCategoriesToTreeData = (categories) => {
    return categories.map((category) => {
      const children = category.children ? transformCategoriesToTreeData(category.children) : []

      // Create React Node for title
      const title = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{category.fcateName}</span>
          <Space size='small'>
            <Button
              type='link'
              size='small'
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation() // Prevent node selection when clicking the button
                showCategoryModal(category)
              }}
            />
            <Button
              type='link'
              size='small'
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation() // Prevent node selection when clicking the button
                handleDeleteCategory(category.fcateId)
              }}
            />
          </Space>
        </div>
      )

      return {
        title,
        value: category.fcateId,
        key: category.fcateId,
        children
      }
    })
  }

  const categoriesTreeData = categoriesData ? transformCategoriesToTreeData(categoriesData.data) : []
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getFlowerDetail(productId),
    enabled: isEditMode
  })
  useEffect(() => {
    if (isEditMode && productData) {
      const product = productData.data
      console.log(product)
      form.setFieldsValue({
        FlowerName: product.flowerName,
        Description: product.description,
        Size: product.size,
        Condition: product.condition,
        OldPrice: product.price,
        Quantity: product.quantity,
        CateId: product.cateId,
        TagIds: product.tagIds ? product.tagIds.split(',') : [],
        DateExpiration: product.dateExpiration
      })
      // Process images
      const AttachmentFiles = product.attachment ? product.attachment.split(',') : []
      const imageFiles = AttachmentFiles.map((url, index) => ({
        uid: index.toString(),
        name: `image-${index}.jpg`,
        status: 'done',
        url: url,
        thumbUrl: url,
        originFileObj: null // Important for existing files
      }))
      setFileList(imageFiles)
    }
  }, [isEditMode, productData, form])

  const createCategoryMutation = useMutation({
    mutationFn: ({ FcateName, FcateDesc, FparentCateId }) => {
      return categoryApi.createFlowerCategory({ FcateName, FcateDesc, FparentCateId })
    },
    onSuccess: () => {
      toast.success('New category created successfully!')
      refetchCategories()
      setIsCategoryModalVisible(false)
      formCategory.resetFields()
    },
    onError: () => {
      toast.error('Error adding category!')
    }
  })
  const updateCategoryMutation = useMutation({
    mutationFn: ({ fcateId, fcateDesc, fcateName }) => {
      console.log({ fcateId, fcateDesc, fcateName })
      return categoryApi.updateFlowerCategory({
        FcateId: fcateId,
        FcateName: fcateName,
        FcateDesc: fcateDesc
      })
    },
    onSuccess: () => {
      toast.success('Category updated successfully!')
      refetchCategories()
      setEditingCategory(null)
      setIsCategoryModalVisible(false)
      formCategory.resetFields()
    },
    onError: () => {
      toast.error('Error updating category!')
    }
  })
  const deleteCategoryMutation = useMutation({
    mutationFn: (fcateId) => {
      return categoryApi.deleteFlowerCategory(fcateId)
    },
    onSuccess: () => {
      toast.success('Category deleted successfully!')
      refetchCategories()
    },
    onError: () => {
      toast.error('Error deleting category!')
    }
  })

  // CRUD functions for categories
  const handleAddCategory = (values) => {
    const categoryData = {
      FcateName: values.fcateName,
      FcateDesc: values.fcateDesc,
      FparentCateId: values.fparentCateId || null // Set to null if no parent category is selected
    }

    if (editingCategory) {
      updateCategoryMutation.mutate({
        fcateId: editingCategory.fcateId,
        fcateName: categoryData.FcateName,
        fcateDesc: categoryData.FcateDesc
      })
    } else {
      // Add new category
      createCategoryMutation.mutate(categoryData)
    }
  }

  const handleDeleteCategory = (fcateId) => {
    deleteCategoryMutation.mutate(fcateId)
  }

  // Show the category modal for adding or editing
  const showCategoryModal = (category = null) => {
    setEditingCategory(category)
    setIsCategoryModalVisible(true)
    if (category) {
      // Set initial values in the form when editing
      formCategory.setFieldsValue({
        fcateName: category.fcateName,
        fcateDesc: category.fcateDesc,
        fparentCateId: category.fparentCateId || null
      })
    } else {
      // Reset form when adding new category
      formCategory.resetFields()
    }
  }

  // Create items for the timeline
  const timelineItems = steps.map((step, index) => {
    const status = stepStatuses[index]
    let color = 'blue'
    let dot = <ClockCircleOutlined />

    if (status === 'finish') {
      color = 'green'
      dot = <CheckCircleOutlined />
    } else if (status === 'error') {
      color = 'red'
      dot = <CloseCircleOutlined />
    }

    return {
      color,
      dot,
      children: step.title
    }
  })

  // Manage the list of uploaded image files

  // State to track the status value
  const [statusValue, setStatusValue] = useState(1) // Default to 1 (Add Product)
  // Handle 'Add Product' button click
  const handleAddProduct = () => {
    setStatusValue(1) // Set status to 1
    form.submit() // Submit the form
  }

  // Handle 'Save Draft' button click
  const handleSaveDraft = () => {
    setStatusValue(0) // Set status to 0
    form.submit() // Submit the form
  }
  // Handle changes in the image upload
  const [fileList, setFileList] = useState([])
  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList]

    // Limit the number of uploaded files
    newFileList = newFileList.slice(0, 5)

    setFileList(newFileList)
    console.log(fileList)

    // Manually update the form field
    form.setFieldsValue({ AttachmentFiles: newFileList })
  }

  const createOrUpdateFlowerMutation = useMutation({
    mutationFn: () => {
      const formValues = form.getFieldsValue()
      const formData = new FormData()
      formData.append('FlowerName', formValues.FlowerName) //
      formData.append('Description', formValues.Description) //
      formData.append('Size', formValues.Size) //
      formData.append('Condition', formValues.Condition) //
      !isEditMode && formData.append('Price', formValues.Price)
      formData.append('OldPrice', formValues.OldPrice)
      formData.append('Quantity', formValues.Quantity)
      formData.append('CateId', formValues.CateId)
      console.log(formValues.CateId)
      formData.append('Status', statusValue)
      formData.append('DateExpiration', formValues.DateExpiration)
      formData.append('TagIds', formValues.TagIds.join(','))
      fileList.forEach((file) => {
        if (file.originFileObj) {
          // Nếu là file mới được upload
          formData.append('AttachmentFiles', file.originFileObj)
        }
      })
      if (isEditMode) {
        console.log(isEditMode)
        console.log(formValues)
        // Cập nhật sản phẩm
        formData.append('FlowerId', productId) //
        return productApi.updateFlower(formData)
      } else {
        // Tạo sản phẩm mới
        return productApi.createFlower(formData)
      }
    },
    onSuccess: () => {
      message.success(`Sản phẩm đã được ${isEditMode ? 'cập nhật' : 'thêm mới'} thành công!`)
      form.resetFields()
      setFileList([])
      setStepStatuses(steps.map(() => 'wait'))
      queryClient.invalidateQueries('sellerProducts')
      navigate('/seller/product-management')
    },
    onError: () => message.error(`Lỗi khi ${isEditMode ? 'cập nhật' : 'thêm mới'} sản phẩm!`)
  })
  const handleUpdate = () => {
    form.submit()
  }

  // Handle form submission
  const onFinish = () => {
    createOrUpdateFlowerMutation.mutate()
  }

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Row gutter={24}>
          {/* Left Side */}
          <Col xs={24} lg={16}>
            <Form
              form={form}
              requiredMark={false}
              layout='vertical'
              onFinish={onFinish}
              onFieldsChange={updateStepStatuses}
            >
              {/* General Information */}
              <Card
                title={<Title level={4}>{isEditMode ? 'Edit Product' : 'General Information'}</Title>}
                style={{ marginBottom: '24px' }}
              >
                {/* Product Name */}
                <Form.Item
                  hasFeedback
                  tooltip={{
                    title: 'Brand Name + Product Type + Key Features (Material, Color, Size, Model).',
                    icon: <InfoCircleOutlined />
                  }}
                  name='FlowerName'
                  label={<Text strong>Product Name</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    },
                    () => ({
                      validator(_, value) {
                        if (value && value.trim().length < 10 && value.trim().length > 0) {
                          return Promise.reject('Product name is too short. Please enter at least 10 characters.')
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
                  name='Description'
                  label={<Text strong>Description</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'This field cannot be empty'
                    },
                    () => ({
                      validator(_, value) {
                        if (value && value.trim().length < 100 && value.trim().length > 0) {
                          return Promise.reject('Description is too short. Please enter at least 100 characters.')
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

                <Row gutter={16}>
                  {/* Size */}
                  <Col xs={24} md={8}>
                    <Form.Item
                      name='Size'
                      label={<Text strong>Size</Text>}
                      rules={[{ required: true, message: 'Please select a size' }]}
                    >
                      <Select placeholder='Select size'>
                        <Option value='small'>Small</Option>
                        <Option value='medium'>Medium</Option>
                        <Option value='large'>Large</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Condition */}
                  <Col xs={24} md={8}>
                    <Form.Item
                      name='Condition'
                      label={<Text strong>Condition</Text>}
                      rules={[{ required: true, message: 'Please select a condition' }]}
                    >
                      <Select placeholder='Select condition'>
                        <Option value='new'>New</Option>
                        <Option value='used'>Used</Option>
                        <Option value='refurbished'>Refurbished</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name='DateExpiration'
                      label={<Text strong>Expiration Date</Text>}
                      rules={[{ required: true, message: 'Please select a expiration date' }]}
                    >
                      <Input placeholder='Select expiration date' />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {/* Pricing and Stock */}
              <Card title={<Title level={4}>Pricing and Stock</Title>} style={{ marginBottom: '24px' }}>
                {isEditMode ? (
                  <Form.Item>
                    <Row gutter={16}>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label={<Text strong>Base Price</Text>}
                          name='OldPrice'
                          rules={[
                            { required: true, message: 'Please enter the base price' },
                            { type: 'number', min: 0, message: 'Price must be a positive number' }
                          ]}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label={<Text strong>Discount</Text>}
                          name='Discount'
                          rules={[
                            { required: true, message: 'Please enter the new price' },
                            { type: 'number', min: 0, message: 'Price must be a positive number' }
                          ]}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        {/* Stock */}
                        <Form.Item
                          label={<Text strong>Stock</Text>}
                          name='Quantity'
                          rules={[
                            { required: true, message: 'Please enter the stock quantity' },
                            { type: 'number', min: 0, message: 'Stock must be a positive number' }
                          ]}
                        >
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : (
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label={<Text strong>Base Price</Text>}
                        name='OldPrice'
                        rules={[
                          { required: true, message: 'Please enter the base price' },
                          { type: 'number', min: 0, message: 'Price must be a positive number' }
                        ]}
                      >
                        <InputNumber
                          min={0}
                          style={{ width: '100%' }}
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      {/* New Price */}
                      <Form.Item
                        label={<Text strong>New Price</Text>}
                        name='Price'
                        rules={[
                          { required: true, message: 'Please enter the new price' },
                          { type: 'number', min: 0, message: 'Price must be a positive number' }
                        ]}
                      >
                        <InputNumber
                          min={0}
                          style={{ width: '100%' }}
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      {/* Stock */}
                      <Form.Item
                        label={<Text strong>Stock</Text>}
                        name='Quantity'
                        rules={[
                          { required: true, message: 'Please enter the stock quantity' },
                          { type: 'number', min: 0, message: 'Stock must be a positive number' }
                        ]}
                      >
                        <InputNumber min={0} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Card>

              {/* Upload Images */}
              <Card title={<Title level={4}>Upload Images</Title>} style={{ marginBottom: '24px' }}>
                {/* Images */}
                <Form.Item
                  label={<Text strong>Images</Text>}
                  name='AttachmentFiles'
                  rules={[
                    {
                      required: true,
                      message: 'Please upload at least one image'
                    },
                    () => ({
                      validator() {
                        if (fileList.length > 5) {
                          return Promise.reject(new Error('You can upload up to 5 images'))
                        }
                        if (fileList.length === 0) {
                          return Promise.reject(new Error('Please upload at least one image'))
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <ImgCrop rotationSlider>
                    <Upload
                      accept='image/*'
                      listType='picture-card'
                      beforeUpload={() => false}
                      multiple
                      maxCount={5}
                      fileList={fileList}
                      onChange={handleUploadChange}
                    >
                      {fileList.length >= 5 ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </Card>

              {/* Category and Tags */}
              <Card title={<Title level={4}>Category and Tags</Title>} style={{ marginBottom: '24px' }}>
                {/* Category */}
                <Form.Item
                  label={<Text strong>Category</Text>}
                  name='CateId'
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  {isCategoriesLoading ? (
                    <Spin size='small' />
                  ) : isCategoriesError ? (
                    <Text type='danger'>An error occurred while loading categories.</Text>
                  ) : (
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder='Select category'
                      allowClear
                      treeDefaultExpandAll
                      treeData={categoriesTreeData}
                      treeCheckable={false}
                      showCheckedStrategy={TreeSelect.SHOW_ALL}
                    />
                  )}
                </Form.Item>
                <Button type='dashed' onClick={() => showCategoryModal()}>
                  Add New Category
                </Button>

                {/* Tags */}
                <Form.Item
                  label={<Text strong>Tags</Text>}
                  name='TagIds'
                  rules={[{ required: true, message: 'Please select at least one tag' }]}
                >
                  <Select placeholder='Select tags' mode='multiple'>
                    {/* Tag data */}
                    <Option value='FT00000001'>Bright Colors</Option>
                    <Option value='FT00000002'>Fragrant</Option>
                    <Option value='FT00000003'>Low Maintenance</Option>
                  </Select>
                </Form.Item>
              </Card>

              {/* Action Buttons */}
              {isEditMode ? (
                <Form.Item>
                  <Space>
                    <Button
                      type='default'
                      onClick={handleUpdate}
                      loading={createOrUpdateFlowerMutation.isPending}
                      disabled={createOrUpdateFlowerMutation.isLoading}
                    >
                      Update
                    </Button>
                  </Space>
                </Form.Item>
              ) : (
                <Form.Item>
                  <Space>
                    <Button
                      type='default'
                      onClick={handleSaveDraft}
                      loading={createOrUpdateFlowerMutation.isPending}
                      disabled={createOrUpdateFlowerMutation.isLoading}
                    >
                      Save Draft
                    </Button>
                    <Button
                      type='primary'
                      onClick={handleAddProduct}
                      loading={createOrUpdateFlowerMutation.isPending}
                      disabled={createOrUpdateFlowerMutation.isLoading}
                    >
                      Add Product
                    </Button>
                  </Space>
                </Form.Item>
              )}
            </Form>
          </Col>

          {/* Right Side */}
          <Col xs={24} lg={8}>
            {/* Timeline */}
            <Card title={<Title level={4}>Steps</Title>}>
              <Timeline items={timelineItems} />
            </Card>
          </Col>
        </Row>

        {/* Category Management Modal */}
        <Modal
          title={editingCategory ? 'Edit Category' : 'Add New Category'}
          open={isCategoryModalVisible}
          onCancel={() => {
            setIsCategoryModalVisible(false)
            formCategory.resetFields()
            setEditingCategory(null)
          }}
          footer={null}
        >
          <Form form={formCategory} layout='vertical' onFinish={handleAddCategory}>
            <Form.Item
              label='Category Name'
              name='fcateName'
              rules={[{ required: true, message: 'Please enter the category name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Category Description'
              name='fcateDesc'
              rules={[{ required: true, message: 'Please enter the category description' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Parent Category' name='fparentCateId'>
              <TreeSelect
                placeholder='Select parent category'
                allowClear
                treeDefaultExpandAll
                treeData={categoriesTreeData}
              />
            </Form.Item>

            <Space>
              <Button type='primary' htmlType='submit'>
                {editingCategory ? 'Update' : 'Add'}
              </Button>
            </Space>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}
