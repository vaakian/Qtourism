import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { useUserService } from '../../services';
import { Link } from 'react-router-dom';

const UserRegister = () => {
  const userService = useUserService();
  const [username, setUsername] = useState('vaa');
  const [password, setPassword] = useState('123');
  const [tel, setTel] = useState('123');
  const handleRegister = async () => {
    const { data, status } = await userService.register({
      username,
      password,
      tel,
    });
    if (status === 200) {
      navigate('/user/login');
    } else {
      console.log(data);
    }
  };
  return (
    <div className="z-10 bg-white opacity-90 p-10 rounded-md">
      <h1 className="text-center">用户注册</h1>
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
          label="联系方式"
          name="tel"
          rules={[{ required: true, message: '输入联系方式' }]}
        >
          <Input onChange={(e) => setTel(e.target.value)} value={tel} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Link to="/user/login">🤔已有账号？点此登陆～</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button onClick={handleRegister} type="primary" htmlType="submit">
              注册
            </Button>

            <Button type="primary" danger>
              清空
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegister;
