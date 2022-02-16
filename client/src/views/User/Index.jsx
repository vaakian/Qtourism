import { IconHistogram, IconHome, IconLive, IconSetting } from "@douyinfe/semi-icons"
import { Card, Nav, Typography } from "@douyinfe/semi-ui"
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider"
import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { UserAuthMiddleware } from "../../middlewares/auth"
import { useGlobalState } from "../../store"

const User = () => {
  return (
    <div className="user">
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          style={{ maxWidth: 150, height: 'calc(100vh - 60px)' }}
          defaultSelectedKeys={['Home']}
          items={[
            { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
            { itemKey: 'Histogram', text: '基础数据', icon: <IconHistogram size="large" /> },
            { itemKey: 'Live', text: '测试功能', icon: <IconLive size="large" /> },
            { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
          ]}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      {/* <Card
        title='用户中心'
        style={{ maxWidth: 360 }}
        headerExtraContent={
          <Typography.Text link>
            更多
          </Typography.Text>
        }
      >
        <Outlet />
      </Card> */}
    </div>
  )
}

export default () => (
  <UserAuthMiddleware>
    <User />
  </UserAuthMiddleware>
)