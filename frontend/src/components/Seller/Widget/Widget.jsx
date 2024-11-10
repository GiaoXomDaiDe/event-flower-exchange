import { FallOutlined, RiseOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import DBCard from '../DBCard/DBCard.jsx'

const { Title, Text } = Typography

export default function Widget({ icon, title, subtitle }) {
  return (
    <DBCard>
      <Row gutter={24} align='middle'>
        <Col sm={6}>
          <div className='flex shadow-p-md justify-center items-center rounded-full bg-primary-50 size-16'>{icon}</div>
        </Col>
        <Col sm={12} className='font-beausite'>
          <Text className='text-text2 font-semibold text-lg'>{title}</Text>
          <Title
            level={1}
            style={{
              color: '#4B5563',
              margin: 0,
              fontWeight: 'bold'
            }}
          >
            {subtitle}
          </Title>
        </Col>

        <Col sm={6} className='text-center'>
          {false ? (
            <RiseOutlined className=' text-3xl text-green-400' />
          ) : (
            <FallOutlined className=' text-3xl text-red-400' />
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
