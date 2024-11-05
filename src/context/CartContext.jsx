import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const getCart = async () => {
    const response = await axios.get(
      `https://localhost:7026/api/account/list-cart-items`,
      {
        params: {
          accessToken: token,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCartItems(response.data);
    // console.log(response.data);
  };

  const removeFromCart = async (cartItemId) => {
    const response = await axios.delete(
      `https://localhost:7026/api/account/delete-cart-item`,
      {
        params: {
          cartItemId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // setCartItems()
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, getCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
