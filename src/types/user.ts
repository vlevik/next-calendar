import { ObjectId } from 'mongodb';
import { Event } from './events';

export type User = {
  _id: ObjectId;
  userName: string;
  password: string;
  events: Event[];
};

export type NewUser = Omit<User, '_id'>;
