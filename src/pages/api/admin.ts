import { type NextApiRequest, type NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { cookies } = request

  const token = cookies.auth_token

  const secret = process.env.SECRET

  if (token) {
    if (secret) {
      jwt.verify(token, secret, async (err: any, decoded: any) => {
        if (err) {
          return response.status(401).json('InvalidToken')
        }

        if (decoded.account_level === 1) {
          await prisma.user
            .findMany({
              select: {
                name: true,
                email: true,
                account_level: true,
              },
            })
            .then((res) => {
              return response.status(201).json(res)
            })
            .catch((err) => console.log(err))
        } else {
          return response.status(403).json('NoPermission')
        }
      })
    } else {
      return response.status(500).json('NoSecret')
    }
  } else {
    return response.status(401).json('NoToken')
  }
}
