import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const secret = process.env.JWT_SECRET
    if (!secret) return NextResponse.redirect(new URL('/login', request.url))

    const cookie = cookies().get('auth_token')
    if (!cookie) return NextResponse.redirect(new URL('/login', request.url))

    const secretEncoder = new TextEncoder().encode(secret)
    try {
      await jwtVerify(cookie.value, secretEncoder)
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const secret = process.env.JWT_SECRET
    if (!secret) return NextResponse.redirect(new URL('/login', request.url))

    const cookie = cookies().get('auth_token')
    if (!cookie) return NextResponse.redirect(new URL('/login', request.url))

    const secretEncoder = new TextEncoder().encode(secret)
    try {
      const decoded = await jwtVerify(cookie.value, secretEncoder)
      if (decoded.payload.account_level !== 1)
        return NextResponse.redirect(new URL('/login', request.url))
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/dashboard', '/dashboard/:path'],
}
