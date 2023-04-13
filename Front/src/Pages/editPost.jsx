import { Button, Form, Input, Popconfirm } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostDetail, updatePost } from '../Service';


function Edit() {
  let navigate = useNavigate();
    const navigateToPost = () => {
        navigate('/posts')
    };
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState([]);
  const fetchPostDetails = (id) => {
    getPostDetail(id).then(res => {
      setPostDetails(res.data)
    })
  };

  useEffect(() => {
    fetchPostDetails(id);
  }, [id]);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setPostDetails({ ...postDetails, [name]: value });

  };

  console.log(postDetails);
  return (
    <div style={{width:'80%', margin:'auto'}}>
      <Form>
        <div  style={{width:'80%', margin:'auto'}}>
        <p>Title</p>
        <Input
        style={{width:'800px'}}
          type='text'
          className="form-control"
          id='title'
          onChange={handleInputChange}
          value={postDetails.title}
          name='title'
        />
        </div>
        <div  style={{width:'80%', margin:'auto', paddingTop:'20px'}}>
          <p>Description</p>
        <Input
        style={{width:'800px'}}
          type='text'
          className="form-control"
          id='description'
          onChange={handleInputChange}
          value={postDetails.description}
          name='description'
        />
        </div>
        <div  style={{width:'80%', margin:'auto', paddingTop:'20px'}}>
          <p>Content</p>
        <TextArea
        style={{width:'880px', height:'150px'}}
          type='text'
          className="form-control"
          id='content'
          onChange={handleInputChange}
          value={postDetails.content}
          name='content'
        />
        </div>
        <br/>
        <div  style={{width:'80%', margin:'auto'}}>
        <Button 
        style={{float:'right'}}
        type="primary">
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => {
              updatePost(id, postDetails);
              navigateToPost();
            }}>
            Save
          </Popconfirm>
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default Edit;