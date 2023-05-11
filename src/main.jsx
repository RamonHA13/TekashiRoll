import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Menu from './pages/Menu'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Admin from './pages/Admin'
import MenuContainer from './components/MenuContainer'
import Payment from './components/Payments'
import AdminProducts from './components/AdminProducts'
import AdminStatistics from './components/AdminStatistics'
import AdminOrders from './components/AdminOrders'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/menu',
        element: <Menu/>,
        children: [
          {
            path: '/menu/vertodo',
            element: <MenuContainer />
          },
          {
            path: '/menu/bebidas',
            element: <MenuContainer />
          },
          {
            path: '/menu/brochetas',
            element: <MenuContainer />
          },
          {
            path: '/menu/bolasdefuego',
            element: <MenuContainer />
          },
          {
            path: '/menu/yakimeshi',
            element: <MenuContainer />
          },
          {
            path: '/menu/rollos',
            element: <MenuContainer />
          }
        ]
      },
      {
        path: '/payment',
        element: <Payment />
      },

      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: '/admin',
            element: <Admin />
          },
          {
            path: '/admin/products',
            element: <AdminProducts />
          },
          {
            path: '/admin/statistics',
            element: <AdminStatistics />
          },
          {
            path: '/admin/orders',
            element: <AdminOrders />
          }
        ]
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
