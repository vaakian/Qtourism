import React, { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { useCommentService, usePackageService } from "../../services"
import SubLoading from "../../components/SubLoading"
import { delayedPromise } from "../../utils"
import PackageItem from "./PackageItem"
const Comments = ({ package: p }) => {
  const { id } = p
  const commentService = useCommentService()
  const { isLoading, isSuccess, data, isFetched } = useQuery('comments', async () => {
    const { data } = await commentService.getPackageComments({ packageId: id })
    return data
  })

  if (isSuccess && Array.isArray(data)) {
    return (
      <div>
        {data.map(c => <p>{c.content}</p>)}
      </div>
    )
  }
  return <></>

}
const PackageDetail = () => {
  const packageService = usePackageService()
  const [packageDetail, setPackageDetail] = useState(null)
  const { id } = useParams()
  const { isLoading, isSuccess, data, isFetched } = useQuery('packageDetail', async () => {
    const { data } = await delayedPromise(() => packageService.getPackageDetail({ packageId: id }), 500)
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
    <div className="package-detail z-10">
      <PackageItem package={data} />
      {/* Comments and more details！ */}
      <Comments package={data} />
    </div>
  )
}



export default PackageDetail