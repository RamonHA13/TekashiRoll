
import AdminHeader from './AdminHeader'
import ClienHeader from './ClientHeader'
export default function Header ({ showAdminHeader, isAdmin, handleShowAdminHeader, handleSignOff, user }) {
  return (
    <>
    {showAdminHeader
      ? <AdminHeader />
      : <ClienHeader isAdmin = {isAdmin} handleShowAdminHeader={handleShowAdminHeader} handleSignOff={handleSignOff} user={user}/>
    }
    </>
  )
}
