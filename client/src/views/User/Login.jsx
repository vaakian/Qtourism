import { useState } from 'react';
import { useUserService } from '../../services';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../store';
import { Form, Input, Checkbox, Button } from 'antd';
const Login = () => {
  const [username, setUsername] = useState('vaa');
  const [password, setPassword] = useState('123');
  const userService = useUserService();
  const navigate = useNavigate();
  const { state } = useGlobalState();
  if (state.profile.user) {
    return <Navigate to="/user/profile" />;
  }
  const handleLogin = async (e) => {
    const { data, status } = await userService.login({ username, password });
    if (status === 200) navigate('/user/profile');
  };
  return (
    <div className="user-login z-10 bg-white p-10 px-24 rounded-md opacity-90">
      <h1 className="text-center">用户登陆</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: '输入用户名' }]}
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '输入密码' }]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Link to="/user/register">🤔没有账号？注册一个！</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={handleLogin} type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="form">
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
      </div> */}
    </div>
  );
};

export default Login;
