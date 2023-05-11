
import { useState, useEffect } from 'react'

import useAdminRol from '../custom hooks/useAdminRol'
import { Outlet, useLocation } from 'react-router-dom'

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
  }, [locationHook.pathname])
  return (
    <>
      { !isAdmin
        ? <h1>No cuenta con permisos de administrador</h1>
        : location === '/admin' ? <h2>Vista de administrador</h2> : <Outlet />
      }
    </>

  )
}
