import React from 'react'
import { Avatar, Menu, Image } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeFilled } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IconMember } from '@douyinfe/semi-icons'

const { SubMenu } = Menu

export default () => {


  const [current, setCurrent] = useState('home')
  const handleClick = e => {
    setCurrent(e.key)
  }
  return (
    <Menu
      className="w-full fixed top-0 z-10 bg-white bg-opacity-75 z-50"
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal">
      {/* 首页 */}
      <Menu.Item key="home" icon={<HomeFilled />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {/* 商品相关 */}
      <SubMenu key="explore" icon={<SettingOutlined />} title="探索">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="packages">
            <Link to='package'>旅游项目</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">旅游订单</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      {/* 账号相关 */}
      <SubMenu key="member" icon={<IconMember />} title="会员">
        <Menu.ItemGroup title="游客">
          <Menu.Item key="user:login"><Link to='user/login'>游客登录</Link></Menu.Item>
          <Menu.Item key="user:register"><Link to="user/register">游客注册</Link></Menu.Item>
          {/* 否则就是：订单，评论。 */}
        </Menu.ItemGroup>
        <Menu.ItemGroup title="商家">
          <Menu.Item key="merchant:login">商家管理</Menu.Item>
          {/* 否则就是：订单，商品，评论。 */}
        </Menu.ItemGroup>
      </SubMenu>

    </Menu>
  )
}
