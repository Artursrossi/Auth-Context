import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { type NextApiRequest, type NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { name, email, pass, samepass } = request.body

  if (VerifyData()) {
    await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((checkEmailOnDB) => {
        if (checkEmailOnDB == null) {
          CreateAccount()
        } else {
          return response.status(200).json('EmailAlreadyExist')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  async function CreateAccount() {
    const hash = await bcrypt.hashSync(pass, 12)

    await prisma.user
      .create({
        data: {
          name,
          email,
          pass: hash,
        },
      })
      .then(() => {
        return response.status(201).json('OK')
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  function VerifyData(): boolean {
    // name, email, pass, samepass, email == ReGex, name == onlyLetters, pass == samepass
    const ReGexEmail =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    const ReGexName = /^[a-zA-ZzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,30}$/
    if (
      name !== null &&
      email !== null &&
      pass !== null &&
      samepass !== null &&
      ReGexEmail.test(email) &&
      ReGexName.test(name) &&
      pass === samepass
    ) {
      return true
    } else {
      return false
    }
  }
}
