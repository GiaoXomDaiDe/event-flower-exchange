import React, { useEffect, useState } from 'react'
import buyerApi from '../../apis/buyer.api.js'
import Benefits from '../../components/benefits/index.jsx'
import EventCate from '../../components/event-cate/index.jsx'
import SectionTitle from '../../components/section-title/index.jsx'
import './index.scss'

function Home() {
  const [searchResult, setSearchResult] = useState([])

  const fetchFlower = async () => {
    const response = await buyerApi.getListFlower({
      pageIndex: 1,
      pageSize: 4,
      sortBy: 'FlowerName',
      sortDesc: true,
      search: 'Espoir1'
    })
    setSearchResult(response.data.data)
  }

  useEffect(() => {
    fetchFlower()
  }, [])

  return (
    <div className='home'>
      <img
        src='https://flowershop.com.vn/wp-content/uploads/2023/08/Pink-Abstract-Watercolor-Flower-Wedding-Banner-3-scaled.jpg'
        alt=''
      />

      <div className='onScreenBenefits'>
        <Benefits />
      </div>

      <div className='home-title'>
        <EventCate />
      </div>
      <div className='home-title'>
        <SectionTitle title='SPECIAL OFFERS' searchResult={searchResult} />
      </div>
      <div className='home-title'>
        <SectionTitle title='OUR PRODUCT' searchResult={searchResult} />
      </div>
    </div>
  )
}

export default Home
