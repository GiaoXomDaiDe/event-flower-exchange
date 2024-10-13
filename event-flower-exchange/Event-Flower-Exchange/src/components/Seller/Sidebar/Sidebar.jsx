import Sider from 'antd/es/layout/Sider'
import React, { useContext } from 'react'
import { LayoutContext } from '../../../contexts/layout.context.jsx'
import CollapseButton from '../CollapseButton'
import SidebarHeader from '../SidebarHeader'
import SidebarMenuItem from '../SidebarMenuItem'
export default function Sidebar() {
  const { collapsed } = useContext(LayoutContext)
  return (
    <Sider
      trigger={null}
      width={300}
      collapsedWidth={80}
      collapsed={collapsed}
      defaultCollapsed={collapsed}
      collapsible
      className='bg-white shadow-2xl flex flex-col justify-between'
    >
      <div>
        <SidebarHeader />

        <SidebarMenuItem />
      </div>

      <CollapseButton />
    </Sider>
  )
}
