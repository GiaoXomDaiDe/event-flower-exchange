// DashBoard.jsx

import { SignalFilled, SwitcherOutlined } from '@ant-design/icons'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import {
  LineChartOptions,
  LineChartSeries,
  PieChartOptions,
  PieChartSeries
} from '../../components/Seller/DBChart/ChartConfig.jsx'
import DBChart from '../../components/Seller/DBChart/DBChart.jsx'
import Widget from '../../components/Seller/Widget'

const { Content } = Layout

export default function DashBoard() {
  return (
    <Content>
      <Row gutter={[20, 20]} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Widget
            icon={<SignalFilled className='text-primary-500 text-2xl' />}
            title={'Earnings'}
            subtitle={'$340.5'}
          />
        </Col>
        <Col span={6}>
          <Widget
            icon={<SwitcherOutlined className='text-primary-500 font-bolder text-2xl' />}
            title={'Total Sales'}
            subtitle={'$500.5'}
          />
        </Col>
        <Col span={6}>
          <Widget
            icon={<SwitcherOutlined className='text-primary-500 font-bolder text-2xl' />}
            title={'Pending Sales'}
            subtitle={'5'}
          />
        </Col>
        <Col span={6}>
          <Widget
            icon={<SwitcherOutlined className='text-primary-500 font-bolder text-2xl' />}
            title={'Completed Orders'}
            subtitle={'2'}
          />
        </Col>
      </Row>
      <Row gutter={[40, 40]}>
        <Col span={14}>
          <DBChart
            options={LineChartOptions}
            series={LineChartSeries}
            type='line'
            height={300}
            title='Sales Overview'
          />
        </Col>
        <Col span={10}>
          <DBChart options={PieChartOptions} series={PieChartSeries} type='pie' height={300} title='Product Status' />
        </Col>
      </Row>
    </Content>
  )
}
