import { useState } from "react"
import { useUserService } from '../../services'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGlobalState } from "../../store"
const Login = () => {
  const [username, setUsername] = useState('vaa')
  const [password, setPassword] = useState('123')
  const userService = useUserService()
  const navigate = useNavigate()
  const { state } = useGlobalState()
  if (state.profile.user) {
    return <Navigate to="/user/profile" />
  }
  const handleLogin = async (e) => {
    const { data, status } = await userService.login({ username, password })
    if (status === 200) navigate('/user/profile')
  }
  return (
    <div className="user-login z-10">
      <div className="form">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="输入用户名"
          type="text" />
        <br />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="输入密码"
          type="password" />
        <br />
        <button onClick={handleLogin}>登录</button>
      </div>
    </div>
  )
}

export default Login