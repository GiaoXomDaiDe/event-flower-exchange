import React from 'react'
import './index.scss'

const PaymentFail = () => {
  return (
    <div className='payment-status'>
      <div className='payment-status_item'>
        <div className='payment-status_image' style={{ padding: '30px' }}>
          <img
            className='payment-status_img'
            src='https://cdn.printme.online/wp-content/uploads/2020/04/payment_fail_icon.png'
            alt=''
          />
        </div>
        <h1>YourPayment Failed!</h1>
      </div>
    </div>
  )
}

export default PaymentFail
