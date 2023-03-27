import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
  const { authenticated, user, logout } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticated) {
      Router.push('/login')
    }
  }, [authenticated])

  return (
    <>
      <main className="main dashboard">
        <h1>Dashboard</h1>
        <br />
        {user ? (
          <>
            <br />
            <p>Seu Nome: {user.name}</p>
          </>
        ) : (
          <></>
        )}
        {user ? (
          <>
            <br />
            <p>Seu Email: {user.email}</p>
          </>
        ) : (
          <></>
        )}
        {user ? (
          <>
            <br />
            <p>Seu nível: {user.account_level}</p>
          </>
        ) : (
          <></>
        )}
        <button
          id="loadingButton"
          className="button"
          type="button"
          onClick={logout}
        >
          SAIR DA CONTA
        </button>
        <div id="loadingSpinner" className="spinner displayNone"></div>
      </main>
    </>
  )
}
