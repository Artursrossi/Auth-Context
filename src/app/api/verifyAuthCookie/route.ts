import { cookies } from 'next/headers'

export async function GET() {
  const cookie = cookies().get('auth_token')
  if (!cookie) return Response.json('NoCookie')

  return Response.json('OK')
}
