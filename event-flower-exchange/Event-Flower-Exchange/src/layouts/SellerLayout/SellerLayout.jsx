import { BellOutlined, MoonOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Input, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import SungJinWo from '../../assets/images/profile_image.jpg'
import Sidebar from '../../components/Seller/Sidebar/Sidebar.jsx'
import { LayoutProvider } from '../../contexts/layout.context.jsx'

export default function SellerLayout({ children }) {
  const location = useLocation()
  const { pathname } = location
  const pathArray = pathname.split('/').filter((item) => item !== '')
  const capitalPathArray = _.map(pathArray, _.capitalize)
  const breadcrumbs = capitalPathArray.join('/')
  const title = pathArray[1].replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
    return match.toUpperCase()
  })

  return (
    <LayoutProvider>
      <Layout className='min-h-[100vh]' hasSider={true}>
        <Sidebar />
        <Layout>
          <Header className=' p-0 mt-5 mx-5 flex items-end justify-between bg-gray-100 min-h-[5rem]'>
            <div className='flex flex-col justify-center '>
              <Typography.Text className='font-beausite text-gray-600'>{breadcrumbs}</Typography.Text>
              <Typography.Title strong className='font-beausite text-gray-600' level={2} style={{ margin: 0 }}>
                {title}
              </Typography.Title>
            </div>
            <div className='flex items-center space-x-4 bg-white shadow-md px-3 outline-none rounded-full '>
              <div className='relative w-full  max-w-md mx-auto'>
                <Input
                  prefix={<SearchOutlined className='text-primary-500' />}
                  placeholder='Search'
                  className='border rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-primary-500'
                />
              </div>

              <div className='flex items-center space-x-4'>
                <BellOutlined className='text-xl cursor-pointer text-gray-500' />
                <MoonOutlined className='text-xl cursor-pointer text-gray-500' />
                <Avatar size={40} src={SungJinWo} />
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
