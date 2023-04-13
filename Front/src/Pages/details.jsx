
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../Service';

 function Details() {

    const {id} = useParams();

    const [post, setPost] = useState([]);

    const fetchPost = (id) => {
      getPostDetail(id).then(res=> {
        setPost(res.data)
      })
    };

    useEffect ((id) => {
      fetchPost()
    },[id]);
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
    <div>

        Details Page
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Form.Item
        label="Id"
        name="id"
        rules={[
          {
            required: true,
            message: 'Please input ',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input description',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      
      

      <Form.Item
        wrapperCol={{
          offset: 8,
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

 export default Details;