import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import {
  InfoCircleOutlined,
  SettingOutlined,
  DollarOutlined,
  PieChartOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useForm } from 'antd/es/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/features/userSlice'
import axios from 'axios'
import api from '../../config/axios'

function ProfilePage() {
  const [form] = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = [
    {
      text: 'Basic info',
      icon: <InfoCircleOutlined />,
      key: 1
    },
    {
      text: 'Change password',
      icon: <SettingOutlined />,
      key: 4
    },
    {
      text: 'Logout',
      icon: <LogoutOutlined />,
      key: 5,
      onclick: () => {
        dispatch(logout())
        navigate('/login')
      }
    }
  ]
  const account = useSelector((store) => store.user)

  const handleUpdateProfile = async (values) => {
    console.log(values)
    const formUpdate = new FormData()
    formUpdate.append('FullName', values.fullname)
    formUpdate.append('Username', values.username)
    formUpdate.append('Email', values.email)
    formUpdate.append('Phone', values.phone)
    formUpdate.append('Birthday', account.birthday)
    formUpdate.append('Gender', values.gender == 'Male' ? 0 : 1)
    formUpdate.append('Address', values.address)

    const token = localStorage.getItem('token')
    const response = await api.put(
      `https://localhost:7026/api/account/update-profile?accessToken=${token}
      `,
      formUpdate,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  form.setFieldsValue(account)

  return (
    <>
      <Row justify='center'>
        <Col className='profile-services' span={6} onClick={onclick}>
          <Row className='profile-avatar'>
            <Avatar
              style={{ width: '200px', height: '200px' }}
              src='https://bookvexe.vn/wp-content/uploads/2023/04/chon-loc-25-avatar-facebook-mac-dinh-chat-nhat_2.jpg'
            ></Avatar>
          </Row>
          {items.map((item) => (
            <Row className='profile' key={item.key}>
              <div className=' profile-icon'>{item.icon}</div>
              <div className=' profile-text'>{item.text}</div>
            </Row>
          ))}
        </Col>
        <Col className='profile-container' span={18}>
          <div className='profile-wrapper'>
            <h1 className='profile-wrapper--title'>Basic info</h1>
            <div className='profile-form'>
              <Form onFinish={handleUpdateProfile} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} form={form}>
                <Form.Item label='Full Name' name='fullname'>
                  <Input size='large' />
                </Form.Item>
                <Form.Item label='UserName' name='username'>
                  <Input size='large' />
                </Form.Item>
                <Form.Item label='Email' name='email'>
                  <Input size='large' />
                </Form.Item>
                <Form.Item label='Phone' name='phone'>
                  <Input size='large' />
                </Form.Item>
                <Form.Item label='Address' name='address'>
                  <Input size='large' />
                </Form.Item>
                {/* <Form.Item name='birthday'>
                  <DatePicker value={'2024-10-24'}
                    placeholder='Birthday'
                    format='YYYY-MM-DD'
                  />
                </Form.Item> */}
                <Form.Item label='Gender' name='gender'>
                  <Select placeholder='Gender'>
                    <Select.Option value={1}>Male</Select.Option>
                    <Select.Option value={0}>Female</Select.Option>
                    <Select.Option value={3}>Other</Select.Option>
                  </Select>
                </Form.Item>
                <div className='profile-wrapper--btn'>
                  <button>Edit</button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage
