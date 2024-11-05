// Import các thư viện và component cần thiết
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import categoryApi from '../../apis/category.api'
import productApi from '../../apis/product.api'
import sellerApi from '../../apis/seller.api'
import utilsApi from '../../apis/utils.api'

const { Content } = Layout
const { Title, Text } = Typography
const { Option } = Select
const { Dragger } = Upload

export default function AddNewProduct() {
  const [form] = Form.useForm()
  const [formCategory] = Form.useForm()
  const steps = [
    {
      title: 'Điền thông tin sản phẩm',
      fields: ['flowerName', 'description', 'size', 'condition']
    },
    {
      title: 'Thiết lập giá và kho',
      fields: ['basePrice', 'newPrice', 'stock']
    },
    {
      title: 'Tải lên hình ảnh và video',
      fields: ['images', 'video']
    },
    {
      title: 'Chọn danh mục và thẻ',
      fields: ['cateId', 'tagId']
    },
    {
      title: 'Xem lại và gửi',
      fields: []
    }
  ]

  const [stepStatuses, setStepStatuses] = useState(steps.map(() => 'wait'))
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

  // Quản lý hiển thị Modal cho danh mục
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Lấy danh sách danh mục từ API bằng react-query
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => sellerApi.getSellerFlowerCategories()
  })

  // Chuyển đổi dữ liệu danh mục thành dạng tree cho TreeSelect
  const transformCategoriesToTreeData = (categories) => {
    return categories.map((category) => {
      const children = category.children ? transformCategoriesToTreeData(category.children) : []

      // Tạo React Node cho title
      const title = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{category.fcateName}</span>
          <Space size='small' className='mr-3'>
            <Button
              type='link'
              size='small'
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation() // Ngăn chặn việc chọn node khi nhấn nút
                showCategoryModal(category)
              }}
            />
            <Button
              type='link'
              size='small'
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation() // Ngăn chặn việc chọn node khi nhấn nút
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

  // Các hàm CRUD cho danh mục
  const handleAddCategory = (values) => {
    const categoryData = {
      FcateName: values.fcateName,
      FcateDesc: values.fcateDesc,
      FparentCateId: values.fparentCateId || null // Nếu không chọn danh mục cha, đặt là null
    }

    if (editingCategory) {
      // Cập nhật danh mục hiện có
      console.log(editingCategory)
      categoryApi
        .updateFlowerCategory({
          FcateId: editingCategory.fcateId,
          FcateName: editingCategory.fcateName,
          FcateDesc: editingCategory.fcateDesc
        })
        .then(() => {
          message.success('Danh mục đã được cập nhật thành công!')
          refetchCategories()
          setEditingCategory(null)
          setIsCategoryModalVisible(false)
          formCategory.resetFields()
        })
        .catch(() => message.error('Lỗi khi cập nhật danh mục!'))
    } else {
      // Thêm danh mục mới
      categoryApi
        .createFlowerCategory(categoryData)
        .then(() => {
          message.success('Danh mục mới đã được tạo thành công!')
          refetchCategories()
          setIsCategoryModalVisible(false)
          formCategory.resetFields()
        })
        .catch(() => message.error('Lỗi khi thêm danh mục!'))
    }
  }

  const handleDeleteCategory = (categoryId) => {
    categoryApi
      .deleteFlowerCategory(categoryId)
      .then(() => {
        message.success('Danh mục đã được xóa thành công!')
        refetchCategories()
      })
      .catch(() => message.error('Lỗi khi xóa danh mục!'))
  }

  // Hiển thị Modal thêm/sửa danh mục
  const showCategoryModal = (category = null) => {
    setEditingCategory(category)
    setIsCategoryModalVisible(true)
    if (category) {
      // Đặt giá trị ban đầu cho form khi chỉnh sửa
      formCategory.setFieldsValue({
        fcateName: category.fcateName,
        fcateDesc: category.fcateDesc,
        fparentCateId: category.fparentCateId || null
      })
    } else {
      // Xóa giá trị khi thêm mới
      formCategory.resetFields()
    }
  }

  // Tạo các items cho Timeline
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

  // Quản lý danh sách file ảnh được tải lên
  const [fileList, setFileList] = useState([])
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  // Sử dụng mutation để tải lên hình ảnh
  const uploadImagesMutation = useMutation({
    mutationFn: (imageFile) => {
      const formData = new FormData()
      formData.append('file', imageFile)
      return utilsApi.uploadImage(formData)
    },
    onSuccess: (data) => {
      const uploadedUrl = data.data.data.link
      setUploadedImageUrl(uploadedUrl)
      message.success('Hình ảnh đã được tải lên thành công')
    },
    onError: (error) => {
      message.error('Lỗi khi tải lên hình ảnh')
      console.error(error)
    }
  })

  const handleUploadChange = ({ fileList }) => {
    const file = fileList[0]?.originFileObj
    if (file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        toast.error('You can only upload image files!')
        return
      }
      if (!isLt2M) {
        toast.error('Image must be smaller than 2MB!')
        return
      }
      setFileList(fileList)
      uploadImagesMutation.mutate(file)
    } else {
      setFileList([])
      setUploadedImageUrl('')
    }
  }

  // Hàm xử lý khi submit form
  const onFinish = (values) => {
    // Chuẩn bị dữ liệu để tải lên hình ảnh
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj)
    })

    // Tải lên hình ảnh trước
    uploadImagesMutation.mutate(formData, {
      onSuccess: (uploadResponse) => {
        // Giả sử phản hồi chứa mảng các URL hình ảnh
        const imageUrls = uploadResponse.data.data.imageUrls

        // Chuẩn bị dữ liệu sản phẩm
        const productData = {
          ...values,
          images: imageUrls
        }

        // Tạo sản phẩm
        productApi
          .createProduct(productData)
          .then(() => {
            message.success('Sản phẩm đã được thêm thành công!')
            form.resetFields()
            setFileList([])
            setStepStatuses(steps.map(() => 'wait'))
          })
          .catch(() => {
            message.error('Lỗi khi thêm sản phẩm')
          })
      }
    })
  }

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Row gutter={24}>
          {/* Phần bên trái */}
          <Col xs={24} lg={16}>
            <Form
              form={form}
              requiredMark={false}
              layout='vertical'
              onFinish={onFinish}
              onFieldsChange={updateStepStatuses}
            >
              {/* Thông tin chung */}
              <Card title={<Title level={4}>Thông tin chung</Title>} style={{ marginBottom: '24px' }}>
                {/* Tên sản phẩm */}
                <Form.Item
                  hasFeedback
                  tooltip={{
                    title: 'Tên thương hiệu + Loại sản phẩm + Đặc điểm chính (Chất liệu, Màu sắc, Kích thước, Mẫu mã).',
                    icon: <InfoCircleOutlined />
                  }}
                  name='flowerName'
                  label={<Text strong>Tên sản phẩm</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Trường này không được để trống'
                    },
                    () => ({
                      validator(_, value) {
                        if (value && value.trim().length < 10 && value.trim().length > 0) {
                          return Promise.reject('Tên sản phẩm quá ngắn. Vui lòng nhập ít nhất 10 ký tự.')
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input placeholder='Tên thương hiệu + Loại sản phẩm + Đặc điểm chính' maxLength={70} showCount />
                </Form.Item>

                {/* Mô tả */}
                <Form.Item
                  hasFeedback
                  name='description'
                  label={<Text strong>Mô tả</Text>}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Trường này không được để trống'
                    },
                    () => ({
                      validator(_, value) {
                        if (value && value.trim().length < 100 && value.trim().length > 0) {
                          return Promise.reject('Mô tả quá ngắn. Vui lòng nhập ít nhất 100 ký tự.')
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input.TextArea
                    maxLength={3000}
                    rows={5}
                    placeholder='Thêm mô tả ngắn về sản phẩm của bạn'
                    showCount
                    style={{ padding: '10px' }}
                  />
                </Form.Item>

                <Row gutter={16}>
                  {/* Kích thước */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='size'
                      label={<Text strong>Kích thước</Text>}
                      rules={[{ required: true, message: 'Vui lòng chọn kích thước' }]}
                    >
                      <Select placeholder='Chọn kích thước'>
                        <Option value='small'>Nhỏ</Option>
                        <Option value='medium'>Trung bình</Option>
                        <Option value='large'>Lớn</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Tình trạng */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='condition'
                      label={<Text strong>Tình trạng</Text>}
                      rules={[{ required: true, message: 'Vui lòng chọn tình trạng' }]}
                    >
                      <Select placeholder='Chọn tình trạng'>
                        <Option value='fresh'>Hoa tươi</Option>
                        <Option value='fake'>Hoa giả</Option>
                        <Option value='clearance'>Hoa thanh lý</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {/* Giá và kho */}
              <Card title={<Title level={4}>Giá và kho</Title>} style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                  <Col xs={24} md={8}>
                    {/* Giá gốc */}
                    <Form.Item
                      label={<Text strong>Giá gốc</Text>}
                      name='basePrice'
                      rules={[
                        { required: true, message: 'Vui lòng nhập giá gốc' },
                        { type: 'number', min: 0, message: 'Giá phải là số dương' }
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
                    {/* Giá mới */}
                    <Form.Item
                      label={<Text strong>Giá mới</Text>}
                      name='newPrice'
                      rules={[
                        { required: true, message: 'Vui lòng nhập giá mới' },
                        { type: 'number', min: 0, message: 'Giá phải là số dương' }
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
                    {/* Số lượng */}
                    <Form.Item
                      label={<Text strong>Số lượng</Text>}
                      name='stock'
                      rules={[
                        { required: true, message: 'Vui lòng nhập số lượng' },
                        { type: 'number', min: 0, message: 'Số lượng phải là số dương' }
                      ]}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {/* Tải lên hình ảnh và video */}
              <Card title={<Title level={4}>Tải lên hình ảnh và video</Title>} style={{ marginBottom: '24px' }}>
                {/* Hình ảnh */}
                <Form.Item
                  label={<Text strong>Hình ảnh</Text>}
                  name='images'
                  valuePropName='fileList'
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng tải lên ít nhất một hình ảnh'
                    },
                    () => ({
                      validator(_, value) {
                        if (value && value.length > 5) {
                          return Promise.reject(new Error('Bạn có thể tải lên tối đa 5 hình ảnh'))
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <ImgCrop rotate>
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
                          <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                </Form.Item>

                {/* Video */}
                <Form.Item
                  label={<Text strong>Video</Text>}
                  name='video'
                  valuePropName='fileList'
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (value && value.length > 0) {
                          const file = value[0]
                          const isMP4 = file.type === 'video/mp4'
                          const isSizeValid = file.size / 1024 / 1024 < 30

                          if (!isMP4) {
                            return Promise.reject(new Error('Định dạng video phải là MP4'))
                          }
                          if (!isSizeValid) {
                            return Promise.reject(new Error('Kích thước video phải nhỏ hơn 30MB'))
                          }
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
                    <p className='ant-upload-text'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                    <p className='ant-upload-hint'>
                      Bạn có thể đăng sản phẩm này trong khi video đang được xử lý. Video sẽ được hiển thị khi xử lý
                      xong.
                    </p>
                  </Dragger>
                </Form.Item>
              </Card>

              {/* Danh mục và thẻ */}
              <Card title={<Title level={4}>Danh mục và thẻ</Title>} style={{ marginBottom: '24px' }}>
                {/* Danh mục */}

                <Form.Item
                  label={<Text strong>Danh mục</Text>}
                  name='cateId'
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                  {isCategoriesLoading ? (
                    <Spin size='small' />
                  ) : isCategoriesError ? (
                    <Text type='danger'>Đã xảy ra lỗi khi tải danh mục.</Text>
                  ) : (
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder='Chọn danh mục'
                      allowClear
                      treeDefaultExpandAll
                      treeData={categoriesTreeData}
                      // Thêm thuộc tính này để cho phép chọn cả node cha
                      treeCheckable={false}
                      showCheckedStrategy={TreeSelect.SHOW_ALL}
                    />
                  )}
                </Form.Item>
                <Button type='dashed' onClick={() => showCategoryModal()}>
                  Thêm danh mục mới
                </Button>

                {/* Thẻ */}
                <Form.Item
                  label={<Text strong>Thẻ</Text>}
                  name='tagId'
                  rules={[{ required: true, message: 'Vui lòng chọn ít nhất một thẻ' }]}
                >
                  <Select placeholder='Chọn thẻ' mode='multiple'>
                    {/* Dữ liệu thẻ */}
                    <Option value='FT00000001'>Màu sắc rực rỡ</Option>
                    <Option value='FT00000002'>Thơm</Option>
                    <Option value='FT00000003'>Dễ chăm sóc</Option>
                  </Select>
                </Form.Item>
              </Card>

              {/* Nút hành động */}
              <Form.Item>
                <Space>
                  <Button type='default'>Lưu nháp</Button>
                  <Button type='primary' htmlType='submit'>
                    Thêm sản phẩm
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>

          {/* Phần bên phải */}
          <Col xs={24} lg={8}>
            {/* Timeline */}
            <Card title={<Title level={4}>Các bước</Title>}>
              <Timeline items={timelineItems} />
            </Card>
          </Col>
        </Row>

        {/* Modal quản lý danh mục */}
        <Modal
          title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
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
              label='Tên danh mục'
              name='fcateName'
              rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Mô tả danh mục'
              name='fcateDesc'
              rules={[{ required: true, message: 'Vui lòng nhập mô tả danh mục' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Danh mục cha' name='fparentCateId'>
              <TreeSelect
                placeholder='Chọn danh mục cha'
                allowClear
                treeDefaultExpandAll
                treeData={categoriesTreeData}
              />
            </Form.Item>

            <Space>
              <Button type='primary' htmlType='submit'>
                {editingCategory ? 'Cập nhật' : 'Thêm'}
              </Button>
            </Space>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}
