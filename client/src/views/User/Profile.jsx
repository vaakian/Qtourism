import { PageHeader, Tabs, Button, Statistic, Descriptions, Tooltip, List, Comment, Popconfirm, message } from 'antd'
import { useGlobalState, useUserProfile } from '../../store'
import constants from '../../store/constants'
import MyComments from './MyComments'
import MyOrders from './MyOrders'

const { TabPane } = Tabs

const renderContent = (column = 2) => {
  const { state: { profile: { user } } } = useGlobalState()
  return (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="🏄‍♂️ 登录账号">{user.time}</Descriptions.Item>
      <Descriptions.Item label="📱 联系方式">
        <a>{user.tel || '17683896742'}</a>
      </Descriptions.Item>
      <Descriptions.Item label="⏲ 创建时间">2017-01-10</Descriptions.Item>
      <Descriptions.Item label="⏰ 生效时间">2017-10-10</Descriptions.Item>
      <Descriptions.Item label="🏡 地址">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China.</Descriptions.Item>
    </Descriptions>
  )
}

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="账号状态"
      value="有效"
      prefix="🍭"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="订单数" prefix="🍞" value={54} />
  </div>
)

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
)

const UserProfile = () => {
  const { dispatch } = useGlobalState()
  const user = useUserProfile()
  const logout = () => {
    const hideLoading = message.loading('正在注销...')
    setTimeout(() => {
      dispatch({
        type: constants.CLEAR_USER
      })
      hideLoading()
    }, 800)
  }
  return (
    <PageHeader
      className="site-page-header-responsive bg-white bg-opacity-95 m-4 rounded-lg pb-8"
      onBack={() => window.history.back()}
      avatar={{ src: user.avatar_url }}
      title={user.username}
      subTitle="🔥🚀Do not go gentle into that good night"
      extra={[
        <Button key="3" type="primary">操作1</Button>,
        <Button key="2" type="dashed">操作2</Button>,
        <Popconfirm
          title="确定注销吗？"
          onConfirm={logout}
          okText="确定"
          cancelText="取消"
        >
          <Button key="1" type="primary" danger>注销登录</Button>
        </Popconfirm>,
      ]}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="📜 我的订单" key="1">
            <MyOrders />
          </TabPane>
          <TabPane tab="🚀 我的评论" key="2">
            <MyComments />
          </TabPane>
        </Tabs>
      }
    >
      <Content extra={extraContent}>{renderContent()}</Content>
    </PageHeader>)
}




export default UserProfile