import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'
import UserInfo from '$/User/UserInfo'
// import User from '$/User/Index'
import Index from '$/Index/Index'
import { lazy, Suspense } from 'react'
import Fallback from './Fallback'
import Merchant from '../views/Merchant/Index'
import Login from '../views/User/Login'


const User = lazy(() => import('$/User/Index'))

export const RouterView = () => {
  const routes = useRoutes([
    { path: '/', element: <Index /> },
    { path: '/user/login', element: <Login /> },
    { path: '/merchant/login', element: <h1>Merchant login</h1> },
    {
      // 下面都需要通过userAuthMiddleware
      path: 'user',
      element: <User />,
      children: [
        { path: 'info', element: <UserInfo /> },
        { path: '*', element: <Navigate to="/user" /> },
      ]
    },
    {
      // 下面都需要通过userAuthMiddleware
      path: 'merchant',
      element: <Merchant />,
      children: [
        // { path: 'info', element: <UserInfo /> },
        { path: '*', element: <Navigate to="/merchant" /> },
      ]
    }
  ])
  return routes
}

export const AppRoutes = () => (
  <Router>
    <Suspense fallback={<Fallback />}>
      <RouterView />
    </Suspense>
  </Router>
)