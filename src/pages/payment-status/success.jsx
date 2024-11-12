import React, { useEffect } from 'react'
import './index.scss'
import { useLocation, useParams } from 'react-router-dom'
import { paymentSuccess } from '../../services/paymentService'

const PaymentSuccess = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const transactionId = queryParams.get('transactionId')
  console.log(transactionId)

  const fetchPaymentSuccess = async () => {
    const response = await paymentSuccess(token, transactionId)
    console.log(response)
    return response
  }
  useEffect(() => {
    fetchPaymentSuccess()
  }, [transactionId])

  return (
    <div className='payment-status'>
      <div className='payment-status_item'>
        <div className='payment-status_image'>
          <img
            className='payment-status_img'
            src='https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png'
            alt=''
          />
        </div>
        <h1>Payment Succesful!</h1>
        <h2>Your order is on the way to deliver!</h2>
      </div>
    </div>
  )
}

export default PaymentSuccess
