import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { getPersistanceId, getIsAdmin } from './../firebase/cliente.js'

export default function useAdminRol () {
  const { user, logOut } = useAuth()
  const handleSignOff = async () => {
    await logOut()
    location.reload()
  }
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminHeader, setShowAdminHeader] = useState(false)

  useEffect(() => {
    getPersistanceId().then(async (id) => {
      const data = id
      const admins = await getIsAdmin()

      admins.forEach(admin => {
        if (admin.userId === data) {
          setIsAdmin(true)
        }
      })
    }).catch(e => console.error(e))
  }, [user])
  const handleShowAdminHeader = () => {
    setShowAdminHeader(true)
  }

  return { handleSignOff, isAdmin, handleShowAdminHeader, showAdminHeader, user }
}
