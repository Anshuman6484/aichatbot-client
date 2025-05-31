import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Error from '@/pages/Error'
import Home from '@/pages/Home'
import LogIn from '@/pages/LogIn'
import { action as loginAction } from '@/pages/LogIn/functions/loginAction'
import SignUp from '@/pages/SignUp'
import { action as signupAction } from '@/pages/SignUp/functions/signupAction'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: 'login',
        element: <LogIn />,
        action: loginAction,
      },
      {
        path: 'signup',
        element: <SignUp />,
        action: signupAction,
      },
    ],
  },
])

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
