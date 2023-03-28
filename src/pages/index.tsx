import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="main">
        <Image src="/react.svg" alt="logo" width={120} height={60} priority />
        <Link className="button" href="/register">
          Register
        </Link>
        <Link className="button" href="/login">
          Login
        </Link>
        <Link className="button" href="/dashboard">
          Dashboard
        </Link>
        <Link className="button" href="/admin">
          Admin
        </Link>
      </main>
    </>
  )
}
