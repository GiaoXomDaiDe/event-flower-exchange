import { Button, Flex } from 'antd'
import { Link } from 'react-router-dom'

export default function RegisterToSeller() {
  return (
    <Flex className='h-screen justify-center items-center'>
      <Link to='/seller/register'>
        <Button
          size='large'
          className='text-primary-500 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300'
        >
          Register to Seller
        </Button>
      </Link>
    </Flex>
  )
}
