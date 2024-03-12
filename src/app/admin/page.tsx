import React from 'react'
import Image from 'next/image'
import { cookies } from 'next/headers'

import { UserData } from '@/schemas/admin'
import styles from './admin.module.css'

export default async function Admin() {
  const token = cookies().get('auth_token')?.value

  const response = await fetch(`${process.env.BASE_URL}/api/admin`, {
    method: 'GET',
    headers: {
      token: `${token}`,
    },
    cache: 'force-cache',
  })

  const AllUsersData: UserData[] = await response.json()

  return (
    <>
      {AllUsersData.length > 0 && (
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

            <div className={styles.adminDataList}>
              <h2>Todos Usuários: </h2>
              {AllUsersData.map((user) => {
                return (
                  <div key={user.email} className={styles.adminDataCard}>
                    <h3>Nome: {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <span>Nível da Conta:{user.account_level}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      )}
      {AllUsersData.length === 0 && <h1>Carregando Informações...</h1>}
    </>
  )
}
