import {
  CalendarFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
  SyncOutlined
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd'
import { cloneDeep, countBy } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import { orderData, statusColors, statusOptions } from '../../mock/orderData'

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker
const { confirm } = Modal

export default function OrderManagement() {
  const [orders, setOrders] = useState(orderData)
  const [isLoading, setIsLoading] = useState(false)

  const [cusNameFilter, setCusNameFilter] = useState('')
  const [productNameFilter, setProductNameFilter] = useState('')
  const [selectedDates, setSelectedDates] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const { filteredData, expandedKeys } = useMemo(() => {
    let filtered = cloneDeep(orders)
    let expandedKeys = []

    if (cusNameFilter) {
      filtered = filtered.filter((item) => item.customerName.toLowerCase().includes(cusNameFilter.toLowerCase()))
    }

    if (productNameFilter) {
      filtered = filtered.filter((order) => {
        const hasMatchingProduct = order.products.some((product) =>
          product.productName.toLowerCase().includes(productNameFilter.toLowerCase())
        )
        if (hasMatchingProduct) {
          expandedKeys.push(order.key)
        }
        return hasMatchingProduct
      })
    } else {
      expandedKeys = []
    }

    if (selectedDates && selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates
      filtered = filtered.filter((item) =>
        moment(item.createdDate, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')
      )
    }

    return { filteredData: filtered, expandedKeys }
  }, [orders, cusNameFilter, productNameFilter, selectedDates])

  // Cập nhật expandedRowKeys khi expandedKeys thay đổi
  useEffect(() => {
    setExpandedRowKeys(expandedKeys)
  }, [expandedKeys])

  const handleStatusChange = (key, value) => {
    setOrders((prevOrders) => prevOrders.map((item) => (item.key === key ? { ...item, status: value } : item)))
  }

  const handleSearchChange = (event) => {
    setCusNameFilter(event.target.value)
  }

  const handleProductNameSearchChange = (event) => {
    setProductNameFilter(event.target.value)
  }

  const handleDateRangeChange = (dates) => {
    const datesFormat = dates?.map((date) => date.format('YYYY-MM-DD'))
    setSelectedDates(datesFormat)
  }

  const countOrdersByStatus = () => {
    const counts = countBy(orders, 'status')
    return {
      Pending: counts.Pending || 0,
      Confirmed: counts.Confirmed || 0,
      Cancelled: counts.Cancelled || 0,
      Completed: counts.Completed || 0
    }
  }

  const orderCounts = countOrdersByStatus()

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure you want to delete ${selectedRowKeys.length} orders?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete()
      }
    })
  }

  const handleDelete = () => {
    setOrders((prevOrders) => prevOrders.filter((item) => !selectedRowKeys.includes(item.key)))
    setSelectedRowKeys([])
  }

  const exportToExcel = () => {
    const dataToExport = orders.filter((item) => selectedRowKeys.includes(item.key))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
    XLSX.writeFile(workbook, 'orders.xlsx')
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderId',
      render: (text) => <Text strong>{text}</Text>,
      sorter: (a, b) => a.orderID - b.orderID
    },
    {
      title: 'Created At',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => <Text>{text}</Text>,
      filterIcon: (filtered) => <CalendarFilled style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: () => (
        <Space className='p-4'>
          <RangePicker onChange={handleDateRangeChange} format='YYYY-MM-DD' />
        </Space>
      )
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.customerName.length - b.customerName.length
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <Text className='font-bold'>${value}</Text>,
      sorter: (a, b) => a.total - b.total
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      render: (value) => (
        <Text>
          ${value} <Tag color='green'>+{value}%</Tag>
        </Text>
      ),
      sorter: (a, b) => a.profit - b.profit
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: statusOptions.map((option) => ({
        text: option.label,
        value: option.value
      })),
      onFilter: (value, record) => record.status === value,
      render: (status, record) => {
        const menuItems = statusOptions.map((option) => ({
          key: option.value,
          label: (
            <span>
              <Tag color={statusColors[option.value]}>{option.label}</Tag>
            </span>
          )
        }))

        return (
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => handleStatusChange(record.key, key)
            }}
            trigger={['click']}
          >
            <Tag color={statusColors[status]} style={{ cursor: 'pointer' }}>
              {status} <DownOutlined />
            </Tag>
          </Dropdown>
        )
      }
    }
  ]

  const expandColumns = [
    {
      title: '#',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text) => (
        <Image src={text} alt='' width={50} height={50} style={{ objectFit: 'cover', borderRadius: '20%' }} />
      )
    },
    {
      title: 'ProductID',
      dataIndex: 'productID',
      key: 'productID',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Text>${text}</Text>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => <Text>${text}</Text>
    }
  ]

  const expandedRowRender = (record) => (
    <Table columns={expandColumns} dataSource={record.products} pagination={false} rowKey='productID' />
  )

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys
  }

  return (
    <Row gutter={[20, 20]} className='p-3'>
      <Col
        span={18}
        className='bg-white p-6 rounded-md'
        style={{
          padding: '48px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className='flex justify-between items-end mb-8'>
          <Space>
            <Search
              placeholder='Search by Customer Name'
              onChange={handleSearchChange}
              value={cusNameFilter}
              className='rounded-2xl'
              style={{ width: 300, padding: '8px 16px' }}
            />
            <Search
              placeholder='Search by Product Name'
              onChange={handleProductNameSearchChange}
              value={productNameFilter}
              className='rounded-2xl'
              style={{ width: 300, padding: '8px 16px' }}
            />
          </Space>
          {selectedRowKeys.length > 0 && (
            <Space>
              <Button icon={<DeleteOutlined />} danger onClick={showDeleteConfirm}>
                Delete
              </Button>
              <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
                Export to Excel
              </Button>
            </Space>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ position: ['bottomCenter'] }}
          rowKey='key'
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKeys,
            onExpandedRowsChange: (expandedKeys) => setExpandedRowKeys(expandedKeys)
          }}
          loading={isLoading}
          rowSelection={rowSelection}
        />
      </Col>
      <Col span={6}>
        <div className='flex flex-col gap-4'>
          <Card className='shadow-md' style={{ borderRadius: '10px' }} bodyStyle={{ padding: '20px' }}>
            <div className='flex items-center'>
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div className='ml-4'>
                <Statistic title={<span className='font-beausite'>Pending Orders</span>} value={orderCounts.Pending} />
              </div>
            </div>
          </Card>
          <Card className='shadow-md' style={{ borderRadius: '10px' }} bodyStyle={{ padding: '20px' }}>
            <div className='flex items-center'>
              <SyncOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Confirmed Orders</span>}
                  value={orderCounts.Confirmed}
                />
              </div>
            </div>
          </Card>
          <Card className='shadow-md' style={{ borderRadius: '10px' }} bodyStyle={{ padding: '20px' }}>
            <div className='flex items-center'>
              <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Completed Orders</span>}
                  value={orderCounts.Completed}
                />
              </div>
            </div>
          </Card>
          <Card className='shadow-md' style={{ borderRadius: '10px' }} bodyStyle={{ padding: '20px' }}>
            <div className='flex items-center'>
              <CloseCircleOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Cancelled Orders</span>}
                  value={orderCounts.Cancelled}
                />
              </div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  )
}
