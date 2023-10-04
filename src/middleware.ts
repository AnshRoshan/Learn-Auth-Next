import { NextResponse, NextRequest } from 'next/server'
import { config as processConfig } from 'process'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublic = path === '/login' || path === '/signup'
  const token = request.cookies.get('token')?.value || ''
  if (token && isPublic) {
    return NextResponse.redirect(new URL('/', request.nextUrl).href)
  }
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.nextUrl).href)
  }
}
export const config = {
  matcher: ['/', '/login', '/logout', '/signup', '/profile/:path*'],
}
