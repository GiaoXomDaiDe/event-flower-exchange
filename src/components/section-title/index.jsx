import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../product-card/index.jsx'
import './index.scss'

// eslint-disable-next-line react/prop-types
function SectionTitle({ title, searchResult = [] }) {
  const navigate = useNavigate()
  //Props: giống 1 tham số
  return (
    <div className='section-title'>
      <div className='layer1'>
        <div className='heading'>
          <h2>{title}</h2>
        </div>
        <div className='section-title_content'>
          {searchResult?.map((flower, index) => (
            <ProductCard key={index} flower={flower} />
          ))}
        </div>
      </div>

      <div className='layer2'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultColor: '#879e82',
                fontWeight: 600,
                defaultHoverColor: '#879e82',
                defaultHoverBorderColor: '#879e82',
                contentFontSize: '16px'
              }
            }
          }}
        >
          <Button
            onClick={() => {
              navigate('/search')
            }}
          >
            Show more
          </Button>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default SectionTitle
