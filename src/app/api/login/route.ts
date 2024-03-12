import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { createSecretKey } from 'crypto'

import { SignInSchema, SignInType } from '@/schemas/admin'
import { prisma } from '../db'

export async function POST(request: Request) {
  const secret = process.env.JWT_SECRET
  if (!secret) return Response.json({ error: 'Internal Server Error' })

  const body: SignInType = await request.json()
  const isValid = await SignInSchema.isValid(body)
  if (!isValid) return Response.json({ error: 'Data Parse Error' })

  const { email, password } = body

  const userData = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      password: true,
      account_level: true,
    },
  })
  if (!userData) return Response.json('InvalidCredentials')

  const isValidPassword = bcrypt.compareSync(password, userData.password)
  if (!isValidPassword) return Response.json('InvalidCredentials')

  const secretKey = createSecretKey(secret, 'utf-8')
  const token = await new SignJWT({
    name: userData.name,
    email,
    account_level: userData.account_level,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey)

  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/',
    sameSite: 'strict',
  })

  return Response.json('OK')
}
