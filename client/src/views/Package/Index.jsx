import { Alert } from "antd"
import React from "react"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation } from 'react-router-dom'
import SubLoading from "../../components/SubLoading"
import { usePackageService } from "../../services"
import { parseUrlParams } from "../../utils"
import { SearchItem } from "../Index/Index"
import Packages from "./Packages"



const PackageIndex = () => {
  const loc = useLocation()
  const packageService = usePackageService()
  const { isLoading, data: packages, refetch, isFetching } = useQuery('getPackages', async () => {
    const { data } = await packageService.getPackages({ keyword: parseUrlParams(loc.search).keyword, page: 1 })
    return data
  })
  useEffect(() => {
    refetch()
  }, [loc])
  if (isFetching) {
    return <SubLoading />
  }
  return (
    <div className="index z-10">
      <div className="flex justify-center">
        <SearchItem />
      </div>
      <Packages packages={packages || []} />
      {packages && packages.length <= 0 && <PackageNotFound />}
    </div>
  )
}


const PackageNotFound = () => {
  return (
    <div className="mt-2">
      <Alert
        type="error"
        message="搜索失败😢"
        description="未找到任何相关套餐，请重新输入关键词。❗️"
        showIcon
      ></Alert>
    </div>
  )
}

export default PackageIndex