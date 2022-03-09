import React from "react"
import './index.scss'
import { Input, AutoComplete, Avatar, Carousel, Image, Card } from 'antd'
import { useNavigate } from "react-router-dom"

const Index = () => {
  // const packageService = usePackageService()
  // const { isLoading, data, isSuccess } = useQuery('package', async () => {
  //   const { data } = await delayedPromise(1000, packageService.getPackages)
  //   return data
  // })
  return (
    <div className="index">
      <div className="search absolute left-1/2 top-1/2">
        <Title />
        <div className="bg-slate-50 p-5 rounded-md shadow-lg bg-opacity-90 w-[450px]">
          <PackageCarousel />
          <Caption />
          <SearchItem />
        </div>
      </div>
    </div>
  )
}
const PackageCarousel = () => {
  return (
    <Carousel autoplay>
      {
        [1, 2, 3, 4].map(i => (
          <img className="rounded-md" src={`https://source.unsplash.com/random/275x150/?travel,scenery&${i}`} key={i}></img>
        ))
      }
    </Carousel >
  )
}
const Title = () => {
  return (
    <div className="title text-center">
      <h1>当百旅游客栈</h1>
    </div>
  )
}
const Caption = () => {
  return (
    <div className="caption text-center">
      <h1>搜索</h1>
      <p>输入关键字，搜索相关内容</p>
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
    <div className="w-full flex justify-center">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={[{ value: '1823', label: '自动完成' }]}
        onSelect={onSelect}
      >
        <Input.Search placeholder="搜索未知的圣地🌍" size="large" onSearch={onSearch} enterButton />
      </AutoComplete>
    </div>

  )
}

export default Index