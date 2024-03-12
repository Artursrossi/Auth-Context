import bcrypt from 'bcrypt'

import { RegisterSchema, RegisterType } from '@/schemas/admin'
import { prisma } from '../db'

export async function POST(request: Request) {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) return Response.json({ error: 'Internal Server Error' })

  const body: RegisterType = await request.json()
  const isValid = await RegisterSchema.isValid(body)
  if (!isValid) return Response.json({ error: 'Data Parse Error' })

  const { name, email, password } = body

  const hasAccount = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (hasAccount) return Response.json('EmailAlreadyExist')

  const hash = bcrypt.hashSync(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  })

  return Response.json('OK')
}
