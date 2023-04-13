import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import AuthProvider from './Context/authContext';
import Layout from './Layout/main';
import Home from './Pages/homePage';
import Post from './Pages/postPage';
import Login from './Pages/loginPage';
import Profile from './Pages/profilePage';
import CreatePost from './Pages/createPost';
import Edit from './Pages/editPost';
import Details from './Pages/details';
import { AllRoutes } from './Routes/AllRoutes';
import AppRoute from './Routes';
import 'antd/dist/antd.css';

function App() {
  return (
    
      <AuthProvider>
        <AppRoute />
          {/* <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<Post />} > 
             
            </Route>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/details/:id" element={<Details />} />

            <Route path="/login" element={<Login />} />
            <Route path="/profile" element=
            {
              <Profile />
            } />
          </Route> */}
      </AuthProvider>
  );
}

export default App;
