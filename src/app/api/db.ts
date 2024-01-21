import { User } from '@/types/user';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL as string);
const database = client.db('my-magic-database');

const usersCollection = database.collection<User>('users');

export { usersCollection };
