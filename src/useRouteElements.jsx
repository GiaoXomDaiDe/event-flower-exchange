// useRouteElements.jsx
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Dashboard from './components/dashboard/index.jsx'
import Layout from './components/layout/index.jsx'
import { SellerContext } from './contexts/seller.context.jsx'
import SellerLayout from './layouts/SellerLayout/SellerLayout.jsx'
import AddNewEvent from './pages/AddNewEvent/AddNewEvent.jsx'
import AddNewProduct from './pages/AddNewProduct/AddNewProduct.jsx'
import EventManagement from './pages/EventManagement/EventManagement.jsx'
import OrderManagement from './pages/OrderManagement/OrderManagement.jsx'
import PostManagement from './pages/PostManagement'
import ProductManagement from './pages/ProductManagement/index.js'
import SellerDashBoard from './pages/SellerDashBoard/SellerDashBoard.jsx'
import SellerRegister from './pages/SellerRegister/SellerRegister.jsx'
import Cart from './pages/cart/index.jsx'
import Category from './pages/category/index.jsx'
import CheckOut from './pages/checkout/index.jsx'
import Home from './pages/home/index.jsx'
import LoginPage from './pages/login/index.jsx'
import NotFound from './pages/not-found/index.jsx'
import PaymentFail from './pages/payment-status/fail.jsx'
import PaymentSuccess from './pages/payment-status/success.jsx'
import ProductDetail from './pages/product-detail/index.jsx'
import RegisterPage from './pages/register/index1.jsx'
import SearchEvents from './pages/search-events/index.jsx'
import ProfilePage from './pages/user-profile/index.jsx'

function BuyerProtectedRoute() {
  const { isAuthenticated } = useContext(SellerContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

function BuyerRejectedRoute() {
  const { isAuthenticated } = useContext(SellerContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

function SellerProtectedRoute() {
  const { isAuthenticated, isSellerMode } = useContext(SellerContext)
  return isAuthenticated && isSellerMode ? <Outlet /> : <Navigate to='/seller/register' replace />
}

function SellerRejectedRoute() {
  const { isAuthenticated, isSellerMode } = useContext(SellerContext)
  return isAuthenticated && !isSellerMode ? <Outlet /> : <Navigate to='/seller/seller-dashboard' replace />
}

export default function useRouteElements() {
  const { isAuthenticated = false, isSellerMode } = useContext(SellerContext)
  console.log(isAuthenticated, isSellerMode)
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'product/:flowerId',
          element: <ProductDetail />
        },
        {
          path: 'search',
          element: <SearchEvents />
        }
        // Các route công khai khác...
      ]
    },
    {
      element: <BuyerRejectedRoute />,
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        }
      ]
    },
    {
      element: <BuyerProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              path: 'profile',
              element: <ProfilePage />
            },
            {
              path: 'cart',
              element: <Cart />
            },
            {
              path: 'checkout',
              element: <CheckOut />
            },
            {
              path: 'checkout/success',
              element: <PaymentSuccess />
            },
            {
              path: 'checkout/fail',
              element: <PaymentFail />
            }
            // Các route cần bảo vệ khác...
          ]
        }
      ]
    },
    {
      path: 'seller',
      children: [
        {
          element: <SellerRejectedRoute />,
          children: [
            {
              path: 'register',
              element: <SellerRegister />
            }
          ]
        },
        {
          element: <SellerProtectedRoute />,
          children: [
            {
              element: <SellerLayout />,
              children: [
                {
                  path: 'seller-dashboard',
                  element: <SellerDashBoard />
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
                  path: 'event-management',
                  children: [
                    { index: true, element: <EventManagement /> },
                    {
                      path: 'add-new-event',
                      element: <AddNewEvent />
                    },
                    {
                      path: 'update-event/:eventId',
                      element: <AddNewEvent />
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
                  element: <Navigate to='seller-dashboard' replace />
                }
              ]
            }
          ]
        }
      ]
    },

    {
      path: 'dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'category',
          element: <Category />
        },
        {
          path: 'even',
          element: <Category />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElements
}
