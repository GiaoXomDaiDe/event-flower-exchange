import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { getCartList } from '../services/cartService'

const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, "context");

  const [cartItems, setCartItems] = useState([])

  const fetchAddCart = async (quantity) => {
    const addCartForm = new FormData()
    addCartForm.append('accessToken', token)
    addCartForm.append('FlowerID', flowerId)
    addCartForm.append('Quantity', quantity)

    const response = await axios.post('https://localhost:7026/api/account/add-to-cart', addCartForm, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.statusCode === 201) {
      getCart()
      toast.success('Your flower is added !', {
        position: 'top-right',
        autoClose: 1500
      })
    } else {
      toast.error('Add flower failed !', {
        position: 'top-right'
      })
    }
  }

  const getCart = async () => {
    const response = await getCartList(JSON.parse(localStorage.getItem('token')))

    console.log(response, 'cart')

    setCartItems(response)
  }

  const removeFromCart = async (cartItemId) => {
    const response = await axios.delete(`https://localhost:7026/api/account/delete-cart-item`, {
      params: {
        cartItemId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // setCartItems()
  }

  // useEffect(() => {
  //   getCart();
  // }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, getCart, fetchAddCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
