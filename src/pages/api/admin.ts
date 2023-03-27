import { type NextApiRequest, type NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
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
}
