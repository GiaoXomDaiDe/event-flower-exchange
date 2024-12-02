// DBChart.jsx

import { Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import Chart from 'react-apexcharts'

import DBCard from '../DBCard/DBCard.jsx'

const { Title } = Typography

export default function DBChart({ options, series, type, height, title }) {
  return (
    <DBCard>
      <Title level={5} style={{ fontWeight: 'bold', color: '#4B4B4B' }}>
        {title}
      </Title>
      <Chart options={options} series={series} type={type} height={height} />
    </DBCard>
  )
}

DBChart.propTypes = {
  options: PropTypes.object,
  series: PropTypes.array,
  type: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string
}
