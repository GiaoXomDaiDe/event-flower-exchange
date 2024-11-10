import { UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Tabs, Typography, Upload } from 'antd'
import { useState } from 'react'
import SungJinWoo from '../../assets/images/profile_image.jpg'

const { TextArea } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs

export default function ShopManagement() {
  const [shopInfo, setShopInfo] = useState({
    name: 'My Awesome Shop',
    logo: SungJinWoo,
    description: 'This is the best shop for all your flower needs.'
  })

  const [tempInfo, setTempInfo] = useState(shopInfo)

  const handleUpdate = () => {
    setShopInfo(tempInfo)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTempInfo({ ...tempInfo, [name]: value })
  }

  return (
    <Row gutter={24}>
      <Col span={16}></Col>

      <Col span={8}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Shop Info' key='1'>
            <Card
              title='Shop Info'
              bordered={false}
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                background: '#fff',
                padding: '24px'
              }}
            >
              <Input
                name='name'
                addonBefore='Shop Name'
                value={tempInfo.name}
                onChange={handleInputChange}
                style={{ marginBottom: '16px', borderRadius: '8px' }}
              />
              <Upload
                listType='picture-card'
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader()
                  reader.onload = (e) => setTempInfo({ ...tempInfo, logo: e.target.result })
                  reader.readAsDataURL(file)
                  return false
                }}
              >
                <img
                  src={tempInfo.logo}
                  alt='Shop Logo'
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '8px'
                  }}
                />
                <Button icon={<UploadOutlined />} type='dashed' style={{ width: '100%' }}>
                  Change Logo
                </Button>
              </Upload>
              <TextArea
                name='description'
                rows={4}
                placeholder='Shop Description'
                value={tempInfo.description}
                onChange={handleInputChange}
                style={{ marginTop: '16px', borderRadius: '8px' }}
              />
              <Button
                type='primary'
                block
                onClick={handleUpdate}
                style={{
                  marginTop: '16px',
                  backgroundColor: '#ff6d7e',
                  borderRadius: '8px'
                }}
              >
                Update
              </Button>
            </Card>
          </TabPane>

          {/* Product Management Tab */}
          <TabPane tab='Products' key='2'>
            <Card
              title='Manage Products'
              bordered={false}
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                background: '#fff',
                padding: '24px'
              }}
            >
              <p>Product data from Product Management will be displayed here.</p>
              {/* You can render product list or add product management components here */}
            </Card>
          </TabPane>

          {/* Event Management Tab */}
          <TabPane tab='Events' key='3'>
            <Card
              title='Manage Events'
              bordered={false}
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                background: '#fff',
                padding: '24px'
              }}
            >
              <p>Event data from Post Management will be displayed here.</p>
              {/* You can render event list or add event management components here */}
            </Card>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}
