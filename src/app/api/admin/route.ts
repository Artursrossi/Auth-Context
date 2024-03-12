import { cookies, headers } from 'next/headers'
import { jwtVerify } from 'jose'

import { UserData } from '@/schemas/admin'
import { prisma } from '../db'

export async function GET() {
  const secret = process.env.JWT_SECRET
  if (!secret) return Response.json({ error: 'Internal Server Error' })
  const secretEncoder = new TextEncoder().encode(secret)

  const cookie = cookies().get('auth_token')?.value || headers().get('token')
  if (!cookie) return Response.json({ error: 'NoCookie' })

  try {
    const { payload }: { payload: UserData } = await jwtVerify(
      cookie,
      secretEncoder,
    )

    if (payload.account_level !== 1)
      return Response.json({ error: 'NotAuthorized' })

    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        account_level: true,
      },
    })

    return Response.json(users)
  } catch (error) {
    return Response.json({ error: 'NotAuthorized' })
  }
}
