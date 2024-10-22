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
import * as XLSX from 'xlsx'
import { productData } from '../../mock/productData'

const { Text, Paragraph } = Typography

const ProductManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  const [expanded, setExpanded] = useState(false)
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'CateId',
      key: 'CateId',
      align: 'center'
    },
    {
      title: 'Image',
      dataIndex: 'productUrl',
      key: 'productUrl',
      align: 'center',
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
      width: 400,
      render: (text) => (
        <Paragraph
          level={5}
          ellipsis={{ onExpand: (_, info) => setExpanded(info.expanded), expandable: 'collapsible', expanded }}
        >
          {text.repeat(20)}
        </Paragraph>
      )
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      align: 'center'
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (_, item) => (
        <div>
          <Text className='font-beausite font-bold text-base'>{item.Price}</Text>
          {item.OldPrice !== 0 && (
            <Text className='font-beausite italic line-through' type='secondary'>
              {item.OldPrice}
            </Text>
          )}
        </div>
      )
    },
    {
      title: 'Stock',
      dataIndex: 'Quantity',
      key: 'Stock',
      render: (quantity) =>
        quantity > 50 ? <Text type='success'>{quantity}</Text> : <Text type='danger'>Sold out</Text>,
      align: 'center'
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      render: (_, record) => (
        <Switch checkedChildren='Active' unCheckedChildren='Inactive' defaultChecked={record.status === 'Active'} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: () => (
        <Space size='middle'>
          <Tooltip title='Live Preview' placement='bottom'>
            <Button shape='circle' icon={<EyeOutlined />} size='large' variant='outlined' color='primary' />
          </Tooltip>
          <Tooltip title='Edit' placement='bottom'>
            <Button shape='circle' icon={<EditOutlined />} size='large' variant='solid' color='primary' />
          </Tooltip>
          <Tooltip title='Delete' placement='bottom'>
            <Button shape='circle' icon={<DeleteOutlined />} size='large' variant='solid' color='danger' />
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button type='primary' icon={<PlusOutlined />} size='middle'>
            Add Product
          </Button>
          {selectedRowKeys.length > 0 && (
            <>
              <Button icon={<DeleteOutlined />} size='middle' variant='solid' color='danger' onClick={handleDelete}>
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
                      <Text className='font-beausite font-bold text-base'>{item.Price}</Text>
                      {item.OldPrice !== 0 && (
                        <Text className='font-beausite italic line-through' type='secondary'>
                          {item.OldPrice}
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
    </div>
  )
}

export default ProductManagement
