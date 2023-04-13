import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import { Modal, Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { getAuthorByEmail } from "../Service";

function Login() {
  let navigate = useNavigate()
  const { setIsAuthenticated } = useAuthContext();

  const [author, setAuthor] = useState([]);
  const fetchAuthor = (email) => {
    getAuthorByEmail(email).then(res => {
      setAuthor(res.data)
    })
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    fetchAuthor(values.email);
    if (author.username !== null && author.username !== undefined) {
      if (author.Password === values.Password) {
        localStorage.setItem('token', author.username);
        setIsAuthenticated(true);
        navigate("/profile");
        message.success('Login successful')
      }else {
        setIsAuthenticated(false);
        message.error('Incorrect email or password');
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Incorrect email or password');
  };


  return (<div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            min: 8,
            massage: 'Password must be at least 8 characters!',
          },
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
}

export default Login;