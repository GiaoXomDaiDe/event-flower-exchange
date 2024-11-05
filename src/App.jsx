import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Dashboard from "./components/dashboard";
import Category from "./pages/category";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import SearchPage from "./pages/search";
import Cart from "./pages/cart";
import CheckOut from "./pages/checkout";
import RegisterPage from "./pages/register/index1";
import Flower from "./pages/product";
import ProductDetail from "./pages/product-detail";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/user-profile";
import PaymentSuccess from "./pages/payment-status/success";
import PaymentFail from "./pages/payment-status/fail";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },

        {
          path: "search",
          element: <SearchPage />,
        },

        {
          path: "cart",
          element: <Cart />,
        },

        {
          path: "checkout",
          element: <CheckOut />,
        },
        {
          path: "/checkout/success",
          element: <PaymentSuccess/>,
        },
        {
          path: "/checkout/fail",
          element: <PaymentFail />,
        },
        {
          path: "product/:flowerId",
          element: <ProductDetail />,
        },
      ],
    },

    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },

    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "even",
          element: <Category />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
