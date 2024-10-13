import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import DBCard from '../DBCard/DBCard.jsx'

const { Title, Text } = Typography

export default function Widget({ icon, title, subtitle }) {
  return (
    <DBCard>
      <Row gutter={[16, 16]} align='middle'>
        <Col span={6}>
          <div
            className='w-16 h-16 flex justify-center items-center rounded-full bg-primary-50 border-sky-950'
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            {icon}
          </div>
        </Col>

        <Col span={12}>
          <Text style={{ font: 'beausite', color: '#4B5563', fontSize: '16px', fontWeight: '300' }}>{title}</Text>
          <Title level={2} style={{ font: 'beausite', margin: 0, color: '#4B5563', fontWeight: 'bold' }}>
            {subtitle}
          </Title>
        </Col>

        <Col span={6} className='text-center'>
          {true ? (
            <CaretUpOutlined style={{ fontWeight: 'bolder', fontSize: '30px', color: '#74a892' }} />
          ) : (
            <CaretDownOutlined style={{ fontWeight: 'bolder', fontSize: '30px', color: '#d74a49' }} />
          )}
        </Col>
      </Row>
    </DBCard>
  )
}

Widget.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string
}
