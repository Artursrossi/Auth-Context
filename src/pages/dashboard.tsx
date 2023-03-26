import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
  const { authenticated, email } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticated) {
      Router.push('/login')
    }
  }, [])

  return (
    <>
      <main className="main">
        <p>Dashboard</p>
        <p>Seu Email: {email}</p>
        <a href="/login">login</a>
        <a href="/register">register</a>
      </main>
    </>
  )
}
