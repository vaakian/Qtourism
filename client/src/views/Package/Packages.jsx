import React from "react"
import PackageItem from "./PackageItem"


export default ({ packages }) => {
  return (
    <div className="packages">
      {packages && packages.map(item => <PackageItem key={item.id} package={item}></PackageItem>)}
    </div>
  )
}