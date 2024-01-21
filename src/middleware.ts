import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { LOGIN_ROUTE } from './constants/routes';

export default async function authMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const accessToken = requestHeaders.get('Authorization');

  if (!accessToken) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  const token = accessToken.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  } catch (error) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/users/:function*',
};
