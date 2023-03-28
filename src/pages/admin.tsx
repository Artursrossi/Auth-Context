import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

import { AuthContext } from '../contexts/AuthContext'

type dataType = {
  name: string
  email: string
  account_level: number
}

export default function Dashboard() {
  const { authenticated, user } = useContext(AuthContext)
  const [data, setData] = useState<dataType[] | null>(null)

  useEffect(() => {
    if (user !== null) {
      if (user.account_level !== 1) {
        Router.push('/dashboard')
      } else {
        getUserDB()
      }
    }
  }, [authenticated, user])

  async function getUserDB() {
    await axios
      .post('/api/admin')
      .then((res) => {
        if (res.status === 201) {
          setData(res.data)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {authenticated && user?.account_level === 1 ? (
        <main className="main">
          <h1>Admin</h1>
          {data ? (
            <div className="product-list">
              <h2>Todos Usuários: </h2>
              {data?.map((item) => {
                return (
                  <div key={item.email} className="product">
                    <h3>Nome: {item.name}</h3>
                    <p>Email: {item.email}</p>
                    <span>Nível da Conta:{item.account_level}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <>
              <div id="loadingSpinner" className="spinner"></div>
            </>
          )}
        </main>
      ) : (
        <>
          <main className="main">
            <Image
              src="/react.svg"
              alt="logo"
              width={120}
              height={60}
              priority
            />
            <h1 className="admin-text">
              Você não tem permissão para acessar está página
            </h1>
            <Link className="button" href="/login">
              Retornar
            </Link>
          </main>
        </>
      )}
    </>
  )
}
