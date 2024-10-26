import React, { useEffect, useState } from 'react'
import './index.scss'
import { Checkbox, Divider, Pagination, Select } from 'antd'
import ProductCard from '../../component/product-card'
import axios from 'axios'
import api from '../../config/axios'

function SearchPage() {
  const [flowers, setFlowers] = useState([])
  const CheckboxGroup = Checkbox.Group
  const plainOptions = ['Apple', 'Pear', 'Orange']
  const defaultCheckedList = []
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const checkAll = plainOptions.length === checkedList.length
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length
   const showTotal = (total) => `Total ${total} items`
  const onChange = (list) => {
    setCheckedList(list)
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : [])
  }

  const fetchFlower = async () => {
    const response = await api.get('flower/list-flowers?pageIndex=1&pageSize=200&sortBy=FlowerName')

    setFlowers(response.data.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchFlower()
  }, [])


  const pagination = (productList, currentPage, productsPerPage) => {
    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage
    const currentProducts = productList.slice(firstIndex, lastIndex)

    return (
      <div className='product-list'>
        {currentProducts.map((flower) => (
          <ProductCard flower={flower} />
        ))}
      </div>
    )
  }

  // const pagination = (productList, currentPage) => {
  //   return <div></div>
  // }

  return (
    <div>
      <div className='search'>
        <div className='search_option'>
          <div>
            <Dropdown title='Category'>
              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
              </Checkbox>
              <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </Dropdown>
          </div>
        </div>
        <div className='search_product'>
          <div className='search_header'>
            <h4>Search results</h4>
            <div>
              <span>Sort by: </span>
              <Select defaultValue='price-asc'>
                <Select.Option value='price-asc'>Price (Lowest to hightest)</Select.Option>
                <Select.Option value='price-desc'>Price (Highest to lowest)</Select.Option>
                <Select.Option value='rat-asc'>Rating (Lowest to hightest)</Select.Option>
                <Select.Option value='rat-desc'>Rating (Hightest to Lowest)</Select.Option>
              </Select>
            </div>
          </div>
          <div className='search_content'>
            {flowers.map((flower) => (
              <ProductCard flower={flower} />
            ))}

            <div className='pageNo'>
              <Pagination size='small' total={200} showTotal={showTotal} showSizeChanger showQuickJumper />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dropdown = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default SearchPage
