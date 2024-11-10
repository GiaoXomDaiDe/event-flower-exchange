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
import { Button, Card, Col, Input, Modal, Row, Segmented, Space, Switch, Table, Tooltip, Typography } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
// import eventApi from '../../apis/event.api'
import eventApi from '../../apis/event.api'
import { getSellerProfileFromLS } from '../../utils/utils'

const { Text, Paragraph } = Typography
const { confirm } = Modal

const EventManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isAddNewEvent = location.pathname.endsWith('add-new-event')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  const [viewMode, setViewMode] = useState('table')
  const defaultPageSize = 10
  const gridPageSize = 1000

  const pageSize = viewMode === 'grid' ? gridPageSize : defaultPageSize
  const [pageIndex, setPageIndex] = useState(1)
  const [sortBy, setSortBy] = useState('eventId')
  const [sortDesc, setSortDesc] = useState(false)
  const { accountId } = getSellerProfileFromLS().user
  const [searchTerm, setSearchTerm] = useState('')

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['events', { pageIndex, pageSize, sellerId: accountId, sortBy, sortDesc, search: searchTerm }],
    queryFn: () => {
      return eventApi.getEventList({ pageIndex, pageSize, sellerId: accountId, sortBy, sortDesc, search: searchTerm })
    },
    keepPreviousData: true,
    enabled: !!viewMode
  })
  console.log(queryData)

  const deleteEventMutation = useMutation({
    mutationFn: (idsToDelete) => {
      return eventApi.deleteEvent(idsToDelete)
    },
    onSuccess: (response) => {
      const { message } = response.data
      queryClient.invalidateQueries(['events'])
      toast.success(message || 'Deleted successfully')
      setSelectedRowKeys([])
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Delete failed'
      toast.error(errorMessage)
    }
  })

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setSearchTerm(e.target.value)
  }

  const handleExport = () => {
    const dataToExport = queryData?.data.data.filter((item) => selectedRowKeys.includes(item.eventId))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Events')
    XLSX.writeFile(workbook, 'events.xlsx')
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setPageIndex(pagination.current)
    setSortBy(sorter.field || 'eventId')
    setSortDesc(sorter.order === 'descend')
  }

  const handleDelete = (eventIds) => {
    const idsToDelete = Array.isArray(eventIds) ? eventIds : [eventIds]

    confirm({
      title: `Are you sure you want to delete ${idsToDelete.length > 1 ? 'these events' : 'this event'}?`,
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteEventMutation.mutate(idsToDelete)
      },
      onCancel() {
        console.log('Cancel delete')
      }
    })
  }

  const handleEdit = (eventId) => {
    navigate(`/seller/event-management/update-event/${eventId}`)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'eventId',
      key: 'eventId',
      align: 'center',
      width: 80,
      render: (eventId) => (
        <Text strong style={{ fontSize: '0.7rem', color: '#595959' }}>
          {eventId}
        </Text>
      ),
      sorter: (a, b) => a.eventId - b.eventId
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 250,
      render: (text) => (
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: false
          }}
          style={{ marginBottom: 4, fontWeight: 500, fontSize: '0.875rem', color: '#434343' }}
        >
          {text}
        </Paragraph>
      )
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      width: 120,
      render: (date) => (
        <Text style={{ fontSize: '0.875rem', color: '#8c8c8c' }}>{moment(date).format('YYYY-MM-DD')}</Text>
      )
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      width: 120,
      render: (date) => (
        <Text style={{ fontSize: '0.875rem', color: '#8c8c8c' }}>{moment(date).format('YYYY-MM-DD')}</Text>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 300,
      render: (text) => (
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: false
          }}
          style={{ marginBottom: 4, fontSize: '0.875rem', color: '#8c8c8c' }}
        >
          {text}
        </Paragraph>
      )
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
            changeStatusEventMutation.mutate(record.eventId)
          }}
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
          <Tooltip title='View Details' placement='bottom'>
            <Button shape='circle' icon={<EyeOutlined />} size='large' variant='outlined' />
          </Tooltip>
          <Tooltip title='Edit' placement='bottom'>
            <Button
              onClick={() => handleEdit(record.eventId)}
              shape='circle'
              icon={<EditOutlined />}
              size='large'
              variant='solid'
            />
          </Tooltip>
          <Tooltip title='Delete' placement='bottom'>
            <Button
              onClick={() => handleDelete(record.eventId)}
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
      {!isAddNewEvent && (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Link to='add-new-event'>
                <Button type='primary' icon={<PlusOutlined />}>
                  Create New Event
                </Button>
              </Link>

              {selectedRowKeys.length > 0 && (
                <>
                  <Button
                    icon={<DeleteOutlined />}
                    size='middle'
                    danger
                    onClick={() => {
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
                placeholder='Search by event title'
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
              rowKey='eventId'
              rowSelection={rowSelection}
              loading={isLoading}
              onChange={handleTableChange}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {queryData?.data.data.map((item) => (
                <Col key={item.eventId} xs={24} sm={12} md={8}>
                  <Card
                    className='h-[400px]'
                    hoverable
                    actions={[
                      <Tooltip title='View Details' key='view'>
                        <EyeOutlined />
                      </Tooltip>,
                      <Tooltip title='Edit' key='edit'>
                        <EditOutlined onClick={() => handleEdit(item.eventId)} />
                      </Tooltip>,
                      <Tooltip title='Delete' key='delete'>
                        <DeleteOutlined onClick={() => handleDelete(item.eventId)} />
                      </Tooltip>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                          {item.title}
                        </Paragraph>
                      }
                      description={
                        <div>
                          {/* Date */}
                          <div>
                            <Text strong style={{ fontSize: '0.875rem', color: '#3f8600' }}>
                              {moment(item.startDate).format('YYYY-MM-DD')} -{' '}
                              {moment(item.endDate).format('YYYY-MM-DD')}
                            </Text>
                          </div>
                          {/* Description */}
                          {item.description && (
                            <Paragraph ellipsis={{ rows: 3 }} style={{ marginTop: 8, color: '#8c8c8c' }}>
                              {item.description}
                            </Paragraph>
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

export default EventManagement
