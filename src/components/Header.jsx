import AdminHeader from './AdminHeader'
import ClienHeader from './ClientHeader'
import { useLocation } from 'react-router-dom'
import IndexMenu from './indexMenu'
export default function Header ({ showAdminHeader, isAdmin, handleShowAdminHeader, handleSignOff, user, isMenuPath }) {
  const location = useLocation()
  return (
    <div>
    { location.pathname.startsWith('/admin')
      ? <AdminHeader />
      : <ClienHeader isAdmin = {isAdmin} handleShowAdminHeader={handleShowAdminHeader} handleSignOff={handleSignOff} user={user}/>
    }
    {isMenuPath ? <IndexMenu /> : null}
    </div>
  )
}
