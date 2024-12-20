import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Form, Input, Layout, Row, Select, Typography, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import sellerApi from '../../apis/seller.api'
import { SellerContext } from '../../contexts/seller.context.jsx'
import { getAccessTokenFromLS } from '../../utils/utils'

const { Title } = Typography

export default function SellerRegister() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const navigate = useNavigate()
  const { setIsAuthenticated, setIsSellerMode, setSellerProfile } = useContext(SellerContext)

  const validateMessages = {
    required: '${label} is required!',
    string: {
      max: '${label} must be at most ${max} characters'
    }
  }

  // const uploadImageMutation = useMutation({
  //   mutationFn: (imageFile) => {
  //     const formData = new FormData()
  //     formData.append('file', imageFile)
  //     return utilsApi.uploadImage(formData)
  //   },
  //   onSuccess: (data) => {
  //     const uploadedUrl = data.data.data.link
  //     setUploadedImageUrl(uploadedUrl)
  //     toast.success('Image uploaded successfully')
  //   },
  //   onError: (error) => {
  //     toast.error('Failed to upload image')
  //     console.error(error)
  //   }
  // })
  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList]

    setFileList(newFileList)
    form.setFieldsValue({ AttachmentFiles: newFileList })
  }

  const registerToSellerMutation = useMutation({
    mutationFn: () => {
      const formValues = form.getFieldsValue()
      const accessToken = getAccessTokenFromLS()
      const formData = new FormData()
      formData.append('AccessToken', accessToken)
      formData.append('CardName', formValues.CardName)
      formData.append('CardNumber', formValues.CardNumber)
      formData.append('CardProviderName', formValues.CardProviderName)
      formData.append('TaxNumber', formValues.TaxNumber)
      formData.append('ShopName', formValues.ShopName)
      formData.append('SellerAddress', formValues.SellerAddress)
      formData.append('AttachmentFiles', fileList[0].originFileObj)

      return sellerApi.registerToSeller(formData)
    },
    onSuccess: (response) => {
      const { message: successMessage } = response.data
      setIsAuthenticated(true)
      setIsSellerMode(true)
      setSellerProfile(response.data.shop)

      toast.success(successMessage)
      navigate('/seller')
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        // Nếu lỗi 409, thông báo cho người dùng và chuyển hướng đến dashboard
        toast.error('You are already a seller.')
        navigate('/seller/seller-dashboard')
      } else {
        const errorMsg = error.response?.data?.title || error.message
        toast.error(errorMsg)
      }
    }
  })

  const handleSubmit = () => {
    registerToSellerMutation.mutate()
  }

  const selectCardProvider = useCallback(
    (data) =>
      data?.data.map((item) => ({
        value: item.cardProviderName,
        label: `${item.cardProviderName} - ${item.cpfullName}`
      })),
    []
  )

  const { data: cardProviderNames } = useQuery({
    queryKey: ['banks'],
    queryFn: () => sellerApi.getBanks(),
    select: selectCardProvider,
    keepPreviousData: true
  })
  return (
    <Layout className='h-screen w-full bg-gray-200 flex items-center justify-center p-8 '>
      <Form
        requiredMark={false}
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        validateMessages={validateMessages}
        className='w-full max-w-3xl bg-white p-6 rounded-lg shadow-2xl border-t-8 border-primary-500'
      >
        <Card hoverable title='Credit Card Information' className='shadow-lg rounded-lg mb-5 text-center font-bold'>
          <Title level={5} className='text-gray-600 font-beausite'>
            Please fill in your credit card information below to register as a seller.
          </Title>
        </Card>
        <Card hoverable className='mt-3 bg-white shadow-lg rounded-lg justify-center'>
          <Row gutter={[24, 32]}>
            <Col span={12} className='animate-fadeIn'>
              <Form.Item
                name='CardName'
                label='Card Name'
                validateDebounce={'500'}
                hasFeedback
                rules={[
                  { required: true, message: 'Card Name is required!' },
                  {
                    validator: (_, value) => {
                      if (value && value.startsWith(' ')) {
                        return Promise.reject('Card Name cannot start with a space')
                      }
                      return Promise.resolve()
                    }
                  },
                  {
                    validator: (_, value) => {
                      const trimmedValue = value ? value.replace(/\s/g, '') : ''
                      if (trimmedValue.length < 2) {
                        return Promise.reject('Card Name must be at least 2 characters (letters only)')
                      }
                      return Promise.resolve()
                    }
                  },
                  {
                    validator: (_, value) => {
                      if (value && /[^a-zA-Z\s]/.test(value)) {
                        return Promise.reject('Card Name can only contain letters and spaces')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
                normalize={(value) => {
                  if (!value) return value
                  return value
                    .split(' ')
                    .map((word) => word.toUpperCase())
                    .join(' ')
                }}
              >
                <Input
                  placeholder='Nguyen Van A'
                  showCount
                  maxLength={50}
                  minLength={2}
                  className='hover:shadow-md transition-all duration-300'
                />
              </Form.Item>

              <Form.Item
                name='CardNumber'
                label='Card Number'
                rules={[
                  { required: true, message: 'Card Number is required' },
                  {
                    pattern: /^\d{16}$/,
                    message: 'Card Number must be 16 digits'
                  }
                ]}
              >
                <Input
                  placeholder='Card Number'
                  showCount
                  maxLength={16}
                  className='hover:shadow-md transition-all duration-300'
                />
              </Form.Item>

              <Form.Item
                name='TaxNumber'
                label='Tax Number'
                rules={[
                  { required: true, message: 'Tax Number is required' },
                  {
                    pattern: /^\d{10}$/,
                    message: 'Tax Number must be 10 digits'
                  }
                ]}
              >
                <Input
                  placeholder='Tax Number'
                  showCount
                  maxLength={10}
                  className='hover:shadow-md transition-all duration-300'
                />
              </Form.Item>

              <Form.Item name='ShopName' label='Shop Name' rules={[{ required: true, max: 50 }]}>
                <Input
                  placeholder='Shop Name'
                  showCount
                  maxLength={50}
                  className='hover:shadow-md transition-all duration-300'
                />
              </Form.Item>
            </Col>

            <Col span={12} className='animate-fadeIn'>
              <Form.Item
                hasFeedback
                name='CardProviderName'
                label='Card Provider Name'
                rules={[{ required: true, max: 50 }]}
              >
                <Select showSearch placeholder='Select a provider' options={cardProviderNames} />
              </Form.Item>
              <Form.Item name='SellerAddress' label='Seller Address' rules={[{ required: true, max: 50 }]}>
                <Input
                  placeholder='Seller Address'
                  showCount
                  maxLength={50}
                  className='hover:shadow-md transition-all duration-300'
                />
              </Form.Item>
              <Form.Item
                name='AttachmentFiles'
                label='Attachment Files'
                rules={[{ required: true, message: 'Please upload an avatar image!' }]}
              >
                <ImgCrop rotationSlider>
                  <Upload
                    accept='image/*'
                    listType='picture-card'
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleUploadChange}
                    maxCount={1}
                  >
                    {fileList.length >= 1 ? null : '+ Upload Avatar'}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full mt-4 border-none bg-primary-400 shadow-lg hover:shadow-xl transition-all duration-300'
            >
              Register
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </Layout>
  )
}
