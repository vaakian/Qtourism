import React, { useEffect } from "react"
import { usePackageService } from '../../services'
const Index = () => {
  const packageService = usePackageService()
  useEffect(() => {
    packageService.getPackages().then(packages => console.log(packages))
  }, [])
  // console.log(api)
  return (
    <div className="index">
      { }
      <div>Index!</div>
    </div>
  )
}

export default Index