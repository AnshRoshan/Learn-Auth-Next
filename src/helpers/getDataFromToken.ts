import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ''
    const data = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload
    if (typeof data === 'string') {
      throw new Error('Invalid token')
    }
    return data.user.id
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default getDataFromToken
