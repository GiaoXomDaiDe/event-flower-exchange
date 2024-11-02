import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout";
import Home from "./page/home";
import Dashboard from "./component/dashboard";
import Category from "./page/category";
import LoginPage from "./page/login";
import NotFound from "./page/not-found";
import SearchPage from "./page/search";
import Cart from "./page/cart";
import CheckOut from "./page/checkout";
import RegisterPage from "./page/register/index1";
import Flower from "./page/product";
import ProductDetail from "./page/product-detail";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./page/user-profile";
import PaymentSuccess from "./page/payment-status/success";
import PaymentFail from "./page/payment-status/fail";

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
        {
          path: "flower",
          element: <Flower />,
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
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}

export default App;
