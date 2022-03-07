import { LoadingOutlined } from '@ant-design/icons'
import { Alert } from 'antd'
import './components.scss'
/**
 * 仅在父元素中以100%大小展现加载动画
 */
const SubLoading = ({ tip }) => {
  return (
    <div className='subloading'>
      <LoadingOutlined twoToneColor="#52c41a" />
      <Alert message="数据加载中^.^" type="info" font showIcon />
    </div>
  )
}

export default SubLoading