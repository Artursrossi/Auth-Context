import React from 'react'

export default function Home() {
  return (
    <>
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <a href="/register" className="button">
          REGISTER
        </a>
        <a href="login" className="button">
          LOGIN
        </a>
        <a href="dashboard" className="button">
          DASHBOARD
        </a>
        <a href="admin" className="button">
          ADMIN
        </a>
      </main>
    </>
  )
}
