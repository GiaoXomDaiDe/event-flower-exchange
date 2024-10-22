import { Divider, Layout, Row, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import _ from 'lodash'
import { Outlet, useLocation } from 'react-router-dom' // Thêm Outlet
import SungJinWo from '../../assets/images/profile_image.jpg'
import Sidebar from '../../components/Seller/Sidebar/Sidebar.jsx'
import { LayoutProvider } from '../../contexts/layout.context.jsx'

const { Title, Text } = Typography

export default function SellerLayout() {
  const location = useLocation()
  const { pathname } = location
  const pathArray = pathname.split('/').filter((item) => item !== '')
  const capitalPathArray = _.map(pathArray, _.capitalize)
  const breadcrumbs = capitalPathArray.join(' / ')
  const title = pathArray[1]
    ? pathArray[1].replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
        return match.toUpperCase()
      })
    : 'Dashboard'

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
      <Row gutter={[0, 16]}>{/* Nội dung của popover */}</Row>
    </div>
  )

  const notiContent = <div>{/* Nội dung của notification */}</div>

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
              <div className='flex items-center space-x-6'>{/* Các icon và popover */}</div>
            </div>
          </Header>
          <Content className='p-6'>
            {/* Thay thế `{children}` bằng `<Outlet />` */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </LayoutProvider>
  )
}

// Loại bỏ hoặc cập nhật PropTypes
SellerLayout.propTypes = {
  // Không cần định nghĩa `children`
}
