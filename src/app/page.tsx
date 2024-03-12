import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './home.module.css'

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Image
          className={styles.image}
          src="/react.svg"
          alt="logo"
          width={256}
          height={128}
          priority
        />
        <Link className={styles.button} href="/register">
          Register
        </Link>
        <Link className={styles.button} href="/login">
          Login
        </Link>
        <Link className={styles.button} href="/dashboard">
          Dashboard
        </Link>
        <Link className={styles.button} href="/admin">
          Admin
        </Link>
      </div>
    </main>
  )
}
