import { NextResponse } from 'next/server'

export async function GET(request: any) {
  try {
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 })
    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 504 })
  } finally {
    console.log('logout route reached')
  }
}
