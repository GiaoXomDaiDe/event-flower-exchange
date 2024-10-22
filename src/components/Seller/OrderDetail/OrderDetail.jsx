import { Button, Modal, Timeline } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function OrderDetail({ order }) {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  return (
    <div className='p-4'>
      <Button type='primary' onClick={showModal}>
        Chi tiết
      </Button>
      <Modal title={`Chi tiết Đơn Hàng: ${order.id}`} visible={visible} onCancel={hideModal} footer={null}>
        {/* Thông tin khách hàng */}
        <div className='mb-4'>
          <h3 className='font-semibold'>Thông tin khách hàng</h3>
          <p>Tên: {order.customer.name}</p>
          <p>Địa chỉ: {order.customer.address}</p>
          <p>Số điện thoại: {order.customer.phone}</p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className='mb-4'>
          <h3 className='font-semibold'>Danh sách sản phẩm</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index} className='mb-2'>
                <p>
                  {product.name} - Số lượng: {product.quantity} - Giá: {product.price}₫
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Trạng thái vận chuyển */}
        <div className='mb-4'>
          <h3 className='font-semibold'>Trạng thái vận chuyển</h3>
          <Timeline>
            {order.statuses.map((status, index) => (
              <Timeline.Item key={index}>{status}</Timeline.Item>
            ))}
          </Timeline>
        </div>

        {/* Chú thích từ khách hàng */}
        {order.notes && (
          <div className='mb-4'>
            <h3 className='font-semibold'>Chú thích từ khách hàng</h3>
            <p>{order.notes}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

// Dữ liệu mẫu
export const sampleOrder = {
  id: '12345',
  customer: {
    name: 'Nguyễn Văn A',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    phone: '0123456789'
  },
  products: [
    { name: 'Hoa hồng', quantity: 2, price: 100000 },
    { name: 'Hoa cúc', quantity: 5, price: 50000 }
  ],
  statuses: ['Đang chờ xác nhận', 'Đã đóng gói', 'Đang giao', 'Giao thành công'],
  notes: 'Xin vui lòng giao vào buổi sáng.'
}

OrderDetail.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    }).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired
      })
    ).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    notes: PropTypes.string
  }).isRequired
}
