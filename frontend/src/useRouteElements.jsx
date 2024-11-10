import { Navigate, useRoutes } from 'react-router-dom'
import SellerLayout from './layouts/SellerLayout/SellerLayout.jsx'
import DashBoard from './pages/DashBoard'
import OrderManagement from './pages/OrderManagement/OrderManagement.jsx'
import PostManagement from './pages/PostManagement'
import ProductManagement from './pages/ProductManagement/index.js'
import ShopManagement from './pages/ShopManagement'

// function SellerProtectedRoute() {
//   const { isAuthenticated, isSellerMode } = useContext(SellerContext)
//   return isAuthenticated && isSellerMode ? <Outlet /> : <Navigate to='/login' />
// }

// function BuyerProtectedRoute() {
//   const { isAuthenticated, isSellerMode } = useContext(SellerContext)
//   return isAuthenticated && !isSellerMode ? <Outlet /> : <Navigate to='/login' />
// }

// function RejectedRoute() {
//   const { isAuthenticated } = useContext(SellerContext)
//   return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
// }

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/seller/dashboard',
      element: (
        <SellerLayout>
          <DashBoard />
        </SellerLayout>
      )
    },
    {
      path: '/seller/product-management',
      element: (
        <SellerLayout>
          <ProductManagement />
        </SellerLayout>
      )
    },
    {
      path: '/seller/post-management',
      element: (
        <SellerLayout>
          <PostManagement />
        </SellerLayout>
      )
    },
    {
      path: '/seller/order-management',
      element: (
        <SellerLayout>
          <OrderManagement />
        </SellerLayout>
      )
    },
    {
      path: '/seller/shop-management',
      element: (
        <SellerLayout>
          <ShopManagement />
        </SellerLayout>
      )
    },
    // Add this route to redirect from '/' to '/seller/dashboard'
    {
      path: '/',
      element: <Navigate to='/seller/dashboard' replace />
    },
    // Optional: Redirect all unmatched routes to '/seller/dashboard'
    {
      path: '*',
      element: <Navigate to='/seller/dashboard' replace />
    }
  ])
  return routeElements
}
