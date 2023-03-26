/* eslint-disable camelcase */
import React, { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { setCookie, parseCookies } from 'nookies'

type AuthContextType = {
  authenticated: boolean
  signIn: (token: any) => Promise<void>
  email: string
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: any) => {
  const [email, setEmail] = useState('')
  const { auth_token } = parseCookies()

  const authenticated = !!auth_token
  useEffect(() => {
    if (authenticated) {
      returnEmail(auth_token)
    }
  }, [])

  async function signIn(token: any) {
    await axios
      .post('/api/verifyToken', { token })
      .then((res) => {
        if (res.status === 201) {
          setToken(token, res.data.email)
        } else if (res.data === 'NoToken') {
          console.log('Sem Token')
        } else if (res.data === 'InvalidToken') {
          console.log('Token Inválido')
        } else {
          console.log('Ocorreu um erro')
        }
      })
      .catch((err) => console.log(err))
  }

  function setToken(token: any, email: string) {
    setEmail(email)

    setCookie(undefined, 'auth_token', token, {
      // maxAge: 60 * 60 * 24 * 7, // 7 dias
      expires: new Date(Date.now() + 60 * 60 * 24 * 7), // 7 dias
      path: '/',
    })

    Router.push('/dashboard')
    // api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  async function returnEmail(token: any) {
    await axios
      .post('/api/verifyToken', { token })
      .then((res) => {
        if (res.status === 201) {
          setEmail(res.data.email)
        } else if (res.data === 'InvalidToken') {
          console.log('Token Inválido')
        } else {
          console.log('Ocorreu um erro')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <AuthContext.Provider value={{ authenticated, signIn, email }}>
      {children}
    </AuthContext.Provider>
  )
}
