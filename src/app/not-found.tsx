import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './not-found.module.css'

export default function PageNotFound() {
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
        <h1 className={styles.title}>Página Não Encontrada</h1>
        <Link className={styles.button} href="/">
          Retornar
        </Link>
      </div>
    </main>
  )
}
