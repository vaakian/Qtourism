import React, { useEffect } from "react"
import { usePackageService } from '../../services'
import { useQuery } from 'react-query'
import { delaiedPromise } from "../../utils"
import './index.scss'
import { AutoComplete, Button, Input, Space } from "@douyinfe/semi-ui"
import { IconSearch } from "@douyinfe/semi-icons"
const Index = () => {
  // const packageService = usePackageService()
  // const { isLoading, data, isSuccess } = useQuery('package', async () => {
  //   const { data } = await delaiedPromise(1000, packageService.getPackages)
  //   return data
  // })
  return (
    <div className="index">
      <div className="index-banner">
        <SearchSuggestion />
      </div>
    </div>
  )
}


const SearchSuggestion = () => {
  const { isLoading, data, isSuccess } = useQuery('suggestion', async () => {
    return [
      { name: '东北易如意', id: 1 },
      { name: '加拿大-组团', id: 2 },
    ]
  })
  return (
    <div className="search">
      <Space>
        <Input
          size="large"
          placeholder="搜索绝美的旅游胜地"
          prefix={<IconSearch />}
          style={{ width: '250px' }} />
        <Button theme="solid" type="primary" size="large">Go</Button>
      </Space>
    </div>
  )
}

export default Index