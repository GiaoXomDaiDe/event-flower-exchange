import { BellOutlined } from '@ant-design/icons'
import { Badge, Dropdown, List } from 'antd'
import { useState } from 'react'

const notifications = [
  { id: 1, message: 'Đơn hàng #1234 đã được hoàn thành' },
  { id: 2, message: 'Đơn hàng #5678 đã bị hủy' },
  { id: 3, message: 'Sự kiện Hoa Cưới 2023 sắp diễn ra' }
]

const Notifications = () => {
  const [visible, setVisible] = useState(false)

  const menu = (
    <List dataSource={notifications} renderItem={(item) => <List.Item key={item.id}>{item.message}</List.Item>} />
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} onVisibleChange={() => setVisible(!visible)} visible={visible}>
      <Badge count={notifications.length}>
        <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Badge>
    </Dropdown>
  )
}

export default Notifications
