import { Avatar, Typography } from 'antd'
import React from 'react'




export default ({ merchant }) => {
  return (
    <div className="flex gap-2">
      <Avatar src="https://joeschmoe.io/api/v1/random">
        {merchant.username}
      </Avatar>
      <Typography.Text>{merchant.username}</Typography.Text>
      <Typography.Text>{merchant.tel}</Typography.Text>
    </div>
  )
}