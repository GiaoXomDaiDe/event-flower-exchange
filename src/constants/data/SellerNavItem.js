import { HomeOutlined } from '@ant-design/icons'
import DashBoard from '../../pages/DashBoard'

const routes = [
  {
    name: 'Dashboard',
    layout: '/seller',
    path: '/seller/dashboard',
    icon: HomeOutlined,
    component: DashBoard
  },
  {
    name: 'Shop Management',
    layout: '/seller',
    path: '/seller/shop-management',
    icon: HomeOutlined,
    component: DashBoard
  },
  {
    name: 'Post Management',
    layout: '/seller',
    path: '/seller/post-management',
    icon: HomeOutlined,
    component: DashBoard
  },
  {
    name: 'Order Management',
    layout: '/seller',
    path: '/seller/order-management',
    icon: HomeOutlined,
    component: DashBoard
  },
  {
    name: 'Product Management',
    layout: '/seller',
    path: '/seller/product-management',
    icon: HomeOutlined,
    component: DashBoard
  },
  {
    name: 'Logout',
    layout: '/seller',
    path: '/seller/logout',
    icon: HomeOutlined,
    component: DashBoard
  }
]
export default routes
