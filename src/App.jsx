
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import { Outlet, useLocation } from 'react-router-dom'
import useAdminRol from './custom hooks/useAdminRol'
import { useState, useEffect } from 'react'
import { createCartForUser, getCartByUser } from './firebase/cliente'
import { CarritoProvider } from './context/CarritoContext'

function App () {
  const { user, isAdmin, handleSignOff, handleShowAdminHeader, showAdminHeader } = useAdminRol()
  const [isMenuPath, setIsMenuPath] = useState(false)
  const [showFooter, setShowFooter] = useState(true)
  const location = useLocation()

  useEffect(() => {
    user && getCartByUser(user.uid).then((cart) => {
      if (!cart) {
        createCartForUser(user.uid)
      }
    })
  }, [user])

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setIsMenuPath(true)
    } else {
      setIsMenuPath(false)
    }
    if (location.pathname.startsWith('/admin')) {
      setShowFooter(false)
    } else {
      setShowFooter(true)
    }
  }, [location.pathname])
  return (
    <CarritoProvider>
        <>
          <Header user={user} isAdmin={isAdmin} handleSignOff={handleSignOff} handleShowAdminHeader={handleShowAdminHeader} showAdminHeader={showAdminHeader} isMenuPath={isMenuPath} />
          <Outlet />
          {showFooter && <Footer />}
        </>
    </CarritoProvider>
  )
}

export default App
