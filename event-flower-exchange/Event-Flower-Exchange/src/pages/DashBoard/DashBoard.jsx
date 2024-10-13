import { Line, Pie } from '@ant-design/charts'
import { ArrowUpOutlined, BarChartOutlined } from '@ant-design/icons'
import { Card, Col, Layout, Row, Statistic, Typography } from 'antd'
import React from 'react'
import Widget from '../../components/Seller/Widget'

const { Content } = Layout
const { Title } = Typography

export default function DashBoard() {
  // Sample data for Line and Pie charts
  const lineData = [
    { month: 'Sep', value: 30 },
    { month: 'Oct', value: 50 },
    { month: 'Nov', value: 108 },
    { month: 'Dec', value: 80 },
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 95 }
  ]

  const pieData = [
    { type: 'Active Products', value: 9 },
    { type: 'Out of Stock', value: 2 },
    { type: 'Pending Approval', value: 3 }
  ]

  const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'value',
    height: 200,
    point: {
      size: 6,
      shape: 'circle',
      style: {
        fill: '#5B8FF9',
        stroke: '#5B8FF9',
        lineWidth: 2
      }
    },
    lineStyle: {
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    tooltip: {
      showMarkers: true,
      shared: true
    },
    area: {
      smooth: true
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red'
        }
      }
    }
  }

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    color: ['#5B8FF9', '#CDDDFD', '#FF9845'],
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}: {percentage}',
      style: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    height: 200
  }

  return (
    <Content>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Widget icon={<BarChartOutlined className='h-7 w-7' />} title={'Earnings'} subtitle={'$340.5'} />
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title='Earnings'
              value={500000}
              prefix='VND'
              valueStyle={{ color: '#3f8600', fontSize: '1.5rem' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Statistic title='Total Sales' value={7} valueStyle={{ color: '#000', fontSize: '1.5rem' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title='Pending Orders'
              value={5}
              valueStyle={{ color: '#3f8600', fontSize: '1.5rem' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title='Completed Orders'
              value={2}
              valueStyle={{ color: '#3f8600', fontSize: '1.5rem' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Title level={5} style={{ fontWeight: 'bold', color: '#4B4B4B' }}>
              Total Spent
            </Title>
            <Statistic
              value={37500}
              prefix='$'
              valueStyle={{ color: '#3f8600', fontSize: '1.5rem' }}
              suffix={<ArrowUpOutlined />}
              style={{ marginBottom: '10px' }}
            />
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={10}>
          <Card size='small' style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Title level={5} style={{ fontWeight: 'bold', color: '#4B4B4B' }}>
              Product List
            </Title>
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </Content>
  )
}
