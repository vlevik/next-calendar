'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import 'bulma';
import '../styles/styles.scss';
import Navbar from '@/components/Navbar';
import DayLayout from '@/components/DayLayout';
import NewEventForm from '@/components/NewEventForm';
import DeleteEventModal from '../components/DeleteEventModal';
import { setEvents } from '@/redux/eventsSlice';
import { getEventsByUser } from '@/services';
import { setUser } from '@/redux/userSlice';
import { close } from '@/redux/newEventFormSlice';
import { LOGIN_ROUTE } from '@/constants/routes';
import { Loader } from '@/components/Loader';

export default function Page() {
  const newEventForm = useAppSelector((state) => state.newEventForm);
  const deleteEvent = useAppSelector((state) => state.deleteEventModal);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = LOGIN_ROUTE;
    }
    const user = JSON.parse(localStorage.getItem('user') as string);

    dispatch(setUser(user));
    const getEvents = async () => {
      try {
        const events = await getEventsByUser(user._id);

        dispatch(close());
        dispatch(setEvents(events));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [dispatch]);

  return (
    <div className="page container">
      <Navbar />
      <h1 className="title block">Welcome to your calendar!</h1>
      <div className="container flex">
        {loading ? <Loader /> : <DayLayout />}
        {newEventForm.shown && <NewEventForm />}
        {deleteEvent.shown && <DeleteEventModal />}
      </div>
    </div>
  );
}
