import { Navigate, useRoutes } from 'react-router-dom'
import Dashboard from './components/Buyer/dashboard/index.jsx'
import Layout from './components/Buyer/layout/index.jsx'
import SellerLayout from './layouts/SellerLayout/SellerLayout.jsx'
import Cart from './pages/Buyer/cart/index.jsx'
import Category from './pages/Buyer/category/index.jsx'
import CheckOut from './pages/Buyer/checkout/index.jsx'
import Home from './pages/Buyer/home/index.jsx'
import LoginPage from './pages/Buyer/login/index.jsx'
import NotFound from './pages/Buyer/not-found/index.jsx'
import Flower from './pages/Buyer/product/index.jsx'
import RegisterPage from './pages/Buyer/register/index1.jsx'
import SearchPage from './pages/Buyer/search/index.jsx'
import SellDashboard from './pages/Seller/DashBoard/DashBoard.jsx'
import OrderManagement from './pages/Seller/OrderManagement/OrderManagement.jsx'
import PostManagement from './pages/Seller/PostManagement/PostManagement.jsx'
import ProductManagement from './pages/Seller/ProductManagement/ProductManagement.jsx'
import ShopManagement from './pages/Seller/ShopManagement/ShopManagement.jsx'

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
      path: '/',
      element: <Layout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <CheckOut /> },
        { path: '/', element: <Navigate to='/home' replace /> }
      ]
    },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },

    // Seller specific routes under SellerLayout
    {
      path: 'seller',
      element: <SellerLayout />,
      children: [
        { path: 'dashboard', element: <SellDashboard /> },
        { path: 'product-management', element: <ProductManagement /> },
        { path: 'post-management', element: <PostManagement /> },
        { path: 'order-management', element: <OrderManagement /> },
        { path: 'shop-management', element: <ShopManagement /> }
      ]
    },

    // Additional dashboard that was mentioned separately
    {
      path: 'dashboard',
      element: <Dashboard />,
      children: [
        { path: 'category', element: <Category /> },
        { path: 'event', element: <Category /> }, // Assuming this might be a typo and should be 'event'
        { path: 'flower', element: <Flower /> }
      ]
    },

    // Redirect root directly to '/home' (could adjust based on preference)
    { path: '/', element: <Navigate to='/home' replace /> },

    // Catch all unmatched routes
    { path: '*', element: <NotFound /> }
  ])
  return routeElements
}
