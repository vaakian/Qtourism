import { Empty } from "@douyinfe/semi-ui"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Navigate, useParams } from "react-router-dom"
import { usePackageService } from "../../services"
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations'
import SubLoading from "../../components/SubLoading"
import { delaiedPromise } from "../../utils"

const PacageDetail = () => {
  const packageService = usePackageService()
  const [packageDetail, setPackageDetail] = useState(null)
  const { id } = useParams()
  const { isLoading, isSuccess, data, isFetched } = useQuery('packageDetail', async () => {
    const { data } = await delaiedPromise(() => packageService.getPackageDetail({ packageId: id }), 500)
    console.log({ data })
    return data
  })
  if (isFetched && !isSuccess) {
    // 已请求，但未找到信息
    // return <Navigate to='/' />
    return (
      <Empty>
        <Empty
          image={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
          title={'未找到该旅游项目'}
          description="您来到了未知的荒野，请检查操作。"
        />
      </Empty>
    )
  }
  if (isLoading) {
    return <SubLoading />
  }
  return (
    <div className="package-detail">
      {data && (
        <div>{data.name}</div>
      )}
    </div>
  )
}

export default PacageDetail