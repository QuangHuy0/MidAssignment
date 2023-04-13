import { Button, Form, Input, Layout, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, getAuthorList } from '../Service';

const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;

function CreatePost() {

    let navigate = useNavigate();
    const navigateToPosts = () => {
        navigate('/posts')
    };

    let username;
    const [authors, setAuthors] = useState([])
    const [create, setCreate] = useState([])

    const fetchAuthors = () => {
        getAuthorList().then(res => {
            setAuthors(res.data)
        })
    };
    useEffect(() => {
        fetchAuthors()
    }, []);

    const handleChange = (event) => {
        username = event;
        console.log(username);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        createPost(username, values).then((res) => {
            console.log(res);

        })
        navigateToPosts();



    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <div style={{ marin: 'auto', width: '100%' }}>
                <Select onChange={handleChange}
                    style={{ width: '75%', paddingLeft: '305px' }}
                    defaultValue="--Select Author--">
                    {authors.map(item => {
                        return (
                            <Option key={item.username} values={item.username}>{item.username}</Option>
                        )
                    })}
                </Select>
            </div>
            <div style={{ paddingTop: '20px' }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                        <Input
                            placeholder='maxLength is 100'
                            maxLength={100} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input
                            maxLength={200}
                            placeholder='maxLength is 200' />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                    >
                        <TextArea
                            rows={4} maxLength={1000} />
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default CreatePost;