import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection } from '../../db';
import { NewUser } from '@/types/user';
import { errorMessages } from '@/constants/errorMessages';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const user = await usersCollection.findOne({ _id: new ObjectId(params.slug) });
  if (!user) {
    return NextResponse.json({ error: errorMessages['User not found'] }, { status: 404 });
  }

  const { password, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword);
}

export async function POST(request: NextRequest, { body }: { body: NewUser }) {
  const data = await usersCollection.insertOne({ ...body, _id: new ObjectId() });

  return NextResponse.json({ data });
}
