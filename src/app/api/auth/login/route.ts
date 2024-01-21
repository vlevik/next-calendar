import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

import { AuthPayload } from '@/types/auth';
import { NextRequest, NextResponse } from 'next/server';
import { usersCollection } from '../../db';
import { errorMessages } from '@/constants/errorMessages';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as AuthPayload;

  const user = await usersCollection.findOne({ userName: body.userName });
  if (!user) {
    return NextResponse.json({ error: errorMessages['Wrong username or password'] }, { status: 401 });
  }

  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: errorMessages['Wrong username or password'] }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const accessToken = await new SignJWT({ _id: user._id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);

  const { password, ...userWithoutPassword } = user;

  return NextResponse.json({ accessToken, user: userWithoutPassword });
}
