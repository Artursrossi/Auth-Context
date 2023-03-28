import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

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
      <main className="main">
        <Image src="/react.svg" alt="logo" width={120} height={60} priority />
        {user ? (
          <>
            <p>Seu Nome: {user.name}</p>
          </>
        ) : (
          <></>
        )}
        {user ? (
          <>
            <br />
            <p>Seu Email: {user.email}</p>
            <br />
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
          Sair da Conta
        </button>
        <div id="loadingSpinner" className="spinner displayNone"></div>
        {user?.account_level === 1 ? (
          <Link className="button" href="/admin">
            Admin
          </Link>
        ) : (
          <></>
        )}
      </main>
    </>
  )
}
