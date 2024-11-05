import { BarChartOutlined, HeartFilled, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Image,
  Input,
  Row,
  Table,
  Tabs,
  Tooltip,
  Typography,
  Upload
} from 'antd'
import { useState } from 'react'
import SungJinWoo from '../../assets/images/profile_image.jpg'
import { eventData } from '../../mock/eventData.js'
import { productData } from '../../mock/productData'

const { TextArea } = Input
const { Title, Text } = Typography

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

  // State để lưu sản phẩm và sự kiện được chọn
  const [activeProducts, setActiveProducts] = useState([])
  const [activeEvents, setActiveEvents] = useState([])

  // Lấy dữ liệu sản phẩm và sự kiện bằng useQuery
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => Promise.resolve(productData)
  })

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => Promise.resolve(eventData)
  })

  // Lọc sản phẩm và sự kiện được chọn
  const activeProductList = products?.filter((item) => activeProducts.includes(item.id))
  const activeEventList = events?.filter((item) => activeEvents.includes(item.id))

  // Hàm xử lý khi thay đổi checkbox của sản phẩm
  const handleProductCheck = (checked, id) => {
    setActiveProducts((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  // Hàm xử lý khi thay đổi checkbox của sự kiện
  const handleEventCheck = (checked, id) => {
    setActiveEvents((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  // Columns cho bảng sản phẩm
  const productColumns = [
    {
      title: 'Product Name',
      dataIndex: 'FlowerName',
      key: 'FlowerName'
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (price) => `$${price}`
    },
    {
      title: 'Select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={activeProducts.includes(record.id)}
          onChange={(e) => handleProductCheck(e.target.checked, record.id)}
        />
      )
    }
  ]

  // Columns cho bảng sự kiện
  const eventColumns = [
    {
      title: 'Event Name',
      dataIndex: 'title',
      key: 'EventName'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description'
    },
    {
      title: 'Select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={activeEvents.includes(record.id)}
          onChange={(e) => handleEventCheck(e.target.checked, record.id)}
        />
      )
    }
  ]

  // Cấu hình items cho Tabs với nội dung
  const items = [
    {
      key: '1',
      label: 'Shop Info',
      children: (
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
            <Button icon={<UploadOutlined className='text-sm' />} type='dashed' style={{ width: '80%' }}>
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
      )
    },
    {
      key: '2',
      label: 'Products',
      children: (
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
          <Table dataSource={products} columns={productColumns} rowKey='id' pagination={{ pageSize: 5 }} />
        </Card>
      )
    },
    {
      key: '3',
      label: 'Events',
      children: (
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
          <Table dataSource={events} columns={eventColumns} rowKey='id' pagination={{ pageSize: 5 }} />
        </Card>
      )
    }
  ]
  const categoryItems = [
    {
      key: '1',
      label: 'All'
    },
    {
      key: '2',
      label: 'Roses'
    },
    {
      key: '3',
      label: 'Lilies'
    },
    {
      key: '4',
      label: 'Tulips'
    },
    {
      key: '5',
      label: 'Orchids'
    },
    {
      key: '6',
      label: 'Carnations'
    },
    {
      key: '7',
      label: 'More'
    }
  ]

  return (
    <Row gutter={12}>
      {/* Left side content */}
      <Col span={16}>
        <Row gutter={24}>
          <Col span={12}>
            <Card className='bg-white rounded-lg shadow-md h-full flex flex-col justify-center'>
              <div>
                <Row justify={'center'}>
                  <Image
                    preview={false}
                    src={shopInfo.logo}
                    width={100}
                    alt='Shop Logo'
                    className='rounded-full aspect-square shadow-sm border border-gray-200'
                  />
                </Row>
                <Row gutter={24} justify={'center'} className='mt-4'>
                  <Col span={8} className='text-left'>
                    <div className='text-base font-semibold text-gray-800 font-beausite leading-tight'>Frank Ocean</div>
                    <div className='text-xs text-gray-500 font-beausite leading-none'>Shopname</div>
                  </Col>
                  <Col span={8} className='flex items-center justify-center'>
                    <Button type='link' icon={<BarChartOutlined />} className='text-gray-700'>
                      <span className='ml-1 text-xs'>Chat</span>
                    </Button>
                  </Col>
                </Row>
              </div>

              <Row gutter={16} className='mt-5'>
                <Col span={8}>
                  <Card bordered={false} className='shadow-sm hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs font-medium text-gray-600'>Reviews</span>
                      <span className='text-lg font-semibold text-gray-800'>23</span>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card bordered={false} className='shadow-sm hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs font-medium text-gray-600'>Products</span>
                      <span className='text-lg font-semibold text-gray-800'>23</span>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card bordered={false} className='shadow-sm hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs font-medium text-gray-600'>Created</span>
                      <span className='text-lg font-semibold text-gray-800'>2022</span>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card className='h-full bg-white rounded-lg shadow-md'>
              <Carousel
                arrows
                autoplay
                autoplaySpeed={2000}
                adaptiveHeight
                draggable
                fade
                infinite
                dots
                easing
                effect='fade'
              >
                {products &&
                  products.map((product) => (
                    <Image
                      height={260}
                      width='100%'
                      className='object-cover'
                      src={product.productUrl}
                      key={product.CateId}
                      preview={false}
                      style={{ borderRadius: '8px' }}
                    />
                  ))}
              </Carousel>
            </Card>
          </Col>
        </Row>

        <Card className=' bg-white rounded-lg shadow-md mt-6'>
          <Tabs
            defaultActiveKey='1'
            items={categoryItems}
            centered
            tabBarGutter={55}
            animated={{ inkBar: true }}
            tabBarStyle={{ color: '#ff6d7e' }}
          />
          <Row gutter={8}>
            {activeProductList && activeProductList.length > 0 ? (
              activeProductList.map((product) => (
                <Col span={8} key={product.CateId}>
                  <div className='bg-white rounded-xl shadow-lg p-3 font-beausite mt-4 h-[450px]'>
                    <div className='p-4'>
                      <div className='relative'>
                        <div className='flex justify-between w-20 align-middle absolute top-3 left-3'>
                          <div className='px-4 py-1 bg-primary-600 z-10 rounded-3xl font-extrabold text-sm text-white'>
                            SALE
                          </div>
                          <div className='px-4 py-1 pl-10 text-[11px] rounded-3xl font-extrabold bg-white -translate-x-5'>
                            1D:08:32:59
                          </div>
                        </div>
                        <div className='absolute top-2 right-3 bg-white rounded-full w-8 aspect-square flex items-center justify-center'>
                          <HeartFilled />
                        </div>
                        <div className=''>
                          <img
                            className='absolute border-gray-400 -bottom-3 right-6 rounded-full object-cover w-10 aspect-square'
                            src={SungJinWoo}
                            alt=''
                          />
                        </div>
                        <div>
                          <img
                            className='object-cover w-full aspect-square rounded-xl'
                            src={product.productUrl}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='flex justify-start mt-4 '>
                        <div className='py-1 text-sm px-6 text-white bg-primary-800 rounded-2xl'>FRESH</div>
                        <div className='ml-2 text-sm py-1 px-6 text-white bg-primary-500 rounded-2xl'>WEDDING</div>
                      </div>
                      <div className='mt-4 text-2xl font-extrabold line-clamp-1'>
                        <Tooltip
                          title={'Ant Design, a design language for background applications, is refined by Ant UED Team.'.repeat(
                            5
                          )}
                        >
                          {'Ant Design, a design language for background applications, is refined by Ant UED Team.'.repeat(
                            5
                          )}
                        </Tooltip>
                      </div>
                      <div className='flex space-x-2'>
                        <div>5 star</div>
                        <div>(100)</div>
                      </div>
                      <div className='flex my-4 justify-between items-center'>
                        <div className='flex items-center'>
                          <div className='text-[30px] font-extrabold'>50.00$</div>
                          <div className='line-through italic text-gray-400 ml-2 text-base'>50.00$</div>
                        </div>
                        <div className='bg-text1 flex justify-center items-center w-10 aspect-square rounded-full'>
                          <ShoppingCartOutlined className='text-xl text-white' />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Text>No selected products</Text>
            )}
          </Row>
        </Card>

        <Title level={3} className='bg-white mt-6 p-6 shadow-lg rounded-md font-extrabold'>
          EVENT
        </Title>
        <Card className=' bg-white rounded-lg shadow-md mt-6'>
          {activeEventList && activeEventList.length > 0 ? (
            activeEventList.map((event) => (
              <Row key={event.eventID} wrap>
                <Col span={24} key={event.eventID}>
                  <div className='bg-white rounded-xl shadow-md mt-6 p-6 font-beausite'>
                    <div className='relative'>
                      <div>
                        <img
                          className='object-cover w-full h-64 aspect-square rounded-xl'
                          src={event.imageUrl}
                          alt=''
                        />
                      </div>
                      <div className='flex justify-center absolute bottom-3 left-3'>
                        <div className='px-3 py-2 bg-white z-10 rounded-s-xl flex flex-col items-center'>
                          <div className='text-[12px]'>Address</div>
                          <div className='font-extrabold text-[10px]'>12A Thu Duc</div>
                        </div>
                        <div className='px-3 py-2 bg-white z-10 flex flex-col items-center'>
                          <div className='text-[12px]'>From</div>
                          <div className='font-extrabold text-[10px]'>28 May 2003</div>
                        </div>
                        <div className='px-3 py-2 bg-white z-10 rounded-e-xl flex flex-col items-center'>
                          <div className='text-[12px]'>To</div>
                          <div className='font-extrabold text-[10px]'>28 May 2003</div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='flex justify-start mt-4 '>
                          <div className='py-1 text-[8px] px-3 text-white bg-primary-800 rounded-2xl'>FRESH</div>
                          <div className='ml-2 text-[8px] py-1 px-3 text-white bg-primary-500 rounded-2xl'>WEDDING</div>
                        </div>
                        <div className='line-clamp-1 text-2xl font-extrabold'>{event.title}</div>
                        <div className='line-clamp-2 text-[12px]'>{event.description}</div>
                      </div>
                      <div>
                        <img className='object-cover w-14 aspect-square rounded-full' src={SungJinWoo} alt='' />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <Text>No selected events</Text>
          )}
        </Card>
      </Col>

      {/* Right side content */}
      <Col span={8}>
        <Tabs defaultActiveKey='1' items={items} />
      </Col>
    </Row>
  )
}
