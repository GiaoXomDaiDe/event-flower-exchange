import OrderDetail, { sampleOrder } from '../../components/Seller/OrderDetail/OrderDetail.jsx'

export default function OrderManagement() {
  return (
    <div className='p-10'>
      <OrderDetail order={sampleOrder} />
    </div>
  )
}
