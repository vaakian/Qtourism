import React from "react"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation } from 'react-router-dom'
import SubLoading from "../../components/SubLoading"
import { usePackageService } from "../../services"
import { parseUrlParams } from "../../utils"
import { SearchItem } from "../Index/Index"
import PackageItem from "./PackageItem"
import Packages from "./Packages"



const PackageIndex = () => {
  const loc = useLocation()
  const packageService = usePackageService()
  const { isLoading, data: packages, refetch } = useQuery('getPackages', async () => {
    const { data } = await packageService.getPackages({ keyword: parseUrlParams(loc.search).keyword, page: 1 })
    return data
  })
  useEffect(() => {
    refetch()
  }, [loc])
  if (isLoading) {
    return <SubLoading />
  }
  return (
    <div className="index">
      <div className="flex justify-center">
        <SearchItem />
      </div>
      <Packages packages={packages || []} />
      {packages && packages.length <= 0 && (<h1>未找到</h1>)}
    </div>
  )
}

export default PackageIndex