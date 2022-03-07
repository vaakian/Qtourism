import React from "react"


import { Card, Avatar, Button, Popover, notification, Typography, Image } from 'antd'
import { EditOutlined, EllipsisOutlined, LoadingOutlined, SettingOutlined } from '@ant-design/icons'
import MerchantInfo from "./MerchantInfo"
import { usePackageService, useUserService } from "../../services"
import { useMutation } from "react-query"
import loadingImage from '@/components/loading.gif'
import { IconLoading } from "@douyinfe/semi-icons"

const { Meta } = Card
const openNotification = (packageInfo, orderInfo) => {
  notification.success({
    message: `预定结果`,
    description: <div>
      <Typography.Text>成功预定:{packageInfo.name}</Typography.Text>
      <p>订单号：{orderInfo.id}</p>
    </div>,
    placement: 'gooood',
  })
}
const PackageItem = ({ package: p }) => {
  const userService = useUserService()


  const takeOrder = useMutation(() => {
    const { id } = p
    return userService.order({ packageId: id })
      .then(({ data }) => {
        openNotification(p, data)
      })
  })
  return (
    <div className="package m-2">
      <Card
        style={{ width: 600 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <Popover content={<MerchantInfo merchant={p.merchant} />} title="商家信息">
            <Button type="danger">商家信息</Button>
          </Popover>,
          <Button type="primary" onClick={takeOrder.mutate} loading={takeOrder.isLoading} disabled={takeOrder.isSuccess}>{takeOrder.isSuccess ? '预定成功' : '预定'}</Button>
        ]}
      >
        <div className="flex flex-row" >

          <div className="w-1/2">
            <Meta
              avatar={<Avatar src={`https://joeschmoe.io/api/v1/${p.name}`} />}
              title={p.name}
              description={p.description}
            />
          </div>
          <div className="w-1/2 rounded overflow-hidden">
            <Image
              className="w-full"
              height={150}
              alt="example"
              src={`https://source.unsplash.com/random/275x150/?travel,scenery&${p.name}`}
              fallback={loadingImage}
              placeholder={<div className="text-9xl text-center w-full"><LoadingOutlined /></div>}
            />
          </div>

        </div>
      </Card>
    </div>
  )
}

export default PackageItem

