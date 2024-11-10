import {
  AppstoreOutlined,
  BellOutlined,
  FormOutlined,
  InfoCircleOutlined,
  MoonOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Col, Divider, Image, Layout, Popover, Row, Tooltip, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import SungJinWo from '../../assets/images/profile_image.jpg'
import Sidebar from '../../components/Seller/Sidebar/Sidebar.jsx'
import { LayoutProvider } from '../../contexts/layout.context.jsx'

const { Title, Text } = Typography

export default function SellerLayout({ children }) {
  const location = useLocation()
  const { pathname } = location
  const pathArray = pathname.split('/').filter((item) => item !== '')
  const capitalPathArray = _.map(pathArray, _.capitalize)
  const breadcrumbs = capitalPathArray.join(' / ')
  const title = pathArray[1].replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
    return match.toUpperCase()
  })

  const notificationItems = [
    {
      id: 1,
      image: SungJinWo,
      title: 'New Update Available',
      description: 'Version 2.0 of the app is now available. Update to enjoy new features and improvements.'
    }
  ]

  const appPopoverContent = (
    <div className='p-2 w-60'>
      <Row gutter={[0, 16]}>
        <Col span={12}>
          <Link
            to='/seller/order-management'
            className='flex flex-col items-center space-x-2 hover:text-primary-500 text-gray-600'
          >
            <ShoppingCartOutlined className='text-2xl text-gray-600' />
            <span>My Orders</span>
          </Link>
        </Col>
        <Col span={12}>
          <Link
            to='/seller/shop-management'
            className='flex flex-col items-center space-x-2 hover:text-primary-500 text-gray-600'
          >
            <SettingOutlined className='text-2xl text-gray-600' />
            <span>Shop Setting</span>
          </Link>
        </Col>
        <Col span={12}>
          <Link
            to='/seller/product-management'
            className='flex flex-col items-center space-x-2 hover:text-primary-500 text-gray-600'
          >
            <ShopOutlined className='text-2xl text-gray-600' />
            <span>My Products</span>
          </Link>
        </Col>
        <Col span={12}>
          <Link
            to='/seller/post-management'
            className='flex flex-col items-center space-x-2 hover:text-primary-500 text-gray-600'
          >
            <FormOutlined className='text-2xl text-gray-600' />
            <span>My Posts</span>
          </Link>
        </Col>
      </Row>
    </div>
  )

  const notiContent = (
    <div>
      <Row justify={'space-between'} className='pb-4'>
        <Col>
          <Text className='text-base font-bold'>Notification</Text>
        </Col>
        <Col>
          <Text className='text-base font-bold cursor-pointer hover:text-primary-500'>Mark all read</Text>
        </Col>
      </Row>
      <div className='space-y-4'>
        {notificationItems.map((noti) => (
          <Row
            key={noti.id}
            className='p-2 hover:bg-gray-100 transition-transform ease-in-out animate-slideInRight duration-300 cursor-pointer'
          >
            <Col className='mr-5'>
              <Image preview={false} className='object-cover rounded-md' width={125} height={75} src={noti.image} />
            </Col>
            <Col className='w-[350px]'>
              <div className='font-bold'>{noti.title}</div>
              <div>{noti.description}</div>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  )

  const userContent = (
    <div className='p-3 font-beausite space-y-3'>
      <div className='font-bold'>👋 Hello, SungJinWoo</div>
      <Divider style={{ margin: '8px 0' }} />
      <div>Profile setting</div>
      <div>Logout</div>
    </div>
  )
  return (
    <LayoutProvider>
      <Layout className='min-h-[100vh]'>
        <Sidebar />
        <Layout>
          <Header className='sticky top-4 z-10 mx-3 p-2 flex items-center justify-between bg-gray-100/20 backdrop-blur-xl min-h-[5rem]'>
            <div className='flex flex-col justify-center'>
              <Typography.Text className='font-beausite text-gray-600'>{breadcrumbs}</Typography.Text>
              <Typography.Title strong className='font-beausite text-gray-600' level={2} style={{ margin: 0 }}>
                {title}
              </Typography.Title>
            </div>
            <div className='flex items-center bg-white shadow-md px-2 pl-5 py-2 outline-none rounded-full'>
              <div className='flex items-center space-x-6'>
                {/* Popover for AppstoreOutlined icon */}
                <Popover
                  content={appPopoverContent}
                  trigger='hover'
                  placement='bottomRight'
                  overlayClassName='animate-fadeInDown'
                >
                  <AppstoreOutlined className='text-xl cursor-pointer text-gray-500 hover:text-primary-500 transition-colors duration-200' />
                </Popover>

                <Popover
                  content={notiContent}
                  trigger='hover'
                  placement='bottomRight'
                  overlayClassName='animate-fadeInDown'
                >
                  <Badge count={notificationItems.length}>
                    <BellOutlined className='text-xl cursor-pointer text-gray-500 hover:text-primary-500 transition-colors duration-200' />
                  </Badge>
                </Popover>
                <Tooltip title='Help Center' placement='bottom'>
                  <InfoCircleOutlined className='text-xl cursor-pointer text-gray-500 hover:text-primary-500 transition-colors duration-200' />
                </Tooltip>
                <MoonOutlined className='text-xl cursor-pointer text-gray-500' />
                <Popover
                  content={userContent}
                  trigger='hover'
                  placement='bottomRight'
                  overlayClassName='animate-fadeInDown'
                >
                  <Avatar size={40} src={SungJinWo} />
                </Popover>
              </div>
            </div>
          </Header>
          <Content className='p-6'>{children}</Content>
        </Layout>
      </Layout>
    </LayoutProvider>
  )
}

SellerLayout.propTypes = {
  children: PropTypes.node.isRequired
}
