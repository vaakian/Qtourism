import { useState } from "react"
import { useUserService } from '../../services'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [username, setUsername] = useState('vaa')
  const [password, setPassword] = useState('123')
  const userService = useUserService()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    const { data, status } = await userService.login({ username, password })
    if (status === 200) navigate('profile')
  }
  return (
    <div className="user-login">
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