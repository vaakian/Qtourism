import { Table, Descriptions, Tag, Button, Space, Popconfirm } from "antd"
import Text from "antd/lib/typography/Text"
import React from "react"
import { useQuery } from "react-query"
import { usePackageService, useUserService } from "../../services"
const DeletePopconfirm = (packageInfo) => {
  return (
    <Popconfirm
      onConfirm={() => { }}
      title="确定删除该订单？">
      <Button type="primary" size="small" danger>删除订单</Button>
    </Popconfirm>
  )
}
const columns = [
  {
    title: '订单号',
    dataIndex: 'id',
    render: orderId => <a>{orderId}</a>,
  },
  {
    title: '套餐',
    dataIndex: 'package',
    render: packageInfo => <div key={'package'}>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="🏄‍♂️ 套餐名称"><Tag color="cyan">{packageInfo.name}</Tag></Descriptions.Item>
        <Descriptions.Item label="📱 商家联系方式">
          <a>{packageInfo.tel || '17683896742'}</a>
        </Descriptions.Item>
        <Descriptions.Item label="⏲ 下单时间"><Tag color="processing">{packageInfo.time}</Tag></Descriptions.Item>
        <Descriptions.Item label="⏰ 生效时间"><Tag color="success">{packageInfo.time}</Tag></Descriptions.Item>
        <Descriptions.Item label="🏡 简介"><Tag color="default">{packageInfo.description}</Tag></Descriptions.Item>
        <Descriptions.Item label="⚙️ 操作">
          <Space direction="horizontal">
            <DeletePopconfirm />
            <Button type="primary" size="small">查看套餐</Button>
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </div>
  }
]
const MyOrders = () => {
  const userService = useUserService()
  const { data, isFetching } = useQuery('orders', async () => {
    const { data } = await userService.getUserOrders()
    return data
  })
  return (
    <div>
      <Table
        loading={isFetching}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey={r => r.id}
      />
    </div>
  )
}


export default MyOrders