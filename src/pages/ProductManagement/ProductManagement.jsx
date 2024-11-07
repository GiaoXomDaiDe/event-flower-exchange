import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  PlusOutlined,
  TableOutlined
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Input,
  Modal,
  Row,
  Segmented,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import productApi from '../../apis/product.api'
import sellerApi from '../../apis/seller.api'

const { Text, Paragraph } = Typography
const { confirm } = Modal
const ProductManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isAddNewProduct = location.pathname.endsWith('add-new-product')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  const [viewMode, setViewMode] = useState('table')
  const defaultPageSize = 10 // or any default value you prefer
  const gridPageSize = 1000 // set to a large number to fetch all products

  const pageSize = viewMode === 'grid' ? gridPageSize : defaultPageSize
  const [pageIndex, setPageIndex] = useState(1)
  const [sortBy, setSortBy] = useState('flowerId')
  const [sortDesc, setSortDesc] = useState(false)
  const [searchTerm, setSearchTerm] = useState('Espoir1')

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['sellerProducts', { pageIndex, pageSize, sortBy, sortDesc, search: searchTerm }],
    queryFn: () => {
      return sellerApi.getSellerProductList({ pageIndex, pageSize, sortBy, sortDesc, search: searchTerm })
    },
    keepPreviousData: true,
    enabled: !!viewMode
  })

  const changeStatusFlowerMutation = useMutation({
    mutationFn: (flowerId) => {
      console.log('mutationFn called with flowerId:', flowerId)
      return sellerApi.changeStatusFlower(flowerId)
    },
    onSuccess: (response) => {
      const { message } = response.data
      queryClient.invalidateQueries(['sellerProducts'])
      console.log('Mutation success:', message)
      toast.success(message || 'Change status successfully')
    },
    onError: (error) => {
      console.log('Mutation error:', error)
      const errorMessage = error.response?.data?.message || 'Change status failed'
      toast.error(errorMessage)
    }
  })
  const deleteFlowerMutation = useMutation({
    mutationFn: (idsToDelete) => {
      console.log(idsToDelete)
      const formData = new FormData()
      idsToDelete.forEach((id) => {
        console.log(id)
        formData.append('flowerIds', id)
        console.log('mutationFn called with flowerIds:', formData.getAll('flowerIds'))
      })
      console.log('mutationFn called with flowerIds:', formData.getAll('flowerIds'))
      return productApi.deleteFlower(formData)
    },
    onSuccess: (response) => {
      const { message } = response.data
      queryClient.invalidateQueries(['sellerProducts'])
      console.log('Mutation success:', response)
      toast.success(message || 'Xóa thành công')
      setSelectedRowKeys([]) // Xóa các lựa chọn sau khi xóa thành công
    },
    onError: (error) => {
      console.log('Mutation error:', error)
      const errorMessage = error.response?.data?.message || 'Xóa thất bại'
      toast.error(errorMessage)
    }
  })

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleExport = () => {
    const dataToExport = queryData?.data.data.filter((item) => selectedRowKeys.includes(item.CateId))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'products.xlsx')
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setPageIndex(pagination.current)
    setSortBy(sorter.field || 'flowerId')
    setSortDesc(sorter.order === 'descend')
  }

  const handleDelete = (productIds) => {
    const idsToDelete = Array.isArray(productIds) ? productIds : [productIds]

    console.log(idsToDelete)

    confirm({
      title: `Bạn có chắc chắn muốn xóa ${idsToDelete.length > 1 ? 'những sản phẩm này' : 'sản phẩm này'}?`,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteFlowerMutation.mutate(idsToDelete)
      },
      onCancel() {
        console.log('Hủy xóa')
      }
    })
  }
  const handleEdit = (productId) => {
    console.log(productId)
    navigate(`/seller/product-management/update-product/${productId}`)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'flowerId',
      key: 'flowerId',
      align: 'center',
      width: 80,
      render: (flowerId) => (
        <Text strong style={{ fontSize: '0.7rem', color: '#595959' }}>
          {flowerId}
        </Text>
      ),
      sorter: (a, b) => a.flowerId - b.flowerId
    },
    {
      title: 'Image',
      dataIndex: 'attachment',
      key: 'attachment',
      align: 'center',
      width: 80,
      render: (_, record) => {
        const images = record.attachment ? record.attachment.split(',') : []
        const firstImage = images[0]
        const remainingCount = images.length - 1

        return firstImage ? (
          <Image.PreviewGroup items={images}>
            <Image
              style={{ cursor: 'pointer', borderRadius: 16 }}
              width={100}
              height={100}
              src={firstImage}
              preview={{
                mask: (
                  <div style={{ color: 'white' }}>
                    {remainingCount > 0 ? (
                      `+${remainingCount}`
                    ) : (
                      <>
                        <EyeOutlined /> Preview
                      </>
                    )}
                  </div>
                )
              }}
            />
          </Image.PreviewGroup>
        ) : (
          <Image
            width={200}
            height={200}
            src='error'
            fallback='data:image/png;base64,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'
          />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'flowerName',
      key: 'flowerName',
      ellipsis: true,
      width: 250,
      render: (text, record) => (
        <div>
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: false
            }}
            style={{ marginBottom: 4, fontWeight: 500, fontSize: '0.875rem', color: '#434343' }}
          >
            {text}
          </Paragraph>
          <div style={{ display: 'flex', gap: 8 }}>
            <Tag color='blue' style={{ fontSize: '0.75rem' }}>{`Size: ${record.size}`}</Tag>
            <Tag color={record.condition === 'Fresh' ? 'green' : 'orange'} style={{ fontSize: '0.75rem' }}>
              {record.condition}
            </Tag>
          </div>
        </div>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      width: 120,
      render: (category) => <Text style={{ fontSize: '0.875rem', color: '#8c8c8c' }}>{category}</Text>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      width: 120,
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: '0.875rem', color: '#3f8600' }}>
            ${record.price.toFixed(2)}
          </Text>
          {record.oldPrice && (
            <Text type='secondary' delete style={{ fontSize: '0.75rem', marginLeft: 8 }}>
              ${record.oldPrice.toFixed(2)}
            </Text>
          )}
        </div>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100,
      render: (quantity) =>
        quantity > 50 ? (
          <Text type='success' style={{ fontSize: '0.875rem' }}>
            {quantity}
          </Text>
        ) : (
          <Text type='danger' style={{ fontSize: '0.875rem' }}>
            Low Stock
          </Text>
        )
    },
    {
      title: 'Expiration Date',
      dataIndex: 'dateExpiration',
      key: 'dateExpiration',
      align: 'center',
      width: 120,
      render: (date) => <Text style={{ fontSize: '0.875rem', color: '#8c8c8c' }}>{date}</Text>
    },
    {
      title: 'Tags',
      dataIndex: 'tagNames',
      key: 'tagNames',
      width: 120,
      render: (tags) => <Text style={{ fontSize: '0.875rem', color: '#8c8c8c' }}>{tags}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Switch
          checkedChildren='Active'
          unCheckedChildren='Inactive'
          checked={record.status === 1}
          onChange={() => {
            changeStatusFlowerMutation.mutate(record.flowerId)
          }}
          loading={changeStatusFlowerMutation.isPending && changeStatusFlowerMutation.variables === record.flowerId}
        />
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
              onClick={() => handleEdit(record.flowerId)}
              shape='circle'
              icon={<EditOutlined />}
              size='large'
              variant='solid'
            />
          </Tooltip>
          <Tooltip title='Delete' placement='bottom'>
            <Button
              onClick={() => handleDelete(record.flowerId)}
              shape='circle'
              icon={<DeleteOutlined />}
              size='large'
              danger
            />
          </Tooltip>
        </Space>
      )
    }
  ]

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
                  <Button
                    icon={<DeleteOutlined />}
                    size='middle'
                    danger
                    onClick={() => {
                      console.log(selectedRowKeys)
                      handleDelete(selectedRowKeys)
                    }}
                  >
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
              dataSource={Array.isArray(queryData?.data.data) ? queryData?.data.data : []}
              pagination={{
                current: pageIndex,
                pageSize,
                total: queryData?.data.totalCount
              }}
              rowKey='flowerId'
              rowSelection={rowSelection}
              loading={isLoading}
              onChange={handleTableChange}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {queryData?.data.data.map((item) => {
                const images = item.attachment ? item.attachment.split(',') : []
                return (
                  <Col key={item.flowerId} xs={24} sm={12} md={8}>
                    <Card
                      className='h-[700px]'
                      hoverable
                      cover={
                        images.length > 1 ? (
                          <Carousel arrows lazyLoad='progressive' draggable>
                            {images.map((img, index) => (
                              <Image
                                key={index}
                                alt={`${item.flowerName} ${index + 1}`}
                                src={img}
                                height={400}
                                width='100%'
                                style={{ objectFit: 'cover' }}
                                preview={false}
                              />
                            ))}
                          </Carousel>
                        ) : (
                          <Image
                            alt={item.flowerName}
                            src={images[0]}
                            height={400}
                            width='100%'
                            style={{ objectFit: 'cover' }}
                            preview={false}
                          />
                        )
                      }
                      actions={[
                        <Tooltip title='Live Preview' key='view'>
                          <EyeOutlined />
                        </Tooltip>,
                        <Tooltip title='Edit' key='edit'>
                          <EditOutlined onClick={() => handleEdit(item.flowerId)} />
                        </Tooltip>,
                        <Tooltip title='Delete' key='delete'>
                          <DeleteOutlined />
                        </Tooltip>
                      ]}
                    >
                      <Card.Meta
                        title={
                          <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                            {item.flowerName}
                          </Paragraph>
                        }
                        description={
                          <div>
                            {/* Price */}
                            <div>
                              <Text strong style={{ fontSize: '0.875rem', color: '#3f8600' }}>
                                ${item.price.toFixed(2)}
                              </Text>
                              {item.oldPrice && (
                                <Text type='secondary' delete style={{ fontSize: '0.75rem', marginLeft: 8 }}>
                                  ${item.oldPrice.toFixed(2)}
                                </Text>
                              )}
                            </div>
                            {/* Description */}
                            {item.description && (
                              <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: 8, color: '#8c8c8c' }}>
                                {item.description}
                              </Paragraph>
                            )}
                            {/* Size and Condition */}
                            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                              <Tag color='blue'>{`Size: ${item.size}`}</Tag>
                              <Tag color={item.condition === 'Fresh' ? 'green' : 'orange'}>{item.condition}</Tag>
                            </div>
                            {/* Tags */}
                            {item.tagNames && (
                              <div style={{ marginTop: 8 }}>
                                {item.tagNames.split(',').map((tag, index) => (
                                  <Tag color='geekblue' key={index}>
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                            )}
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                )
              })}
            </Row>
          )}
        </>
      )}
      <Outlet />
    </div>
  )
}

export default ProductManagement
