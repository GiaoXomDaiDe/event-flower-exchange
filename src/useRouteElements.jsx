// useRouteElements.jsx
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterToSeller from './components/Seller/RegisterToSeller/RegisterToSeller.jsx'
import { SellerContext } from './contexts/seller.context.jsx'
import SellerLayout from './layouts/SellerLayout/SellerLayout.jsx'
import AddNewProduct from './pages/AddNewProduct/AddNewProduct.jsx'
import DashBoard from './pages/DashBoard'
import OrderManagement from './pages/OrderManagement/OrderManagement.jsx'
import PostManagement from './pages/PostManagement'
import ProductManagement from './pages/ProductManagement/index.js'
import SellerRegister from './pages/SellerRegister/SellerRegister.jsx'

function SellerProtectedRoute() {
  const { isAuthenticated, isSellerMode } = useContext(SellerContext)
  return isAuthenticated && isSellerMode ? <Outlet /> : <Navigate to='/login' replace />
}

function SellerRejectedRoute() {
  const { isAuthenticated, isSellerMode } = useContext(SellerContext)
  return !isAuthenticated || !isSellerMode ? <Outlet /> : <Navigate to='/seller/dashboard' replace />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/seller',
      element: <SellerProtectedRoute />,
      children: [
        {
          path: '',
          element: <SellerLayout />,
          children: [
            {
              path: 'dashboard',
              element: <DashBoard />
            },
            {
              path: 'product-management',
              children: [
                { index: true, element: <ProductManagement /> },
                {
                  path: 'add-new-product',
                  element: <AddNewProduct />
                },
                {
                  path: 'update-product/:productId',
                  element: <AddNewProduct />
                }
              ]
            },
            {
              path: 'post-management',
              element: <PostManagement />
            },
            {
              path: 'order-management',
              element: <OrderManagement />
            },
            {
              path: '',
              element: <Navigate to='dashboard' replace />
            }
          ]
        }
      ]
    },
    {
      path: '/seller/register',
      element: <SellerRejectedRoute />,
      children: [
        {
          path: '',
          element: <SellerRegister />
        }
      ]
    },
    {
      path: '/',
      element: <RegisterToSeller />
    },
    {
      path: '*',
      element: <Navigate to='/' replace />
    }
  ])
  return routeElements
}
