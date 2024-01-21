import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import cn from 'classnames';
import '../styles/styles.scss';
import { Event } from '@/types/events';
import { open_Sans_400 } from '../styles/fonts';
import { open } from '@/redux/deleteEventModalSlice';
import { setUser } from '@/redux/userSlice';

export type OverLappedInfo = { eventId: string; overladedCount: number; order: number };
type Props = {
  event: Event;
  overlapped?: OverLappedInfo;
};

export default function EventCard({ event, overlapped }: Props) {
  const widthEvent = overlapped ? 200 / overlapped.overladedCount : 200;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleDeleteEvent = async (event: Event) => {
    const res = await fetch(`api/users/${user?._id}/events`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const updatedUser = await res.json();

    dispatch(setUser(updatedUser));
  };

  return (
    <div
      className={cn(open_Sans_400.className, 'event')}
      style={{
        top: event.start * 1.5,
        height: event.duration * 1.5,
        width: widthEvent,
        left: overlapped ? 60 + overlapped.order * widthEvent : 60,
      }}
      onClick={() => dispatch(open(event))}
    >
      {event.name}
    </div>
  );
}
