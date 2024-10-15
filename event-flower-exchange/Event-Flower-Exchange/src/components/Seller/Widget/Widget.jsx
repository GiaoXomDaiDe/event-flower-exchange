import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { LayoutContext } from '../../../contexts/layout.context.jsx'
import DBCard from '../DBCard/DBCard.jsx'

const { Title, Text } = Typography

export default function Widget({ icon, title, subtitle }) {
  const { collapsed } = useContext(LayoutContext)
  const fontSize = collapsed ? '12px' : '12px'
  const iconSize = collapsed ? '24px' : '28px'

  return (
    <DBCard>
      <Row gutter={24} align='middle'>
        <Col xs={24} sm={6}>
          <div
            className='flex justify-center items-center rounded-full bg-primary-50 border-sky-950'
            style={{
              width: collapsed ? '2.5rem' : '3rem',
              height: collapsed ? '2.5rem' : '3rem',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span
              style={{
                fontSize: iconSize
              }}
            >
              {icon}
            </span>
          </div>
        </Col>

        <Col xs={24} sm={12}>
          <Text
            style={{
              font: 'beausite',
              color: '#4B5563',
              fontSize: fontSize,
              fontWeight: '300'
            }}
          >
            {title}
          </Text>
          <Title
            level={2}
            style={{
              font: 'beausite',
              margin: 0,
              color: '#4B5563',
              fontWeight: 'bold',
              fontSize: `calc(${fontSize} + 4px)`
            }}
          >
            {subtitle}
          </Title>
        </Col>

        <Col xs={24} sm={6} className='text-center'>
          {true ? (
            <CaretUpOutlined
              style={{
                fontWeight: 'bolder',
                fontSize: `calc(${iconSize} + 4px)`,
                color: '#74a892'
              }}
            />
          ) : (
            <CaretDownOutlined
              style={{
                fontWeight: 'bolder',
                fontSize: `calc(${iconSize} + 4px)`,
                color: '#d74a49'
              }}
            />
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
