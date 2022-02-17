import React from 'react'
import { Menu } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { SubMenu } = Menu

export default () => {


  const [current, setCurrent] = useState('mail')
  const handleClick = e => {
    setCurrent(e.key)
  }
  return (
    <Menu className="w-full fixed top-0 z-10 bg-white bg-opacity-75" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="探索">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1"><Link to='package'>旅游项目</Link></Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        {/* <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup> */}
      </SubMenu>
      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        用户中心
      </Menu.Item>
    </Menu>
  )
}
