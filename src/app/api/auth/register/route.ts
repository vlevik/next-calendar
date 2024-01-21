import bcrypt from 'bcrypt';
import { AuthPayload } from '@/types/auth';
import { NextRequest, NextResponse } from 'next/server';
import { usersCollection } from '../../db';
import { ObjectId } from 'mongodb';
import { errorMessages } from '@/constants/errorMessages';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as AuthPayload;

  const user = await usersCollection.findOne({ userName: body.userName });

  if (user) {
    return NextResponse.json({ error: errorMessages['User already exists'] }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const res = await usersCollection.insertOne({
    userName: body.userName,
    password: hashedPassword,
    _id: new ObjectId(),
    events: [],
  });

  return NextResponse.json({ _id: res.insertedId });
}
