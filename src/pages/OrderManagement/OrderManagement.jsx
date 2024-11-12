import {
  CalendarFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd'
import { cloneDeep, countBy } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import CountUp from 'react-countup'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import sellerApi from '../../apis/seller.api'
import utilsApi from '../../apis/utils.api'
import { getSellerProfileFromLS } from '../../utils/utils'

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker
const { confirm } = Modal

export default function OrderManagement() {
  const queryClient = useQueryClient() // For invalidating queries
  const sellerId = getSellerProfileFromLS().user.account.accountId
  console.log(sellerId)

  // Fetch orders data
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => sellerApi.getOrdersOfSeller(sellerId)
  })

  const [orders, setOrders] = useState([])
  const [cusNameFilter, setCusNameFilter] = useState('')
  const [productNameFilter, setProductNameFilter] = useState('')
  const [selectedDates, setSelectedDates] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const orderStatusMapping = useMemo(
    () => ({
      1: 'Pending',
      4: 'Deliver',
      5: 'Done'
    }),
    []
  )

  const statusColors = {
    Pending: 'blue',
    Deliver: 'orange',
    Done: 'green'
  }

  useEffect(() => {
    if (ordersData && ordersData.data) {
      console.log(ordersData.data)
      const mappedOrders = ordersData.data.data.map((order) => ({
        key: order.orderId,
        orderID: order.orderId,
        createdDate: order.date,
        customerName: order.fullName || 'Unknown',
        phoneNumber: order.phoneNumber || 'Unknown',
        total: order.totalMoney,
        status: orderStatusMapping[order.status] || 'Unknown',
        products: order.orderDetails.map((detail) => ({
          productID: detail.flowerId,
          productName: detail.flowerName,
          price: detail.price,
          quantity: detail.quantity,
          total: detail.price * detail.quantity,
          productImage: detail.flowerImage
        }))
      }))
      setOrders(mappedOrders)
    }
  }, [ordersData, orderStatusMapping])

  const { filteredData, expandedKeys } = useMemo(() => {
    let filtered = cloneDeep(orders)
    let expandedKeys = []

    if (cusNameFilter) {
      filtered = filtered.filter((item) => item.customerName.toLowerCase().includes(cusNameFilter.toLowerCase()))
    }

    if (productNameFilter) {
      filtered = filtered.filter((order) => {
        console.log(order)
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

  useEffect(() => {
    setExpandedRowKeys(expandedKeys)
  }, [expandedKeys])

  // Mutation to finish delivering stage
  const finishDeliveringStageMutation = useMutation({
    mutationFn: (orderId) => utilsApi.finishDeliveringStage(orderId),
    onSuccess: () => {
      toast.success('Order status updated to Done')
      queryClient.invalidateQueries(['orders']) // Refetch orders data
    },
    onError: () => {
      toast.error('Failed to update order status')
    }
  })

  const handleFinishDelivery = (orderId) => {
    finishDeliveringStageMutation.mutate(orderId)
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
      Deliver: counts.Deliver || 0,
      Done: counts.Done || 0
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
      key: 'orderID',
      render: (text) => <Text strong>{text}</Text>,
      sorter: (a, b) => a.orderID.localeCompare(b.orderID)
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
      sorter: (a, b) => a.customerName.localeCompare(b.customerName)
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber)
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <Text className='font-bold'>${value}</Text>,
      sorter: (a, b) => a.total - b.total
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Deliver', value: 'Deliver' },
        { text: 'Done', value: 'Done' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => {
        return (
          <div>
            <Tag color={statusColors[status]}>{status}</Tag>
            {status === 'Deliver' && (
              <Button
                type='primary'
                onClick={() => handleFinishDelivery(record.orderID)}
                loading={
                  finishDeliveringStageMutation.isLoading && finishDeliveringStageMutation.variables === record.orderID
                }
                style={{ marginTop: '8px' }}
              >
                Mark as Done
              </Button>
            )}
          </div>
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

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin fullscreen size='large' />
      </div>
    )
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
          rowSelection={rowSelection}
        />
      </Col>
      <Col span={6}>
        <div className='flex flex-col gap-4'>
          <Card className='shadow-md' style={{ borderRadius: '10px' }}>
            <div className='flex items-center'>
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Pending Orders</span>}
                  value={orderCounts.Pending}
                  valueStyle={{ fontWeight: 'bold', fontSize: '24px' }}
                  formatter={(value) => <CountUp end={value} duration={1.5} />}
                />
              </div>
            </div>
          </Card>
          <Card className='shadow-md' style={{ borderRadius: '10px' }}>
            <div className='flex items-center'>
              <SyncOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Deliver Orders</span>}
                  value={orderCounts.Deliver}
                  valueStyle={{ fontWeight: 'bold', fontSize: '24px' }}
                  formatter={(value) => <CountUp end={value} duration={1.5} />}
                />
              </div>
            </div>
          </Card>
          <Card className='shadow-md' style={{ borderRadius: '10px' }}>
            <div className='flex items-center'>
              <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <div className='ml-4'>
                <Statistic
                  title={<span className='font-beausite'>Done Orders</span>}
                  value={orderCounts.Done}
                  valueStyle={{ fontWeight: 'bold', fontSize: '24px' }}
                  formatter={(value) => <CountUp end={value} duration={1.5} />}
                />
              </div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  )
}
