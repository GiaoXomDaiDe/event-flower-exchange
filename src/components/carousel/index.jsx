import { Carousel } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './index.css'

const CarouselImage = ({ imageList }) => {
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }

  return (
    <div>
      <Carousel arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}
export default CarouselImage

CarouselImage.propTypes = {
  imageList: PropTypes.array.isRequired
}
