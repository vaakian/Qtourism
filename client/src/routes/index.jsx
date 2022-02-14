import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'
import UserProfile from '$/User/Profile'
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
        { path: 'profile', element: <UserProfile /> },
        { path: '*', element: <Navigate to="/user/profile" /> },
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