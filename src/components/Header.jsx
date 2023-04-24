import AdminHeader from './AdminHeader'
import ClienHeader from './ClientHeader'

import IndexMenu from './indexMenu'
export default function Header ({ showAdminHeader, isAdmin, handleShowAdminHeader, handleSignOff, user, isMenuPath }) {
  return (
    <div>
    {showAdminHeader
      ? <AdminHeader />
      : <ClienHeader isAdmin = {isAdmin} handleShowAdminHeader={handleShowAdminHeader} handleSignOff={handleSignOff} user={user}/>
    }
    {isMenuPath ? <IndexMenu /> : null}
    </div>
  )
}
