import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, Navigate, Outlet } from 'react-router-dom'
import { PATHS } from "../appConstants";
import { useAuthContext } from '../Context/authContext';
import RequiredAuth from '../Component/requireAuth';
import MenuItem from 'antd/lib/menu/MenuItem';
import Permission from '../Component/Permission';
const { Header, Content, Footer } = Layout

const Main = () => {

  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const items = [
    {
      label: 'Home',
      key: 'home',
      url: PATHS.HOME_PAGE
    },
    {
      label: 'Post',
      key: 'posts',
      url: PATHS.POST_PAGE
    },
    {
      label: 'Profile',
      key: 'profile',
      url: PATHS.PROFILE_PAGE
    },
    {
      label: 'Login',
      key: 'login',
      url: PATHS.LOGIN_PAGE
    },
  ]

  // const logout = () => {
  //   //call api
  //   localStorage.setItem("token", "");
  //   setIsAuthenticated(false);
  //   Navigate("/login")
  // }

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}>
            
          {
            items?.map((item, index) => (
              <Menu.Item key={index}>
                <Link to={item?.url}>
                  {item?.label}
                </Link>
              </Menu.Item>
            ))
          }
          <Permission>
          <Menu.Item key='logout'></Menu.Item>
          </Permission>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          marginTop: 80,
          width: '90%',
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        To be continue!
      </Footer>
    </Layout>
  )
}

export default Main
