import { type NextApiRequest, type NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const { cookies } = request

  const token = cookies.auth_token

  if (token) {
    const serialised = serialize('auth_token', null!, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    })

    return response.setHeader('Set-Cookie', serialised).status(201).json('OK')
  } else {
    return response.status(401).json('NoToken')
  }
}
