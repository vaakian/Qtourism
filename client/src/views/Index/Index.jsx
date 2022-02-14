import React, { useEffect } from "react"
import { usePackageService } from '../../services'
import { useQuery } from 'react-query'
const Index = () => {
  const packageService = usePackageService()
  const { isLoading, data, isSuccess } = useQuery('package', async () => {
    const { data } = await packageService.getPackages()
    return data
  })

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="index">
      <div>Index!</div>
      {isLoading && <div>Loading...</div>}
      {data && data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  )
}

export default Index