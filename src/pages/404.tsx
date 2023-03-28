import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PageNotFound() {
  return (
    <>
      <main className="main">
        <Image src="/react.svg" alt="logo" width={120} height={60} priority />
        <p className="span">Página Não Encontrada</p>
        <Link className="button" href="/">
          Retornar
        </Link>
      </main>
    </>
  )
}
