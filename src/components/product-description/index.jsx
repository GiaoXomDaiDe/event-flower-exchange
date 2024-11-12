import { Tabs } from 'antd'
import React from 'react'
import Description from '../description/index.jsx'
import Feedback from '../feedback/index.jsx'
import './index.scss'

const onChange = (key) => {
  console.log(key)
}

const items = [
  {
    key: '1',
    label: 'Description',
    children: <Description />
  },
  {
    key: '2',
    label: 'Feedback',
    children: <Feedback />
  }
]
const TabsProduct = () => {
  return (
    <div className='tabs-description'>
      <Tabs defaultActiveKey='1' centered items={items} onChange={onChange} />
    </div>
  )
}
export default TabsProduct
