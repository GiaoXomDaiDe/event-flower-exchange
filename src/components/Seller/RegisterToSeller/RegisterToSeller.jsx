// RegisterToSeller.jsx
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import sellerApi from '../../../apis/seller.api'
import { setSellerProfileToLS } from '../../../utils/utils'

export default function RegisterToSeller() {
  const navigate = useNavigate()
  const {
    data: sellerProfileData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['sellerProfile'],
    queryFn: () => sellerApi.getSellerProfile()
  })

  const handleRegisterToSeller = () => {
    if (sellerProfileData) {
      setSellerProfileToLS(sellerProfileData.data)
      navigate('/seller/seller-dashboard')
    } else if (!isLoading && isError) {
      // Kiểm tra mã lỗi từ API
      if (error.response && error.response.status === 403) {
        toast.error('You are not a seller')
        navigate('/')
      } else {
        // Xử lý các lỗi khác nếu cần
      }
    }
  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Button
        onClick={handleRegisterToSeller}
        size='large'
        className='text-primary-500 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300'
      >
        Register to Seller
      </Button>
    </div>
  )
}
