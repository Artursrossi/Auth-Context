import React from 'react'
import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Artur Schincariol Rossi',
  description: 'Authorization system created by Artur Schincariol Rossi',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  authors: [
    { name: 'Artur Schincariol Rossi', url: 'https://www.artursrossi.com.br/' },
  ],
  creator: 'Artur Schincariol Rossi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
