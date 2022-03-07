import React, { useContext } from "react"
import { GlobalContext } from "@/store"
import constants from "@/store/constants"
import { useGlobalState } from "../../store"
import { Button, Card, Tabs } from "antd"
import Text from "antd/lib/typography/Text"

const { TabPane } = Tabs


const UserInfo = () => {
  return (
    <Card
      title="🏡 用户信息"
      type="inner"
      className="userProfile min-w-[650px]">
      <Tabs
        type="card"
        tabBarExtraContent={<Button type="primary">Go</Button>}
        animated>
        <TabPane tab="📜 资料" key="0">
          <MyProfile />
        </TabPane>
        <TabPane tab="🛤 订单" key="1">
          <MyOrders />
        </TabPane>
        <TabPane tab="🚀 评论" key="2">
          <MyComments />
        </TabPane>
      </Tabs>
    </Card>

  )
}

const MyProfile = () => {
  const { state, dispatch } = useGlobalState()
  return <>
    <h1>UserProfile</h1>
    <p>登录账号：{state.profile.user.username}</p>
    <p>注册时间：{state.profile.user.time}</p>
    <p>用户编号：{state.profile.user.id}</p>
    <p>联系方式：<Text type="warning">{state.profile.user.tel}</Text></p>
    <Button
      onClick={() => dispatch({
        type: constants.CLEAR_USER
      })}>注销登录</Button>
  </>
}

const MyOrders = () => {
  return (
    <>
      我的所有订单
    </>
  )
}

const MyComments = () => {
  return (
    <>
      我的所有评论
    </>
  )
}

export default UserInfo