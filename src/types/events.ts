export type Event = {
  _id: string;
  start: number;
  duration: number;
  name: string;
};

export type NewEvent = Omit<Event, '_id'>;
