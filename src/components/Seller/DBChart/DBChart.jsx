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
      <Title level={3} className='font-beausite m-4' style={{ fontWeight: 'bolder', color: '#4b5563' }}>
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
