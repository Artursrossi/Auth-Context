import { type NextApiRequest, type NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { token } = request.body

  const secret = process.env.SECRET

  if (token) {
    if (secret) {
      jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
          return response.status(200).json('InvalidToken')
        }

        return response.status(201).json(decoded)
      })
    } else {
      return response.status(500).json('NoSecret')
    }
  } else {
    return response.status(200).json('NoToken')
  }
}
