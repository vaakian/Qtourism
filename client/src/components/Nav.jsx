import React, { useEffect, useState } from "react"
import { Avatar, Button, Dropdown, Input, Nav, Space, Typography } from '@douyinfe/semi-ui'
import { IconUser, IconStar, IconSetting, IconOrderedList, IconQuit, IconMoon, IconSun, IconHome } from '@douyinfe/semi-icons'
import { useGlobalState } from "../store"
import './components.scss'
import { hashColor } from "../utils"


export default () => {
  return (
    <Nav
      mode="horizontal"
      header={{
        logo: <img src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg" />,
        text: '旅游网站',
      }}
      items={[
        { itemKey: 'index', text: '首页', icon: <IconHome />, link: "/" },
        // { itemKey: 'union', text: '公会中心', icon: <IconStar /> },
        // {
        //   text: '任务平台',
        //   icon: <IconSetting />,
        //   itemKey: 'job',
        //   items: ['任务管理', '用户任务查询'],
        // },
      ]}
      onSelect={data => console.log('trigger onSelect: ', data)}
      onClick={data => console.log('trigger onClick: ', data)}
      footer={
        <Space>
          <ThemeModeSwitchIcon />
          <Input placeholder='搜索' />
          <UserControl />
        </Space>
      }
    />
  )
}


const ThemeModeSwitchIcon = () => {
  const [isDark, setIsDark] = useState(document.body.getAttribute('theme-mode') === 'dark')
  const handleSwitch = () => {
    setIsDark(!isDark)
  }
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const mediaChangeHandler = event => {
      setIsDark(event.matches)
    }
    media.onchange = mediaChangeHandler
    return () => media.onchange = null
  }, [])

  // 主题随着isDark来控制
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('theme-mode', 'dark')
    } else {
      document.body.removeAttribute('theme-mode')
    }
  }, [isDark])
  const icon = isDark ? <IconSun size="extra-large" /> : <IconMoon size="extra-large" />
  return (
    <Button onClick={handleSwitch} icon={icon} aria-label="切换主题">

    </Button>
  )
}

const UserControl = () => {
  const { state: { profile } } = useGlobalState()
  const { user } = profile
  const { Text } = Typography
  const avatarColor = hashColor(user.username)
  return (
    <div className="nav-user">
      <Dropdown
        position="bottomRight"
        render={
          <Dropdown.Menu>
            <Dropdown.Item icon={<IconSetting />} type="tertiary">设置</Dropdown.Item>
            <Dropdown.Item icon={<IconOrderedList />} type="secondary">订单</Dropdown.Item>
            <Dropdown.Item icon={<IconQuit />}>退出</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <div className="userinfo">
          <Avatar src={user.avatar_url} size="small" color={avatarColor}>
            {user.username.slice(2)}
          </Avatar>
          <span className="username">{user.username}</span>
        </div>
      </Dropdown>
    </div>
  )
}