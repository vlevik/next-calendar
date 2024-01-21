'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import '../styles/styles.scss';
import { Event } from '@/types/events';
import EventCard, { OverLappedInfo } from './EventCard';

export default function EventList() {
  const eventsFromStore = useAppSelector((state) => state.eventsStore.events) || [];
  const events = [...eventsFromStore];

  events.sort((a, b) => a.start - b.start);

  const eventsTree: Event[][] = [];
  let tempArr: Event[] = [];

  events.forEach((curEvent, i) => {
    const isCurrentOverlapWithLast = i > 0 && events[i - 1].start + events[i - 1].duration >= curEvent.start;

    if (isCurrentOverlapWithLast) {
      if (tempArr.length) {
        tempArr.push(curEvent);
      } else {
        tempArr.push(events[i - 1], curEvent);
      }
    } else {
      if (tempArr.length > 0) {
        eventsTree.push(tempArr);
      }
      tempArr = [];
    }
  });

  const overLappedInfo: OverLappedInfo[] = [];

  eventsTree.forEach((events) => {
    events.forEach((e, i) => {
      overLappedInfo.push({ eventId: e._id, order: i, overladedCount: events.length });
    });
  });

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.name} event={event} overlapped={overLappedInfo.find((o) => o.eventId === event._id)} />
      ))}
    </div>
  );
}
