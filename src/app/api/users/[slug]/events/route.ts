import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { usersCollection } from '@/app/api/db';
import { Event } from '@/types/events';
import { errorMessages } from '@/constants/errorMessages';

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const body = await request.json();
  const user = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(params.slug) },
    { $push: { events: { ...body, _id: new ObjectId() } } },
    { returnDocument: 'after' },
  );

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const { password, ...userWithoutPassword } = user;

  return NextResponse.json({ user: userWithoutPassword });
}

export async function DELETE(request: NextRequest, { params }: { body: { event: Event }; params: { slug: string } }) {
  const body = await request.json();
  const user = await usersCollection.findOne({ _id: new ObjectId(params.slug) });

  if (!user) {
    return NextResponse.json({ error: errorMessages['User not found'] }, { status: 404 });
  }

  const updatedEvents = user.events.filter((event) => event._id.toString() !== body._id);
  const updatedUser = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(params.slug) },
    { $set: { events: updatedEvents } },
    { returnDocument: 'after' },
  );

  if (!updatedUser) {
    return NextResponse.json({ error: errorMessages['User not found'] }, { status: 404 });
  }

  return NextResponse.json({ events: updatedUser.events });
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const user = await usersCollection.findOne({ _id: new ObjectId(params.slug) });

  if (!user) {
    return NextResponse.json({ error: errorMessages['User not found'] }, { status: 404 });
  }

  return NextResponse.json(user.events);
}
