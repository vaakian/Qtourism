import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'
import UserInfo from '$/User/UserInfo'
import User from '$/User/Index'
import Index from '$/Index/Index'

export const RouterView = () => {
  const routes = useRoutes([
    { path: '/', element: <Index /> },
    {
      path: 'user',
      element: <User />,
      children: [
        { path: 'info', element: <UserInfo /> },
        { path: '*', element: <Navigate to="/user/info" /> },
      ]
    }
  ])
  return routes
}

export const AppRoute = () => (
  <Router>
    <RouterView />
  </Router>
)