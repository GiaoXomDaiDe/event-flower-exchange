import React, { useEffect, useState } from 'react'
import './index.css'
import { Pagination, Select } from 'antd'
import ProductCard from '../../components/product-card'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { getProductList, getProductListByEvent } from '../../services/productService'

function SearchEvents() {
  const location = useLocation()
  const searchValue = location.state?.search || ''

  const [flowers, setFlowers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortDesc, setSortDesc] = useState(false)
  const pageSize = 20
  const [sortBy, setSortBy] = useState('FlowerName')
  const [events, setEvents] = useState(location.state?.eventValue || '')

  const showTotal = (total) => `Total ${total} items`

  const fetchProductListByEvent = async () => {
    const response = await getProductListByEvent(currentPage, pageSize, searchValue, sortDesc, sortBy, events)
    setFlowers(response)
  }

  useEffect(() => {
    fetchProductListByEvent()
  }, [currentPage, searchValue, sortDesc, sortBy, events])

  const handleCurrentPage = (pageNo) => {
    setCurrentPage(pageNo)
    console.log(pageNo)
  }

  return (
    <div>
      <div className='search'>
        <div className='search_product'>
          <div className='search_header'>
            <h4>Search results</h4>
            <div>
              <span>Sort by: </span>

              <Select
                defaultValue={events}
                style={{ width: '100px' }}
                onChange={(value) => {
                  setEvents(value)
                }}
              >
                <Select.Option value={''}>All</Select.Option>
                <Select.Option value={'Bright colors'}>Wedding</Select.Option>
                <Select.Option value={'Fragrant'}>Funeral</Select.Option>
                <Select.Option value={'Low Maintenance'}>Seasonal</Select.Option>
              </Select>
              <Select
                defaultValue={'FlowerName'}
                style={{ width: '13  0px' }}
                onChange={(value) => {
                  setSortBy(value)
                }}
              >
                <Select.Option value={'FlowerName'}>Flower Name</Select.Option>
                <Select.Option value={'price'}>Price</Select.Option>
              </Select>
              <Select
                defaultValue={false}
                onChange={(value) => {
                  setSortDesc(value)
                }}
              >
                <Select.Option value={false}>Asc</Select.Option>
                <Select.Option value={true}>Desc</Select.Option>
              </Select>
            </div>
          </div>
          <div className='search_content'>
            {flowers?.map((flower, index) => (
              <ProductCard key={index} flower={flower} />
            ))}

            <div className='pageNo'>
              <Pagination
                size='small'
                current={currentPage}
                onChange={(page) => handleCurrentPage(page)}
                total={flowers.length}
                showTotal={showTotal}
                showQuickJumper
                defaultPageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchEvents
