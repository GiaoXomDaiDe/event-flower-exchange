import { Button, Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sellerApi from '../../../apis/seller.api.js'
import { SellerContext } from '../../../contexts/seller.context.jsx'

export default function SellerCancelButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { reset } = useContext(SellerContext)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    sellerApi.sellerCancel()
    reset()
    navigate('/')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <button onClick={showModal} className='cursor-pointer hover:text-primary-500 transition-colors duration-200'>
        Cancel Registration
      </button>
      <Modal
        title={
          <Title level={3} className='text-center text-red-600'>
            Confirm Cancellation
          </Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={550}
        className='rounded-lg'
      >
        <div className='text-center p-4'>
          <p className='text-gray-700'>Are you sure you want to cancel your registration?</p>
          <p className='text-gray-500'>This action cannot be undone.</p>
          <div className='mt-6 flex justify-center space-x-4'>
            <Button onClick={handleOk} className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-full'>
              Yes, Cancel
            </Button>
            <Button onClick={handleCancel} className='px-6 py-2 rounded-full'>
              No, Go Back
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
