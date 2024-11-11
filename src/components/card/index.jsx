import React from 'react'
import './index.scss'

function ProductCard() {
  return (
    <div className='product-card'>
      <img
        src='https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_500/https://flowershop.com.vn/wp-content/uploads/2023/11/hb-123-500x667.jpg'
        alt=''
      />

      <span>HB123</span>
      <p>1.250.000VNĐ</p>

      <button>Thêm vào giỏ hàng</button>
    </div>
  )
}

export default ProductCard
