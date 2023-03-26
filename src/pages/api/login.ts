import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { type NextApiRequest, type NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { email, pass } = request.body

  if (verifyData()) {
    await prisma.user
      .findUnique({
        where: {
          email,
        },
        select: {
          pass: true,
        },
      })
      .then((hash) => {
        if (hash != null) {
          LogIn(hash.pass)
        } else {
          return response.status(200).json('InvalidEmail')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  async function LogIn(hash: string): Promise<void> {
    const validPassword = bcrypt.compareSync(pass, hash)
    if (validPassword) {
      const secret = process.env.SECRET
      if (secret) {
        const token = jwt.sign(
          {
            email,
          },
          secret,
        )
        return response.status(201).json(token)
      } else {
        return response.status(500).json('NoSecret')
      }
    } else {
      return response.status(200).json('InvalidPass')
    }
  }

  function verifyData(): boolean {
    // email, pass, email == RegEx
    const ReGexEmail =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    if (email !== undefined && pass !== undefined && ReGexEmail.test(email)) {
      return true
    } else {
      return false
    }
  }
}
