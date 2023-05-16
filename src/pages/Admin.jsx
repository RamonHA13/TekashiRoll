
import { useState, useEffect } from 'react'

import useAdminRol from '../custom hooks/useAdminRol'
import { Outlet, useLocation, Link } from 'react-router-dom'

export default function Admin () {
  const { isAdmin } = useAdminRol()
  const locationHook = useLocation()
  const [location, setLocation] = useState('/admin')

  useEffect(() => {
    if (locationHook.pathname === '/admin') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/admin/statistics') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/admin/products') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/admin/orders') {
      setLocation(locationHook.pathname)
    }
  }, [locationHook.pathname])
  return (
    <>
      { !isAdmin
        ? <h1>No cuenta con permisos de administrador</h1>
        : location === '/admin'
          ? <div className='h-full flex flex-col items-center'>
              <h2 className='text-2xl text-center mt-5'>Vista de administrador</h2>
              <div className='w-full h-full'>
                <ul className='flex justify-around items-center w-full h-1/2 grow-0'>
                  <li className='p-2 m-3 bg-main-color hover:bg-third-color rounded-md flex justify-center items-center w-1/12 h-1/2'><Link to={'/admin/statistics'}>Estadisticas</Link></li>
                  <li className='p-2 m-3 bg-main-color hover:bg-third-color rounded-md flex justify-center items-center w-1/12 h-1/2'><Link to={'/admin/products'}>Productos</Link></li>
                  <li className='p-2 m-3 bg-main-color hover:bg-third-color rounded-md flex justify-center items-center w-1/12 h-1/2'><Link to={'/admin/orders'}>Ordenes</Link></li>
                </ul>
              </div>
            </div>
          : <Outlet />
      }
    </>

  )
}
