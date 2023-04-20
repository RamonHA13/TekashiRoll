import { useState, useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'

export default function useAuth () {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [auth])

  const logOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('auth error', error)
    }
  }

  return { user, logOut }
}
