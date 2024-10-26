import React from 'react'
import './index.scss'
import Benefits from '../../component/benefits'
import SectionTitle from '../../component/section-title'
import ProductCard from '../../component/card'

function Home() {
  return (
    <div className='home'>
      <img
        src='https://flowershop.com.vn/wp-content/uploads/2023/08/Pink-Abstract-Watercolor-Flower-Wedding-Banner-3-scaled.jpg'
        alt=''
      />

      <Benefits />

      <SectionTitle title='HOA 20/10'>
        <div className='product-list'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </SectionTitle>

      <SectionTitle title='HOA 20/10'>
        <div className='product-list'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </SectionTitle>

      <SectionTitle title='HOA 20/10'>
        <div className='product-list'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </SectionTitle>
    </div>
  )
}

export default Home
