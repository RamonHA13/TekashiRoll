
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import { Outlet } from 'react-router-dom'
import useAdminRol from './custom hooks/useAdminRol'

function App () {
  const { user, isAdmin, handleSignOff, handleShowAdminHeader, showAdminHeader } = useAdminRol()
  return (
    <>
      <Header user={user} isAdmin={isAdmin} handleSignOff={handleSignOff} handleShowAdminHeader={handleShowAdminHeader} showAdminHeader={showAdminHeader}/>
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default App
