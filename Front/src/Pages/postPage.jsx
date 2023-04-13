import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Space, Table, Input, Popconfirm, Form } from 'antd';
import React from 'react';
import { deletePost, getPostDetail, getPostList } from "../Service";
import TextArea from "antd/lib/input/TextArea";

function Post() {

    let navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/posts/create')
    };
    const navigateToEdit = (id) => {
        navigate(`/posts/edit/${id}`)
    };


    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [searchedText, setSearchedText] = useState([]);

    const fetchPosts = () => {
        getPostList().then(res => {
            setPosts(res.data)
        })
    };
    const fetchPost = (id) => {
        getPostDetail(id).then(res => {
            setPost(res.data)
        })
    };

    useEffect(() => {
        fetchPosts()
    }, []);

    const handleDelete = (id) => {
        deletePost(id).then((res) => {
            console.log(res);
            fetchPosts();
        })
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (id) => {
        setIsModalOpen(true);
        fetchPost(id);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setPost({ ...post, [name]: value });
    // };
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            width: '5%',
            margin: 'auto',
            align: 'center',
        },
        {
            title: "Title",
            dataIndex: "title",
            width: '25%',
            float: 'left',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.title)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            // onFilter: (value, record) => {
            //     return String(record.id)
            //     .toLowerCase()
            //     .includes(value.toLowerCase());
            // },
            sorter: (a, b) => b.title.length - a.title.length,
            sortDirections: ['descend'],
        },
        {
            title: "Description",
            dataIndex: "description",
            width: '40%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '30%',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ float: 'left' }}>
                        <Button onClick={() => navigateToEdit(record.id)} style={{ marginLeft: '10px' }}>Edit</Button>
                        <Button onClick={() => showModal(record.id)} style={{ marginLeft: '10px' }}>Details</Button>
                        <Button style={{ marginLeft: '10px' }}>
                            <Popconfirm
                                title="Are you sure?"
                                onConfirm={() => handleDelete(record.id)}>
                                Delete
                            </Popconfirm>
                        </Button>
                    </div>
                </Space>

            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <div>
                <Input.Search
                    placeholder="Search here..."
                    style={{ marginTop: '10px', width: '30%' }}
                    onSearch={(value) => {
                        setSearchedText(value);
                    }}
                    onChange={(event) => {
                        setSearchedText(event.target.value);
                    }}
                />

            </div>
            <Button onClick={navigateToCreate} type="primary" style={{ marginTop: '10px' }}>
                Create New Post
            </Button>
            <br />
            <div style={{ paddingTop: '10px' }} >
                <Table rowKey="id" columns={columns} dataSource={posts} onChange={onChange} />
            </div>
            <>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                        <Input
                            // type='text'
                            // className="form-control"
                            // id='title'
                            // onChange={handleInputChange} 
                            value={post.title}
                            name='title'
                        />
                        <Input value={post.description} />
                        <TextArea value={post.content} />
                    </Form>
                </Modal>
            </>
        </div>

    )
}

export default Post;