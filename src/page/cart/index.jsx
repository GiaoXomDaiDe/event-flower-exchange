import React, { useEffect, useState } from 'react'
import './index.scss'
import { Avatar } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity } from '../../redux/features/cartSlice'

function Cart() {
  const navigate = useNavigate()

  const cart = useSelector((store) => store.cart)
  const [newCart, setNewCart] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (cart) {
      let totalTemp = 0
      const result = {}
      for (let item of cart) {
        totalTemp += item.price * item.quantity

        if (result[item.accountId]) {
          result[item.accountId].items = [...result[item.accountId].items, item]
        } else {
          result[item.accountId] = { id: item.accountId, items: [item] }
        }
      }

      setNewCart(result)
      setTotal(totalTemp)
    }
  }, [cart])

  return (
    <div className='cart-wrapper'>
      <div className='cart'>
        <div className='cart_header'>
          <h3>Cart</h3>

          <span> {cart.length} items in your Cart</span>
        </div>
        {newCart &&
          Object.keys(newCart).map((key, index) => {
            return <CartItem data={newCart[key]} />
          })}

        <div className='total'>
          <div>
            <h3>Total</h3>
            <h3>{total}</h3>
          </div>

          <button onClick={() => navigate('/checkout')}>Check Out</button>
        </div>
      </div>
    </div>
  )
}

const CartItem = ({ data }) => {
  const dispatch = useDispatch()

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id))
  }

  return (
    <div className='cart-item'>
      <div className='cart-item_heading'>
        <div className='shop-info'>
          <Avatar size={60} src='https://i.redd.it/sxb95sif7ys81.png' />
          <div>
            <h3>{data.id}</h3>
            <p>Title</p>
          </div>
        </div>

        <button>Select All </button>
      </div>
      <div className='cart-item_products'>
        {data.items.map((item) => {
          return (
            <div className='item'>
              <img src='https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110' alt='' />
              <h3>{item.flowerName}</h3>

              <p>
                {item.price}
                <del> {item.oldPrice}</del>
              </p>
              <button onClick={() => handleDecrease(item.flowerId)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => handleIncrease(item.flowerId)}>+</button>
              <p>{item.price * item.quantity}</p>

              <DeleteOutlined />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart
