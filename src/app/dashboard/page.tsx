'use server'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

import { UserData } from '@/schemas/admin'
import styles from './dashboard.module.css'

export default async function Dashboard() {
  const secret = process.env.JWT_SECRET
  if (!secret) return <h1>Internal Server Error</h1>
  const secretEncoder = new TextEncoder().encode(secret)

  const cookie = cookies().get('auth_token')
  if (!cookie) return <h1>Not Authorized</h1>

  const { payload: user }: { payload: UserData } = await jwtVerify(
    cookie.value,
    secretEncoder,
  )

  async function logout() {
    'use server'

    cookies().delete('auth_token')
    redirect('/login')
  }

  return (
    <>
      {user && (
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

            <p className={styles.text}>Seu Nome: {user.name}</p>
            <p className={styles.text}>Seu Email: {user.email}</p>

            <form action={logout}>
              <button className={styles.button} type="submit">
                Sair da Conta
              </button>
            </form>

            {user.account_level === 1 && (
              <Link className={styles.button} href="/admin">
                Admin
              </Link>
            )}
          </div>
        </main>
      )}
      {!user && <h1>Carregando Informações...</h1>}
    </>
  )
}
