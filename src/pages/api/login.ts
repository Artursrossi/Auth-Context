/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { type NextApiRequest, type NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

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
          name: true,
          account_level: true,
        },
      })
      .then((res) => {
        if (res != null) {
          LogIn(res.pass, res.name, res.account_level)
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

  async function LogIn(
    hash: string,
    name: string,
    account_level: number,
  ): Promise<void> {
    const validPassword = bcrypt.compareSync(pass, hash)
    if (validPassword) {
      const secret = process.env.SECRET
      if (secret) {
        const token = jwt.sign(
          {
            name,
            email,
            account_level,
          },
          secret,
        )

        const serialised = serialize('auth_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          path: '/',
        })

        return response
          .setHeader('Set-Cookie', serialised)
          .status(201)
          .json('OK')
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
