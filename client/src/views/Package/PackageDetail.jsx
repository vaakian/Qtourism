import React, { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { usePackageService } from "../../services"
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
      <div>
        未找到
      </div>
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