import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import 'react-toastify/dist/ReactToastify.css'
import { useCart } from '../../contexts/CartContext.jsx'
import { addCart } from '../../services/cartService'
import './index1.css'

function ProductCard({ flower }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const [isFavor, setIsFavor] = useState(false)
  const { getCart } = useCart()

  const fetchAddCart = async (quantity) => {
    await addCart(token, quantity, flower.flowerId)
    getCart()
  }

  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation()
      fetchAddCart(1)
    },
    [flower.flowerId, fetchAddCart]
  )

  const tags = []
  // flower.tagNames.split(",") || "";

  return (
    <div className='product-cards'>
      <Link style={{ textDecoration: 'none', color: '#222222' }} to={`/product/${flower.flowerId}`}>
        <div className='product-img'>
          <img src={`${flower.attachment}`} alt={flower.flowerName} />
          <Avatar size={50} className='avatar' src='https://i.redd.it/sxb95sif7ys81.png' />
        </div>

        <div className='tags'>
          {tags.map((tag, index) => (
            <span key={index} className='tag'>
              {tag}
            </span>
          ))}
        </div>

        <div className='info'>
          <span className='info_name'>{flower.flowerName}</span>
          <div>
            <Rating size={15} readonly initialValue={4} /> (100)
          </div>

          <div className='price'>
            <h4>${flower.price}</h4>
            <span className='price_old'>${flower.oldPrice}</span>
          </div>
        </div>
      </Link>

      <button
        className='favorite'
        onClick={() => setIsFavor(!isFavor)}
        style={{
          color: isFavor ? 'red' : '#9f9f9f'
        }}
      >
        <i className='fa fa-heart'></i>
      </button>

      <button className='add-cart-icon' onClick={handleAddToCart}>
        <i className='bi bi-plus-lg'></i>
      </button>
    </div>
  )
}
export default ProductCard
ProductCard.propTypes = {
  flower: PropTypes.shape({
    flowerId: PropTypes.string.isRequired,
    attachment: PropTypes.string.isRequired,
    flowerName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number
  }).isRequired
}
