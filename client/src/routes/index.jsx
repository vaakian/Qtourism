import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'
import UserProfile from '$/User/Profile'
// import User from '$/User/Index'
import Index from '../views/Index/Index'
import { lazy, Suspense } from 'react'
import Fallback from './Fallback'
import Merchant from '../views/Merchant/Index'
import Login from '../views/User/Login'
import PackageDetail from '../views/Package/PackageDetail'
import PackageIndex from '../views/Package/Index'


// const Package = lazy(() => import('../views/Package'))
const User = lazy(() => import('$/User/Index'))

export const RouterView = () => {
  const routes = useRoutes([
    { path: '/', element: <Index /> },
    {
      path: '/package',
      element: <PackageIndex />
    },
    { path: 'package/:id', element: <PackageDetail /> },
    { path: '/user/login', element: <Login /> },
    { path: '/merchant/login', element: <h1>Merchant login</h1> },
    {
      // 下面都需要通过userAuthMiddleware
      path: '/user',
      element: <User />,
      children: [
        { path: 'profile', element: <UserProfile /> },
        { path: '*', element: <Navigate to="/user/profile" /> },
      ]
    },
    {
      // 下面都需要通过merchantAuthMiddleware
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

export const AppRoutes = ({ children }) => (
  <Router>
    <Suspense fallback={<Fallback />}>
      {children}
      <RouterView />
    </Suspense>
  </Router>
)