import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import RequiredAuth from '../Component/requireAuth'
import Layout from '../Layout/main'
import CreatePost from '../Pages/createPost'
import Details from '../Pages/details'
import Edit from '../Pages/editPost'


const homePage = React.lazy(() => import('../Pages/homePage'))
const loginPage = React.lazy(() => import('../Pages/loginPage'))
const postPage = React.lazy(() => import('../Pages/postPage'))
const profilePage = React.lazy(() => import('../Pages/profilePage'))

const loading = () => <div className="" />

export const LoadComponent = ({component: Component }) => (
    <Suspense fallback={loading()} >
        <Component />
    </Suspense>
)

const AllRoutes = () => {
    return useRoutes([
        {
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <LoadComponent component={homePage} />
                },
                {
                    path: '/posts',
                    element: <LoadComponent component={postPage} />
                },
                {
                    path: '/posts/:id',
                    element: <LoadComponent component={Details} />
                },
                {
                    path: '/posts/create',
                    element: <LoadComponent component={CreatePost} />
                },
                {
                    path: '/login',
                    element: <LoadComponent component={loginPage} />
                },
                {
                    path: '/posts/edit/:id',
                    element: <LoadComponent component={Edit} />
                },
                {
                    path: '/profile',
                    element: 
                    <RequiredAuth>
                        <LoadComponent component={profilePage} />
                    </RequiredAuth>
                },
            ]
        }
    ])
}

export { AllRoutes }