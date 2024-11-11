import React from 'react'
import ProductCard from '../product-card/index.jsx'
import './index.css'

const SuggestProduct = () => {
  const productList = [1, 2, 3, 4, 5]
  return (
    <div className='suggest'>
      {productList.map((p) => {
        return <ProductCard key={p} />
      })}
    </div>
  )
}

export default SuggestProduct
