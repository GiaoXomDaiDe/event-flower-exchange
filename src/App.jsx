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

  return <RouterProvider router={router} />;
}

export default App;
