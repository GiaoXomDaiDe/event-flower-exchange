import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  PlusOutlined,
  TableOutlined
} from '@ant-design/icons'
import { Button, Card, Col, Image, Input, Row, Segmented, Space, Switch, Table, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { productData } from '../../mock/productData'

const { Text, Paragraph } = Typography

const ProductManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAddNewProduct = location.pathname.endsWith('add-new-product')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  const [viewMode, setViewMode] = useState('table')

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleExport = () => {
    const dataToExport = productData.filter((item) => selectedRowKeys.includes(item.CateId))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'products.xlsx')
  }

  const handleDelete = () => {
    console.log('Deleted:', selectedRowKeys)
    setSelectedRowKeys([])
  }
  const handleEdit = (productId) => {
    navigate(`/seller/product-management/product-details/${productId}`)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'CateId',
      key: 'CateId',
      align: 'center',
      width: 80
    },
    {
      title: 'Image',
      dataIndex: 'productUrl',
      key: 'productUrl',
      align: 'center',
      width: 100,
      render: (key, image) => (
        <Image
          preview={false}
          key={key}
          src={image.productUrl}
          alt=''
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '20%' }}
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'FlowerName',
      key: 'FlowerName',
      ellipsis: true,
      // Giảm width của cột Name
      width: 200,
      render: (text) => (
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: false
          }}
          style={{ marginBottom: 0 }}
        >
          {text}
        </Paragraph>
      )
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      width: 120,
      render: (_, item) => (
        <div>
          <Text className='font-beausite font-bold text-base'>${item.Price}</Text>
          {item.OldPrice !== 0 && (
            <Text className='font-beausite italic line-through' type='secondary'>
              ${item.OldPrice}
            </Text>
          )}
        </div>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      align: 'center',
      width: 100,
      render: (quantity) =>
        quantity > 50 ? <Text type='success'>{quantity}</Text> : <Text type='danger'>Sold out</Text>
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Switch checkedChildren='Active' unCheckedChildren='Inactive' defaultChecked={record.status === 'Active'} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <Space size='middle'>
          <Tooltip title='Live Preview' placement='bottom'>
            <Button shape='circle' icon={<EyeOutlined />} size='large' variant='outlined' />
          </Tooltip>
          <Tooltip title='Edit' placement='bottom'>
            <Button
              onClick={() => {
                handleEdit(record.CateId)
              }}
              shape='circle'
              icon={<EditOutlined />}
              size='large'
              variant='solid'
            />
          </Tooltip>
          <Tooltip title='Delete' placement='bottom'>
            <Button shape='circle' icon={<DeleteOutlined />} size='large' danger />
          </Tooltip>
        </Space>
      )
    }
  ]

  const filteredData = productData.filter((item) => item.FlowerName.toLowerCase().includes(searchText.toLowerCase()))

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  return (
    <div>
      {!isAddNewProduct && (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Link to='add-new-product'>
                <Button type='primary' icon={<PlusOutlined />} size='middle'>
                  Add Product
                </Button>
              </Link>
              {selectedRowKeys.length > 0 && (
                <>
                  <Button icon={<DeleteOutlined />} size='middle' danger onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button type='default' icon={<ExportOutlined />} size='middle' onClick={handleExport}>
                    Export
                  </Button>
                </>
              )}
            </Space>
            <Space>
              <Segmented
                options={[
                  { label: 'Table View', value: 'table', icon: <TableOutlined /> },
                  { label: 'Grid View', value: 'grid', icon: <AppstoreOutlined /> }
                ]}
                value={viewMode}
                onChange={(value) => setViewMode(value)}
              />
              <Input.Search
                placeholder='Search by product name'
                onChange={handleSearch}
                style={{ width: 300 }}
                enterButton
                allowClear
              />
            </Space>
          </div>
          {viewMode === 'table' ? (
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 10 }}
              rowKey='CateId'
              rowSelection={rowSelection}
              scroll={{ x: 'max-content' }} // Thêm thuộc tính scroll
            />
          ) : (
            <Row gutter={[16, 16]}>
              {filteredData.map((item) => (
                <Col key={item.CateId} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Image alt={item.FlowerName} src={item.productUrl} style={{ height: 200, objectFit: 'cover' }} />
                    }
                    actions={[
                      <Tooltip title='Live Preview' key='view'>
                        <EyeOutlined />
                      </Tooltip>,
                      <Tooltip title='Edit' key='edit'>
                        <EditOutlined />
                      </Tooltip>,
                      <Tooltip title='Delete' key='delete'>
                        <DeleteOutlined />
                      </Tooltip>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                          {item.FlowerName}
                        </Paragraph>
                      }
                      description={
                        <div>
                          <Text className='font-beausite font-bold text-base'>${item.Price}</Text>
                          {item.OldPrice !== 0 && (
                            <Text className='font-beausite italic line-through' type='secondary'>
                              ${item.OldPrice}
                            </Text>
                          )}
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
      <Outlet />
    </div>
  )
}

export default ProductManagement
