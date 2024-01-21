import React from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Event } from '@/types/events';
import { close } from '@/redux/deleteEventModalSlice';
import { deleteEvent } from '@/services';
import { setEvents } from '@/redux/eventsSlice';

export default function DeleteEventModal() {
  const eventToDelete = useAppSelector((state) => state.deleteEventModal.eventToDelete);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleDeleteEvent = async (event: Event) => {
    if (!user) {
      return;
    }
    const events = await deleteEvent(user._id.toString(), event);

    dispatch(setEvents(events));
    dispatch(close());
  };

  return (
    eventToDelete &&
    user && (
      <div className="container box" style={{ height: '100%' }}>
        <h1 className="title">{`Are you sure you want to delete event ${eventToDelete?.name}?`}</h1>
        <div className="buttons is-centered container">
          <button className="button is-danger" onClick={() => handleDeleteEvent(eventToDelete)}>
            Yes
          </button>
          <button className="button is-success" onClick={() => dispatch(close())}>
            No
          </button>
        </div>
      </div>
    )
  );
}
