import { IconLoading } from "@douyinfe/semi-icons"
import { Spin, Typography } from "@douyinfe/semi-ui"
import './components.scss'
/**
 * 仅在父元素中以100%大小展现加载动画
 */
const SubLoading = ({ tip }) => {
  return (
    <div className="subloading">
      {/* <Typography.Text type="warning">数据加载中</Typography.Text> */}
      <Spin size="large" tip={tip || 'loading'}>
        <div style={{ width: '200px' }}>

        </div>
      </Spin>
    </div>
  )
}

export default SubLoading