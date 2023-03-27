/* eslint-disable camelcase */
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

type UserType = {
  name: string
  email: string
  iat: number
  account_level: number
}

type AuthContextType = {
  authenticated: boolean
  user: UserType | null
  logout(): void
  verifyCookies(): void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType | null>(null)
  const authenticated = !!user

  useEffect(() => {
    verifyCookies()
  }, [])

  async function verifyCookies() {
    await axios
      .post('/api/verifyToken')
      .then((res) => {
        if (res.status === 201) {
          setUser(res.data)
        }
      })
      .catch((err) => console.log(err))
  }

  async function logout() {
    await axios.post('/api/logout').catch((err) => console.log(err))

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, user, logout, verifyCookies }}
    >
      {children}
    </AuthContext.Provider>
  )
}
