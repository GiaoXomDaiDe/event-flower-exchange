import { BankOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { useContext, useState } from 'react'
import { SellerContext } from '../../../contexts/seller.context.jsx'

const { Title, Text } = Typography

export default function BankAccountModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { sellerProfile } = useContext(SellerContext)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={showModal} className='cursor-pointer hover:text-primary-500 transition-colors duration-200'>
        View bank account
      </button>
      <Modal
        title={
          <Title level={3} className='text-center'>
            Bank Account Information
          </Title>
        }
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        centered
        onCancel={handleCancel}
        width={550}
        className='rounded-lg'
      >
        <div className='p-6 bg-gray-100 rounded-lg shadow-lg'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white'>
            <div className='flex justify-between items-center mb-4'>
              <BankOutlined className='text-4xl' />
              <Text className='text-lg'>{sellerProfile?.cardProviderName || 'Bank Name'}</Text>
            </div>
            <div className='mt-2'>
              <Text className='text-sm'>Account Holder</Text>
              <Text className='block text-xl font-semibold'>{sellerProfile?.cardName || 'N/A'}</Text>
            </div>
            <div className='mt-4'>
              <Text className='text-sm'>Card Number</Text>
              <Text className='block text-2xl font-semibold tracking-wider'>
                {sellerProfile?.cardNumber || '**** **** **** ****'}
              </Text>
            </div>
            <div className='mt-4'>
              <Text className='text-sm'>Tax Number</Text>
              <Text className='block text-lg'>{sellerProfile?.taxNumber || 'N/A'}</Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
