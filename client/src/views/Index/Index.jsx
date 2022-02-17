import React from "react"
import Nav from "./Nav"
import './index.scss'
import Background from "./Background"
import { Input, AutoComplete } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const Index = () => {
  // const packageService = usePackageService()
  // const { isLoading, data, isSuccess } = useQuery('package', async () => {
  //   const { data } = await delaiedPromise(1000, packageService.getPackages)
  //   return data
  // })
  return (
    <div className="index">
      <div className="search absolute left-1/2 top-1/2">
        <SearchItem />

      </div>
    </div>
  )
}
export const SearchItem = () => {
  // const onSearch = value => console.log(value)
  const navigate = useNavigate()
  const onSelect = value => {
    // onSelect 直接跳到该套餐
    if (value) {
      navigate(`/package/${value}`)
    }
  }
  const onSearch = value => {
    // 跳到搜索结果页
    if (value) {
      console.log(value)
      navigate(`/package?keyword=${value}`)
    }
  }
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={[{ value: '1823', label: '行了' }]}
      onSelect={onSelect}
    >
      <Input.Search placeholder="搜索未知的圣地x" size="large" onSearch={onSearch} enterButton />
    </AutoComplete>

  )
}

export default Index