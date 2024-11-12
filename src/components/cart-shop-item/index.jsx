import { DeleteOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const CartShopItem = ({ info, handleUpdateCart, handleDeleteCart }) => {
  const flower = info.flower
  const [quantity, setQuantity] = useState(info.quantity)

  useEffect(() => {
    setQuantity(info.quantity)
  }, [info.quantity])

  const onChangeQuantity = (e) => {
    const inputValue = Number(e.target.value)
    if (inputValue < 1) {
      setQuantity(1)
      return
    }
    console.log(inputValue, 'inputValue')

    let value = inputValue - info.quantity
    console.log(value, 'value')
    handleUpdateCart(info.flowerId, value)
  }

  return (
    <div className='item'>
      <img src='https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110' alt='' />
      <h3 className='cart-item_name'>{flower.flowerName}</h3>

      <p>
        ${flower.price}
        <del>${flower.oldPrice}</del>
      </p>
      <div className='quantity'>
        <button
          disabled={quantity === 1}
          onClick={() => {
            handleUpdateCart(info.flowerId, -1)
            setQuantity(quantity - 1)
          }}
        >
          --
        </button>
        <input
          type='number'
          inputMode='numeric'
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(e)
            // console.log(e);
          }}
        />
        <button
          onClick={() => {
            handleUpdateCart(info.flowerId, 1)
            setQuantity(quantity + 1)
          }}
        >
          +
        </button>
      </div>

      <span>${info.paidPrice}</span>

      <button
        onClick={() => {
          handleDeleteCart(info.orderDetailId)
        }}
      >
        <DeleteOutlined />
      </button>
    </div>
  )
}
export default CartShopItem
CartShopItem.propTypes = {
  info: PropTypes.shape({
    flower: PropTypes.shape({
      flowerName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      oldPrice: PropTypes.number
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    flowerId: PropTypes.number.isRequired,
    paidPrice: PropTypes.number.isRequired,
    orderDetailId: PropTypes.number.isRequired
  }).isRequired,
  handleUpdateCart: PropTypes.func.isRequired,
  handleDeleteCart: PropTypes.func.isRequired
}
